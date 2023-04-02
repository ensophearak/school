import { Router } from '@angular/router';
import { observable, action, computed, } from 'mobx-angular';
import { Injectable, NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/compat/app'
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { IpServiceService } from '../services/ip.service';
import { lastValueFrom, Subscription } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { pushToObject } from 'src/app/shared';
import { FireStorageService } from '../services/fire-storage.service';
@Injectable({ providedIn: 'root' })
export class AuthStore {
  @observable remember: boolean = false;
  @observable process: boolean = false;
  @observable loading: boolean = false;
  @observable isLoginByOtherDevice: boolean = false;

  @observable user: any = null;
  @observable profile: any = null;
  @observable school: any = null;
  @observable schoolKey: any = null;
  
  deviceInfo: DeviceInfo = null;
  sw: ServiceWorkerRegistration | null = null;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    public authService: AuthService,
    public ngZone: NgZone,
    private deviceService: DeviceDetectorService,
    private ip: IpServiceService,
    private afMessaging: AngularFireMessaging,
    private fun: AngularFireFunctions,
    private storage: FireStorageService,
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }
  @action
  fetchCanActive() {
    this.userSubscription = this.authService.authRef().authState.subscribe(user => {
      if (user) {
        this.ngZone.run(() => {
          this.user = {
            key: user.uid,
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
          };
          this.requestPermissionNotification(user.uid)
          localStorage.setItem('user', JSON.stringify(this.user));
          const schoolKey = JSON.parse(localStorage.getItem('schoolKey'));
          this.schoolKey = schoolKey;
        })
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  @action
  async signIn(email: string, password: string, callback: { (success: boolean, message: any) }) {
    this.process = true;
    return this.authService.authRef().signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(async () => {
          this.user = {
            key: result.user.uid,
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            emailVerified: result.user.emailVerified
          };
          const { uid } = result.user;
          const awaitUser = await this.authService.userFireRef().doc(uid).get();
          if (!awaitUser.exists) {
            this.signOut((success: any, result: any) => {
              this.user = null;
              console.error('User not found!')
            })
            this.process = false;
            return;
          }
          // const ipData: any = await this.ip.getIPAddress().toPromise();
          this.authService.userRef().doc(result.user.uid).update({
            session: {
              refreshToken: result.user.refreshToken,
              // ip: ipData?.ip,
              ...this.deviceInfo,
            }
          })

          localStorage.setItem('user', JSON.stringify(this.user));
          const userDoc = pushToObject(awaitUser);
          this.profile = userDoc;
          const { schoolKey } = userDoc;
          this.schoolKey = schoolKey;
          if (schoolKey) {
            localStorage.setItem('schoolKey', JSON.stringify(schoolKey));
            this.router.navigate([`/${this.schoolKey}`]);
          } else {
            this.router.navigate(['/new-school']);
          }
          callback(true, result);
          this.process = false;
        });
      }).catch((error) => {
        callback(false, error)
        this.process = false;
        console.error(error.message)
      })
  }

  // Sign up with email/password
  @action
  signUp(email: string, password: string, callback: (success: boolean, result: any) => void) {
    this.authService.authRef().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        callback(true, result.user)
        // this.sendVerificationMail();
      }).catch((error) => {
        callback(false, error)
        console.error(error.message)
      })
  }

  // Send email versification when new user sign up
  @action
  sendVerificationMail() {
    firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }

  // Reset Forgot password
  @action
  forgotPassword(passwordResetEmail: string) {
    this.authService.authRef().sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        console.log('Password reset email sent, check your inbox.');
      }).catch((error) => {
        console.error(error)
      })
  }

  // Returns true when user is looked in and email is verified
  @computed
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    this.user = user;
    const schoolKey = JSON.parse(localStorage.getItem('schoolKey'));
    this.schoolKey = schoolKey;
    return user !== null ? true : false;
  }


  @computed
  get isHasSchool(): boolean {
    const schoolKey = JSON.parse(localStorage.getItem('schoolKey'));
    this.schoolKey = schoolKey;
    return this.schoolKey !== null ? true : false;
  }



  // Sign in with Google
  @action
  googleAuth(callback: { (success: boolean, result: any) }) {
    this.authLogin(new firebase.auth.GoogleAuthProvider()).then((result) => {
      this.ngZone.run(() => {
        if (result && result.uid) {
          setTimeout(() => {
            this.router.navigate(['dashboard']).then(() => {
              this.setUserData(result)
            });
          }, 300);
          callback(true, result)
        } else {
          callback(false, result)
        }
      })
    });
  }

  // Auth logic to run auth providers
  @action
  async authLogin(provider: any) {
    return this.authService.authRef().signInWithPopup(provider)
      .then((result) => {
        return result.user
      }).catch((error) => {
        console.error(error)
        return error
      })
  }

  @action
  setUserData(user: any): void {
    const userRef = this.authService.userRef().doc(user.uid);
    const userData: any = {
      key: user.uid,
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    userRef.set(userData, { merge: true })
  }

  // Sign out
  @action
  async signOut(callback: { (success: boolean, result: any) }) {
    await this.unsubscribeNotification(this.user.key);
    return this.authService.authRef().signOut().then((data: any) => {
      this.profile = null;
      this.school = null;
      this.user = null;
      this.schoolKey = null;
      localStorage.clear();

      // localStorage.removeItem('user');
      // localStorage.removeItem('schoolKey');

      this.requestPermissionNotificationRef.unsubscribe();
      this.userSubscription.unsubscribe();
      this.router.navigate(['/auth']);
      callback(true, data)
    })
  }


  @observable requestPermissionNotificationRef: Subscription;
  @action
  async requestPermissionNotification(topicKey: string) {
    this.requestPermissionNotificationRef = this.afMessaging.requestToken.subscribe(async token => {
      await lastValueFrom(this.fun.httpsCallable('subscribeToTopic')({ topic: topicKey, token }))
      this.afMessaging.onMessage(payload => {
        const { data } = payload
        const notificationTitle = data.title;
        const notificationOptions = {
          body: data.body,
          icon: data.icon,
        };
        if (this.sw) {
          this.sw.showNotification(notificationTitle, notificationOptions);
        }
      })
    })
  }


  @observable unsubscribeNotificationRef: Subscription;
  @action
  async unsubscribeNotification(topicKey: string) {
    this.unsubscribeNotificationRef = this.afMessaging.requestToken.subscribe(async token => {
      await lastValueFrom(this.fun.httpsCallable('unsubscribeToTopic')({ topic: topicKey, token })).then(() => {
        this.unsubscribeNotificationRef.unsubscribe();
      })
    })
  }


  @action
  async fetchUserProfile(user: firebase.User, pSchoolKey: string, callback?: { (user: any) }) {
    this.loading = true;
    const { uid } = user;
    const awaitUser = await this.authService.userFireRef().doc(uid).get();
    const userDoc = pushToObject(awaitUser);
    this.profile = userDoc;
    if (!this.profile) {
      this.router.navigate(['/auth']);
      return
    }
    const { schoolKey } = userDoc as any;
    this.schoolKey = schoolKey;
    localStorage.setItem('schoolKey', JSON.stringify(schoolKey));
    if (!schoolKey) {
      this.router.navigate(['/new-school']);
      this.loading = false;
      return;
    }
    if (pSchoolKey && schoolKey !== pSchoolKey) {
      this.router.navigate([`${pSchoolKey}/school-not-available`]);
      this.loading = false;
      return
    }
    callback && callback(this.profile)
    this.school = pushToObject(await this.authService.schoolFireRef().doc(schoolKey).get());
    this.loading = false;
  }

  @action
  createSchool(item: any, callback: { (success: boolean, result: any) }) {
    this.process = true;
    const batch = this.authService.batch();
    const { createdBy } = item;
    const schoolRef = this.authService.schoolFireRef().doc(item.key);
    const userRef = this.authService.userFireRef().doc(createdBy.key);

    localStorage.setItem('schoolKey', JSON.stringify(item.key));
    this.schoolKey = item?.key;

    batch.update(userRef, { schoolKey: item?.key });
    batch.set(schoolRef, item, { merge: true });
    batch.commit().then(() => {
      callback(true, null);
    }).catch((error) => {
      alert(error);
      callback(false, error)
    }).finally(() => {
      this.process = false;
    })
  }


  @action
  async changeAvatar(fileList: any, user: any, callback: { (success: boolean, result: any) }) {
    this.process = true;
    if (fileList) {
      const batch = this.authService.batch();
      const userRef = this.authService.userFireRef().doc(user.key);
      if (user && user?.profilePhoto) {
        const { profilePhoto } = user;
        this.storage.deleteFile(profilePhoto);
      }
      const profilePhoto = await this.storage.upload(fileList, 'users');
      batch.update(userRef, { profilePhoto: profilePhoto });
      batch.commit().then(() => {
        callback(true, null);
      }).catch((error) => {
        alert(error);
        callback(false, error)
      }).finally(() => {
        this.process = false;
      })
    }
    this.process = false;

  }

}
