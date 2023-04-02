import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { collection, getCountFromServer, query, QueryConstraint } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class dataService {
  constructor(
    private afs: AngularFirestore,
  ) { }
  batch() {
    return this.afs.firestore.batch();
  }
  createId() {
    return this.afs.createId();
  }
  collectionRef(collectionName: string, ref?: QueryFn) {
    return this.afs.collection(collectionName, ref);
  }

  collectionFireRef(collectionName: string) {
    return this.afs.firestore.collection(collectionName);
  }

  async countDataRef(collectionName: string, queryConstraint: QueryConstraint) {
    const colRef = collection(this.afs.firestore, collectionName);
    const queryRef = query(colRef, queryConstraint);
    return await getCountFromServer(queryRef).then((count) => {
      return count.data().count
    })
  }

  userRef(ref?: QueryFn) {
    return this.afs.collection('users', ref);
  }
  userFireRef() {
    return this.afs.firestore.collection('users');
  }

  schoolFireRef() {
    return this.afs.firestore.collection('schools');
  }

  departmentRef(schoolKey: string, ref?: QueryFn) {
    return this.afs.collection('schools').doc(schoolKey).collection('departments', ref);
  }
  departmentFireRef(schoolKey: string) {
    return this.afs.firestore.collection('schools').doc(schoolKey).collection('departments');
  }

  campusRef(schoolKey: string, ref?: QueryFn) {
    return this.afs.collection('schools').doc(schoolKey).collection('campus', ref);
  }
  campusFireRef(schoolKey: string) {
    return this.afs.firestore.collection('schools').doc(schoolKey).collection('campus');
  }

  buildingRef(schoolKey: string, ref?: QueryFn) {
    return this.afs.collection('schools').doc(schoolKey).collection('building', ref);
  }

  buildingFireRef(schoolKey: string) {
    return this.afs.firestore.collection('schools').doc(schoolKey).collection('building');
  }

  roomRef(schoolKey: string, ref?: QueryFn) {
    return this.afs.collection('schools').doc(schoolKey).collection('room', ref);
  }
  
  roomFireRef(schoolKey: string) {
    return this.afs.firestore.collection('schools').doc(schoolKey).collection('room');
  }


}

