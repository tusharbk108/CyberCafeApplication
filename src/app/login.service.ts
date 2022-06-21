import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  baseurl = "http://localhost:8081/";

  url = "";

  public login(username:any,password:any):Observable<any>{
    return this.http.post(this.baseurl+"login",{
      "username" : username,
      "password" : password
    })
  }

  public saveLoginTime(username:any,loginTime:any):Observable<any>{
    return this.http.post(this.baseurl+"saveLoginTime",{
      "username":username, 
      "loginTime":loginTime     
    })
  }

  public logout(username:any,logoutTime:any,timeUtilised:any):Observable<any>{
    console.log(  "username"+username+"logoutTime"+logoutTime+"timeUtilized"+timeUtilised);
    return this.http.put(this.baseurl+"logout",{
      "username":username, 
      "logoutTime":logoutTime,
      "timeUtilized":timeUtilised
    })
  }

  public paymentMode(userId:any,mode:any):Observable<any>{
    return this.http.put(this.baseurl+"paymentMode",{
      "userId":userId, 
      "mode":mode     
    })
  }
}
