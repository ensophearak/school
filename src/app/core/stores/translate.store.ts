import { observable, action } from "mobx-angular";
import { Injectable } from "@angular/core";
import { JsonDataService } from "../services/json-data.service";

@Injectable({ providedIn: 'root' })
export class Translate {
    @observable strings: any = {};
    @observable language: any = "en";

    constructor(private json: JsonDataService) {
        json.getLanguage().then(doc => {
            this.language = doc || 'en';
            if (this.language === 'en') {
                json.englishJSON().subscribe(items => {
                    this.strings = items;
                })
            }
            else {
                json.khmerJSON().subscribe(items => {
                    this.strings = items;
                })
            }
        })
    }

    @action
    chooseLanguage(key) {
        this.json.setLanguage(key)
        this.language = key;
        if (this.language === 'en') {
            this.json.englishJSON().subscribe(items => {
                this.strings = items;
            })
        }
        else {
            this.json.khmerJSON().subscribe(items => {
                this.strings = items;
            })
        }
    }
}
