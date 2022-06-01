import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  userData: User = new User;
  private readonly _destroying$ = new Subject<void>();

  constructor(private authService: MsalService,
     private msalBroadcastService: MsalBroadcastService,
     private http: HttpClient) { }

     
  baseUrl = "https://localhost:7127/api/user/";

  tryToLoginUser(): Observable<any>{
    this.pasteOnInit();
    let user = {
      Id: this.userData.sub,
      Email: this.userData.emails![0],
      Name: this.userData.given_name,
      Surname: this.userData.family_name,
    }
    return this.http.put<any>(this.baseUrl + 'PutUser', user);
  }

  ngOnInit(): void {
    this.pasteOnInit();
  }

  ngOnDestroy(): void {
    this.pasteOnDestroy();
  }

  pasteOnInit(): User{
    this.msalBroadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) =>  status === InteractionStatus.None || status === InteractionStatus.HandleRedirect),
      takeUntil(this._destroying$)
    )
    .subscribe(() => {
      this.checkAndSetActiveAccount();
      this.getClaims(this.authService.instance.getActiveAccount()?.idTokenClaims);
    })
    return this.userData;
  }

  pasteOnDestroy() {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  checkAndSetActiveAccount() {
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  getClaims(claims: any) {
    let c = new User()
    Object.keys(claims).forEach(function(k, v){
      if(k == "sub") { c.sub =  claims ? claims[k]: null; }
      if(k == "given_name") { c.given_name =  claims ? claims[k]: null; }
      if(k == "family_name") { c.family_name =  claims ? claims[k]: null; }
      if(k == "emails") { c.emails =  claims ? claims[k]: null; }
    });
    this.userData = c;
  }
}
