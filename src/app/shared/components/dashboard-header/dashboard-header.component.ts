import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthStore, FireStorageService } from 'src/app/core';

@Component({
  selector: 'dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  themeColor:any = '__core-light-mode';
  defaultSidebar:any;
  formFocus: boolean = false;
  form: UntypedFormGroup;
  @ViewChild("searchInp") SearchInp : ElementRef;
  private dialogSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    public auth: AuthStore,
    public fss: FireStorageService,
  ) {
    this.form = this.fb.group({
      search: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    // this.setDefaultTheme();
    // this.setDefaultSidebar();
  }
  ngAfterViewInit(): void {
    this.setDefaultTheme();
    this.setDefaultSidebar();
  }
  ngOnDestroy() {
    if(this.dialogSubscription) this.dialogSubscription.unsubscribe();
  }
  alert() {
    alert('click')
  }

  clear() {
    // this.form.controls['search'].patchValue(null);
    this.form.reset();
    this.SearchInp.nativeElement.focus()
  }
  _onFocus(isFocus: boolean) {
    this.formFocus = isFocus;
  }

  
  // 
  setDefaultSidebar() {
    if (localStorage.getItem('coreSidebar')) {
      this.defaultSidebar = localStorage.getItem('coreSidebar');
      const body = document.getElementsByClassName('p-wrapper')[0];
      if (body && this.defaultSidebar) {
        body.classList.add(this.defaultSidebar);
      }
    }
  }

  toggleSidebar() {
    let body = document.getElementsByClassName("p-wrapper")[0];
    if (this.defaultSidebar) {
      body.classList.remove(this.defaultSidebar);
    }
    (this.defaultSidebar == 'h-sb') ? this.defaultSidebar = '' : this.defaultSidebar = 'h-sb';
    if (this.defaultSidebar) {
      body.classList.add(this.defaultSidebar);
      localStorage.setItem('coreSidebar', this.defaultSidebar);
    } else {
      localStorage.removeItem('coreSidebar');
    }
  }
  // 

  // theme
  setDefaultTheme() {
    if (localStorage.getItem('coreTheme')) {
      this.themeColor = localStorage.getItem('coreTheme');
      const body = document.getElementsByClassName('_core-page')[0];
      if (body && this.themeColor) {
        body.classList.add(this.themeColor);
      }
    }
  }
  themeSwitcher() {
    const body = document.getElementsByClassName('_core-page')[0];
    if (body && this.themeColor) {
      body.classList.remove(this.themeColor);
    }
    (this.themeColor == '__core-light-mode') ? this.themeColor = '__core-dark-mode' : this.themeColor = '__core-light-mode';
    if (body && this.themeColor) {
      body.classList.add(this.themeColor);
      localStorage.setItem('coreTheme', this.themeColor);
    }
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
