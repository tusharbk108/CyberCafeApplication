import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
@Injectable({
  providedIn: 'root'
})
export class StompServiceService {
  socket = new SockJS('http://localhost:8082/sba-websocket');
  stompClient = Stomp.over(this.socket);

  subscribe(topic:string,callback:any){
    const connected: boolean = this.stompClient.connected;
    if(connected){
      this.subscribeToTopic(topic,callback);
      return;
    }

    //if stomp client not connected then connect and subscribe the topic
    this.stompClient.connect({},():any=>{
      this.subscribeToTopic(topic,callback)
    })
  }
  private subscribeToTopic(topic:string,callback:any):void{
    this.stompClient.subscribe(topic,():any =>{
      callback();
    })
  }
  constructor() { }
}
