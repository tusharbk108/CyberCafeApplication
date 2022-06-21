import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { LoginService } from '../login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hours: any = '00';
  minutes: any = '00';
  seconds: any = '00';
  counter: number | undefined;
  timerRef: any;

  username: any;
  loginTime: any;
  logoutTime: any;
  usedTime: any;

  constructor(private router: Router,
    private loginService: LoginService) {

  }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.loginTime = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    this.loginService.saveLoginTime(this.username,this.loginTime).subscribe(
      data => console.log("Done")    );
    this.startTimer();
  }

  startTimer() {


    this.timerRef = setInterval(() => {
    
        this.seconds++;

        if(this.seconds==60){

          this.seconds=0;
           this.minutes++;
           if (this.minutes < 10) {
            this.minutes = '0' + this.minutes;
          } else {
            this.minutes = '' + this.minutes;
          }
         
        }
       
        if(this.minutes==60){
          this.minutes='00';
          this.hours++;
          if (this.hours < 10) {
            this.hours = '0' + this.hours;
          } else {
            this.hours = '' + this.hours;
          }
       
        }
        if (this.seconds < 10) {
          this.seconds = '0' + this.seconds;
        } else {
          this.seconds = '' + this.seconds;
        }
 
        
    
     
    },1000);
  
  
   
  
   
   
   
  }

  // startTimer() {

    
  //   const startTime = Date.now() - (this.counter || 0);
  //   this.timerRef = setInterval(() => {
  //     this.counter = Date.now() - 1655698850162;
  //     console.log(Date.now());
  //     this.minutes =  Math.floor(Math.floor(this.counter % 3600000) / 10000).toFixed(0);
  //     this.hours = Math.floor(this.counter / 3600000);
    
  //     this.seconds = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
  //     if (Number(this.hours) < 10) {
  //       this.hours = '0' + this.hours;
  //     } else {
  //       this.hours = '' + this.hours;
  //     }
  //    if(this.minutes==60){
  //     this.minutes=0;
      
  //    }
  //     if (Number(this.minutes) < 10) {
  //       this.minutes = '0' + this.minutes;
  //     } else {
  //       this.minutes = '' + this.minutes;
  //     }

  //     if (Number(this.seconds) < 10) {
  //       this.seconds = '0' + this.seconds;
  //     } else {
  //       this.seconds = '' + this.seconds;
  //     }
  //   });
  // }


  logout() {
    this.logoutTime = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    this.usedTime = this.hours + ":" + this.minutes + ":" + this.seconds;

    this.loginService.logout(this.username, this.logoutTime, this.usedTime).subscribe(
      data => console.log("saved")
    );
    this.counter = undefined;

    this.seconds = '00',
      this.minutes = '00';
    this.hours = '00';

    clearInterval(this.timerRef);
    localStorage.removeItem('username');
    alert("Are you sure. You want to Logout");
    this.router.navigate(['login']);


  }
}
