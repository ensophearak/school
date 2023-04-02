import { observable, action, } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { QueryConstraint } from 'firebase/firestore';
import { dataService } from 'src/app/core';
import { LoaderService, pushToObject } from 'src/app/shared';
import { where } from 'firebase/firestore';
import { Subscription } from 'rxjs';

@Injectable()
export class schoolsStore {
    @observable process: boolean = false;
    @observable loading: boolean = false;
    @observable tableData: any[] = [];
    @observable firstInResponse: any = [];
    @observable lastInResponse: any = [];
    @observable prev_start_at: any = [];
    @observable pagination_clicked_count = 0;
    @observable disable_next: boolean = false;
    @observable disable_prev: boolean = false;

    @observable statusKey: number = null;
    @observable pageSize: number = null;
    @observable totalCount: number = 0;
    @observable totalPage: number = 0;
    @observable tableDataSubscription: Subscription;
    @observable selectedSchool: any = null;

    constructor(
        private ds: dataService,
        private loadingService: LoaderService
    ) {
    }

    @action
    async fetchSelectedData(schoolKey: string) {
        this.selectedSchool = pushToObject(await this.ds.schoolFireRef().doc(schoolKey).get());
    }
    @action
    createSchool(item: any, callback: { (success: boolean, result: any) }) {
        this.process = true;
        const batch = this.ds.batch();
        const schoolRef = this.ds.schoolFireRef().doc(item.key);
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
    deleteSchool(item: any, callback: { (success: boolean, result: any) }) {
        this.process = true;
        const batch = this.ds.batch();
        const schoolRef = this.ds.schoolFireRef().doc(item.key);
        batch.delete(schoolRef);
        batch.commit().then(() => {
            this.fetchCount('schools', (where('status.key', '==', this.statusKey)));
            callback(true, null);
        }).catch((error) => {
            alert(error);
            callback(false, error)
        }).finally(() => {
            this.process = false;
        })
    }


    @action
    changeSchoolStatus(item: any, status: any, callback: { (success: boolean, result: any) }) {
        this.process = true;
        const batch = this.ds.batch();
        const schoolRef = this.ds.schoolFireRef().doc(item.key);
        batch.update(schoolRef, { status: status });
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
    loadItems(statusKey: number, pageSize: number) {
        this.loadingService.setLoading(true);
        this.pageSize = pageSize;
        this.statusKey = statusKey;
        this.fetchCount('schools', (where('status.key', '==', this.statusKey)));

        this.tableDataSubscription && this.tableDataSubscription.unsubscribe();
        this.tableDataSubscription = this.ds.collectionRef('schools', ref => ref
            .where('status.key', '==', this.statusKey)
            .limit(this.pageSize)
            .orderBy('name')
        ).snapshotChanges()
            .subscribe(
                {
                    next: (response) => {
                        if (!response.length) {
                            this.loadingService.setLoading(false);
                            this.tableData = [];
                            this.disable_next = true;
                            console.info("No Data Available");
                            return;
                        }
                        this.firstInResponse = response[0].payload.doc;
                        this.lastInResponse = response[response.length - 1].payload.doc;
                        this.tableData = [];
                        for (let item of response) {
                            this.tableData.push(item.payload.doc.data());
                        }
                        //Initialize values
                        this.prev_start_at = [];
                        this.pagination_clicked_count = 0;
                        const currentPage = this.pagination_clicked_count * this.pageSize;
                        this.tableData = this.tableData.map((m, index) => ({ ...m, index: currentPage + index + 1 }));

                        this.disable_next = false;
                        this.disable_prev = false;
                        this.loadingService.setLoading(false);
                        //Push first item to use for Previous action
                        this.push_prev_startAt(this.firstInResponse);

                        if (this.tableData.length < this.pageSize) {
                            this.disable_next = true;
                        }

                    }, // nextHandler
                    complete: () => {
                        this.loadingService.setLoading(false);
                        console.info('complete');
                    }, // completeHandler
                    error: (error) => {
                        this.loadingService.setLoading(false);
                        console.error(error)
                    }, // errorHandler 
                }
            );
    }
    @action
    async fetchCount(collection: string, queryConstraint: QueryConstraint) {
        this.totalCount = await this.ds.countDataRef(collection, queryConstraint);
        this.totalPage = this.totalCount / this.pageSize;
        if (!Number.isInteger(this.totalPage)) {
            this.totalPage = Math.ceil(this.totalPage)
        }
    }

    @action
    nextPage() {
        this.loadingService.setLoading(true);
        this.disable_next = true;
        this.tableDataSubscription = this.ds.collectionRef('schools', ref => ref
            .where('status.key', '==', this.statusKey)
            .limit(this.pageSize)
            .orderBy('name')
            .startAfter(this.lastInResponse)
        ).get().subscribe({
            next: (response) => {
                if (!response.docs.length) {
                    this.loadingService.setLoading(false);
                    this.disable_next = true;
                    return;
                }

                this.firstInResponse = response.docs[0];

                this.lastInResponse = response.docs[response.docs.length - 1];
                this.tableData = [];
                for (let item of response.docs) {
                    this.tableData.push(item.data());
                }
                this.pagination_clicked_count++;
                const currentPage = this.pagination_clicked_count * this.pageSize;
                this.tableData = this.tableData.map((m, index) => ({ ...m, index: currentPage + index + 1 }));

                this.push_prev_startAt(this.firstInResponse);
                this.disable_next = false;

            }, // nextHandler
            complete: () => {
                if (this.tableData.length < this.pageSize) {
                    this.disable_next = true;
                }
                this.loadingService.setLoading(false);
                console.info('complete');
            }, // completeHandler
            error: (error) => {
                this.loadingService.setLoading(false);
                this.disable_next = false;
                console.error(error)
            }, // errorHandler 
        })
    }
    //Show previous set 
    @action
    prevPage() {
        this.loadingService.setLoading(true);
        this.disable_prev = true;

        this.tableDataSubscription = this.ds.collectionRef('schools', ref => ref
            .where('status.key', '==', this.statusKey)
            .orderBy('name')
            .startAt(this.get_prev_startAt())
            .endBefore(this.firstInResponse)
            .limit(this.pageSize)
        ).get().subscribe({
            next: (response) => {
                this.firstInResponse = response.docs[0];
                this.lastInResponse = response.docs[response.docs.length - 1];

                this.tableData = [];
                for (let item of response.docs) {
                    this.tableData.push(item.data());
                }
                //Maintaing page no.
                this.pagination_clicked_count--;
                const currentPage = this.pagination_clicked_count * this.pageSize;
                this.tableData = this.tableData.map((m, index) => ({ ...m, index: currentPage + index + 1 }));
                //Pop not required value in array
                this.pop_prev_startAt(this.firstInResponse);

                //Enable buttons again
                this.disable_prev = false;
                this.disable_next = false;
            }, // nextHandler
            complete: () => {
                this.loadingService.setLoading(false);
                console.info('complete');
            }, // completeHandler
            error: (error) => {
                this.loadingService.setLoading(false);
                this.disable_prev = false;
                console.error(error)
            }, // errorHandler 
        })
    }


    //Add document
    @action
    push_prev_startAt(prev_first_doc: any) {
        this.prev_start_at.push(prev_first_doc);
    }

    //Remove not required document 
    @action
    pop_prev_startAt(prev_first_doc: any) {
        this.prev_start_at.forEach((element: any) => {
            if (prev_first_doc.data().id == element.data().id) {
                element = null;
            }
        });
    }

    //Return the Doc rem where previous page will startAt
    @action
    get_prev_startAt() {
        if (this.prev_start_at.length > (this.pagination_clicked_count + 1))
            this.prev_start_at.splice(this.prev_start_at.length - 2, this.prev_start_at.length - 1);
        return this.prev_start_at[this.pagination_clicked_count - 1];
    }



}
