import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {
  
  constructor(private http: HttpClient) {
    this.getLanguage();
  }
  async getLanguage() {
    const language = localStorage.getItem("app_language");
    return language || null;
  }

  async setLanguage(key) {
    localStorage.setItem("app_language", key);
  }

  public englishJSON(): Observable<any> {
    return this.http.get("./assets/en.json");
  }

  public khmerJSON(): Observable<any> {
    return this.http.get("./assets/kh.json");
  }

}
