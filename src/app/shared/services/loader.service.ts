import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlreadyLoginComponent } from '../components/already-login/already-login.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { PageNotAvailableComponent } from '../components/page-not-available/page-not-available.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public pageNotAvailable: Portal<any>;
  public isPageNotAvailable: boolean = false;

  overlayRef = this.overlay.create({
    positionStrategy: this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically(),
    hasBackdrop: true
  })
  
  private loading: boolean = false;
  private processing: boolean = false;

  constructor(private overlay: Overlay) { }
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }

  setProcessing(loading: boolean) {
    this.processing = loading;
  }

  getProcessing(): boolean {
    return this.processing;
  }

  showLoader() {
    this.overlayRef.attach(new ComponentPortal(LoaderComponent))
  }

  showAlreadyLogin() {
    this.overlayRef.attach(new ComponentPortal(AlreadyLoginComponent))
  }

  hideLoader() {
    this.overlayRef.detach()
  }

  attachLoader<T>(): (source: Observable<T>) => Observable<T> {
    return tap<T>({
      subscribe: () => this.showLoader(),
      next: () => this.hideLoader()
    });
  }

  trackByIdx(i:any) {
    return i;
  }

  showPageNotAvailable(status:any) {
    if(!status){
      this.isPageNotAvailable = true;
      this.pageNotAvailable =  new ComponentPortal(PageNotAvailableComponent);
    }else{
      this.isPageNotAvailable = false;
      this.pageNotAvailable  = null;
    }
  }
}
