import { Component, OnInit } from '@angular/core';


import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';
import { StompServiceService } from '../stomp-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userDetails:any;
  chosenMod: string = "";
  mode: string | undefined;
  display:boolean = false;
  constructor(private stompService:StompServiceService,
    private adminService:AdminService,
    private toastr: ToastrService
) { }

  ngOnInit(): void {
    this.stompService.subscribe('/topic/request',():void=>{
      console.log("getCall")
      this.userLogout();
      this.getUserDetails();
    })

    this.getUserDetails();
  }


  userLogout(){
      this.adminService.userLogout().subscribe(
        data =>{
         this.toastr.success(data.status+" Logout");
        

        }
      )
  }

  getUserDetails(){
    this.adminService.getUserDetails().subscribe(
      data =>{
        this.userDetails=data;
        console.log(this.userDetails);
        
      }
    )
  }

  modo(userId:String){
    console.log(userId);
    switch(this.chosenMod) {  
       case "Cash": { 
         console.log("Cash");
         this.mode='Cash';
         this.setPaymentMode(userId,this.mode);
         window.location.reload();
          break;
       }  
       case "UPI": { 
         console.log('UPI')
        this.mode='UPI';
        this.setPaymentMode(userId,this.mode);
        window.location.reload();
         break;
      }  

      
    }
  }
  setPaymentMode(userId:any,mode:any){
  this.adminService.paymentMode(userId,mode).subscribe(
    data =>{
      console.log(data);
      if(data.status=='success'){
        this.display=true;
      }
    }
  )
  }
}
