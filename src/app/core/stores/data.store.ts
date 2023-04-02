import { observable, action, } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { dataService } from '..';
import { QueryConstraint } from 'firebase/firestore';
import { statusObject } from '../dummy/app';
@Injectable({ providedIn: 'root' })
export class dataStore {
  @observable process: boolean = false;
  @observable loading: boolean = false;
  @observable totalCount: number = 0;
  constructor(
    private ds: dataService,
  ) {
  }
  @action
  async fetchCount(collection:string, queryConstraint:QueryConstraint) {
    this.totalCount = await this.ds.countDataRef(collection, queryConstraint)
  }


  @action
  async importData(collection:string, data:any[], user:any) {
    if(data && data.length > 0){
      data.forEach(f => {
        const data ={
          ...f,
          key:this.ds.createId(),
          status:statusObject.active,
          created_at:new Date(),
          created_by:user,
        }
        this.ds.collectionFireRef(collection).doc(data.key).set(data, {merge:true}).then(()=>{
          console.info('success');
        }).catch(error=>{
          console.error('error', error)
        })
      });
    }
  }
}
