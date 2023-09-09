import { MessageService } from '@App/shared/services/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

    selectedConversationId: any
    messages: any
    currentUser: string = JSON.parse(localStorage.getItem('user')).uid


    ngOnInit() {
        this.loadMessages();
    }

    loadMessages() {
        this.messageService.getMessages(this.selectedConversationId).subscribe((messages) => {
            this.messages = messages;
        });
    }

    constructor(
        private messageService: MessageService
    ) { }
}
