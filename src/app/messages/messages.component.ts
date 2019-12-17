import { Component, OnInit } from "@angular/core";
import { MessageService } from "../message.service";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"]
})
export class MessagesComponent implements OnInit {
  messages: string[];
  constructor(private messageService: MessageService) {
    this.messages = this.messageService.messages;
  }

  ngOnInit() {}

  clear(): void {
    this.messageService.clear();
  }
}
