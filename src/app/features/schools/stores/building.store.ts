import { observable, action, } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { QueryConstraint } from 'firebase/firestore';
import { dataService } from 'src/app/core';
import { Subscription } from 'rxjs';
import { pushToObject } from 'src/app/shared';

@Injectable()
export class buildingStore {
    @observable process: boolean = false;
    @observable loading: boolean = false;
    @observable totalCount: number = 0;
    @observable data: any[] = [];
    @observable dataSubscription: Subscription;
    @observable selectedBuilding: any = null;
    constructor(
        private ds: dataService,
    ) {
    }

    @action
    async fetchData(schoolKey: string, campusKey: string) {
        this.loading = true;
        this.dataSubscription = this.ds.buildingRef(schoolKey, ref => ref.where('campusKey', '==', campusKey)).valueChanges().subscribe(data => {
            this.data = data;
            this.loading = false;
        });
    }

    @action
    async fetchSelectedData(schoolKey: string, buildingKey: string) {
        this.selectedBuilding = pushToObject(await this.ds.buildingFireRef(schoolKey).doc(buildingKey).get());
    }

    @action
    async fetchCount(collection: string, queryConstraint: QueryConstraint) {
        this.totalCount = await this.ds.countDataRef(collection, queryConstraint);
    }

    @action
    create(item: any, callback: {(success:boolean, result:any)}) {
        this.process = true;
        const batch = this.ds.batch();
        const ref = this.ds.schoolFireRef().doc(item.schoolKey).collection('building').doc(item.key);
        batch.set(ref, item, { merge: true });
        batch.commit().then(() => {
            callback(true, null);
        }).catch((error) => {
            alert(error);
            callback(false, error)
        }).finally(() => {
            this.process = false;
        })
    }

}
