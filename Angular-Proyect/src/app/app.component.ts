import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { MessageDto } from './models/message-dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  [x: string]: any;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe( (receivedObj: MessageDto) => { this.addToInbox(receivedObj);});  // calls the service method to get the new messages sent                                                
  }
  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];
  send(): void {
    if(this.msgDto) {
      if(this.msgDto.user.length == 0 || this.msgDto.user.length == 0){
        window.alert("Both fields are required.");
        return;
      } else {
        this.chatService.broadcastMessage(this.msgDto);                   // Send the message via a service
      }
    }
  }

  addToInbox(obj: MessageDto) {
    let newObj = new MessageDto();
    newObj.user = obj.user;
    newObj.msgText = obj.msgText;
    this.msgInboxArray.push(newObj);

  }
}
