import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterserviceService } from '../service/registerservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  name: string | undefined;
  email: any;
  username: any;
  password: any;

  nameValid:boolean=false;
 
  nameContainsNumber:boolean=false;
  emailValid: boolean=false;
  emailExist: boolean=false;
  emailExist1: boolean=false;
  userNameavailable: boolean=false;
  userNameNotavailable: boolean=false;
  shortUsername: boolean=false;
  passwordMin: boolean=false;
  validPassword: boolean=false;
  userdetails: any;



  constructor(private router:Router, private registerservice:RegisterserviceService) { }

  ngOnInit(): void {

  }

  onSubmit(){
    this.registerservice.RegisterUser(this.name,this.email,this.username,this.password)
    .subscribe(data =>{
      console.log(data);
     
    })
    this.router.navigate(['/fileupload',this.email]);
  }

  getName(name:string){
   

    if(name.length<3){
      this.nameValid=true;
    }else{
      this.nameValid=false;
    }
    let matchPattern =name.match(/\d+/g);
    if (matchPattern != null) {
      this.nameContainsNumber=true;
     }
    else{
      this.nameContainsNumber=false;
    }
  }

  getEmail(email:string){

    if (!((email.match("@")) && (email.match(".com")))) {
      this.emailValid=true;
      this.emailExist=false;
      this.emailExist1=false;
     }
    else{
      this.emailValid=false;
      this.registerservice.getExistingEmail(email).subscribe(
          data =>{
            if(data.status=="Exist"){
              this.emailExist = true;
              this.emailExist1=false;
              this.userNameavailable=false;
            }else{
              this.emailExist1=true;
              this.emailExist = false;
            }
          }
      );
    }
  }

  getUsername(username:string){
    if(username.length < 4){
      this.shortUsername = true ;
      this.userNameavailable = false;
    }else{
      this.shortUsername = false ;
      this.registerservice.isUsernameAvailable(username).subscribe(
        data =>{
          if(data.status=="available"){
            this.userNameavailable = true;
            this.userNameNotavailable = false;
          }else{
            this.userNameavailable = false;
            this.userNameNotavailable = true;
          }
        }
    );
    }
  }

  checkPassword(password:string){
    if(password.length < 8){
    this.passwordMin = true;
    this.validPassword = false;
    }else{
      this.passwordMin = false;
      this.validPassword = true;
    }
  }

}
