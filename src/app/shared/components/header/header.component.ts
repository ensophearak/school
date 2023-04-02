import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthStore, dataService, FireStorageService } from 'src/app/core';
import { transformImageSameTokenNoWebp } from '../..';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private dialogSubscription: Subscription;
  constructor(
    public auth: AuthStore,
    public fss: FireStorageService,
  ) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    if (this.dialogSubscription) this.dialogSubscription.unsubscribe();

  }

  async onSelectedFile(event) {
    if (event) {
      this.auth.changeAvatar(event.target.files[0], this.auth.profile, (success, msg) => { })
    }
  }

  signOut() {
    this.auth.signOut((success: any, result: any) => {
      console.log('has logout');
    })
  }

  changePassword() {
    // let dialogRef = this.dialog.open(ChangePasswordComponent, {
    //   data: null,
    //   panelClass: 'item-list-panel',
    //   width: '35vw',
    //   height: '100vh',
    //   disableClose: false,
    //   role: 'dialog',
    //   autoFocus: false,
    // });
    // dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
    // this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
    // });
  }
}



@Component({
  selector: 'avatar',
  template: `
  <div class="avatar-image" [style.background-image]="'url(' + photoUrl + ')'"></div> 
  `
})

export class AvatarComponent {
  @Input() userKey: any;
  defaultImg = 'https://firebasestorage.googleapis.com/v0/b/espr-news.appspot.com/o/no_image.svg?alt=media&token=e2bf1f69-10ea-4f13-8848-e05ffa29db55'
  subscription: Subscription;
  photoUrl: string;
  constructor(
    private db: dataService,
    private auth: AuthStore,
  ) { }
  ngOnInit() {
    this.photoUrl = this.defaultImg;
    this.subscription = this.db.userRef().doc(this.userKey).valueChanges().subscribe(async (user: any) => {
      if (user) {
        const { profilePhoto } = user;
        if (profilePhoto) {
          this.photoUrl = profilePhoto?.fileUrl || this.defaultImg;
          const smallPhoto = transformImageSameTokenNoWebp(profilePhoto?.fileUrl, '200').uri;
          if (smallPhoto) {
            testImage(smallPhoto).then(image => {
              this.photoUrl = smallPhoto;
            }).catch((error) => {
              console.log('error', error);
              this.photoUrl = profilePhoto?.fileUrl || this.defaultImg;
            });
          }

        }
        this.auth.profile = user;
      }
    })
  }

  ngAfterViewInit(): void { }
  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe()
  }
}


export function testImage(url) {
  // Define the promise
  const imgPromise = new Promise(function imgPromise(resolve, reject) {
    // Create the image
    const imgElement = new Image();
    // When image is loaded, resolve the promise
    imgElement.addEventListener('load', function imgOnLoad() {
      resolve(this);
    });
    // When there's an error during load, reject the promise
    imgElement.addEventListener('error', function imgOnError() {
      reject();
    })
    // Assign URL
    imgElement.src = url;
  });
  return imgPromise;
}