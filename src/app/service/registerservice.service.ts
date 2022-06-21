import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterserviceService {
 


  constructor(private http: HttpClient) { }

  baseurl = "http://localhost:8081/";

  url = "";


  getExistingEmail(email:any):Observable<any> {
    return this.http.get(this.baseurl+"checkEmailExistOrNot/"+email);
  }

  isUsernameAvailable(username: any):Observable<any> {
    return this.http.get(this.baseurl+"isUsernameAvailable/"+username);
  }

  public RegisterUser (name: any,email : any,username : any,password : any):Observable <any>{

    this.url=this.baseurl + "register";

    return this.http.post(this.url,{"name":name, "email":email, "username":username, "password":password});

  }

  upload(file: File,email: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('put', `${this.baseurl}uploadimage/${email}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  uploadId(file: File,email: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('put', `${this.baseurl}uploadId/${email}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  
}
