import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as _ from 'lodash';

@Pipe({
  name: 'validSchool'
})
export class validSchoolPipe implements PipeTransform {
  transform(user: any, school: any): any {
    if (user) {
      if (user?.isAdmin) {
        return true;
      } else if (school?.status?.key === 1) {
        return true;
      }
      return false;
    }
    return false;

  }
}

@Pipe({
  name: 'subCollectionDoc'
})
export class subCollectionDocPipe implements PipeTransform {
  constructor(
    private afs: AngularFirestore
  ) { }
  transform(schoolKey: string, docKey: string, collection: string, field: string): any {
    if (!docKey) return;
    const ref = this.afs.firestore.collection('schools').doc(schoolKey).collection(collection).doc(docKey)
    return ref.get().then(doc => {
      if (doc.data() !== undefined) {
        const data = field ? doc.data()[field] : null
        return data
      } else {
        return null
      }
    });
  }
}


@Pipe({
  name: 'collectionDoc'
})
export class collectionDocPipe implements PipeTransform {
  constructor(
    private afs: AngularFirestore
  ) { }
  transform(docKey: string, collection: string, field: string): any {
    if (!docKey) return;
    const ref = this.afs.firestore.collection(collection).doc(docKey)
    return ref.get().then(doc => {
      if (doc.data() !== undefined) {
        const data = field ? doc.data()[field] : null
        return data
      } else {
        return null
      }
    });
  }
}


