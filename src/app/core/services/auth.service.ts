import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
  ) {}

  batch(){
    return this.afs.firestore.batch();
  }
  authRef(){
    return this.afAuth;
  }
  
  userRef(){
    return this.afs.collection('users');
  }
  userFireRef(){
    return this.afs.firestore.collection('users');
  }
  schoolFireRef(){
    return this.afs.firestore.collection('schools');
  }


 
}