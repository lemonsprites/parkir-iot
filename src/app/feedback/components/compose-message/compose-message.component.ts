import { MessageService } from '@App/shared/services/message.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-compose-message',
    templateUrl: './compose-message.component.html',
    styleUrls: ['./compose-message.component.scss']
})
export class ComposeMessageComponent {
    messageContent: any;
    selectedConversationId: any;

    sendMessage() {
        const messageData = {
            sender: 'user1',
            content: this.messageContent,
            timestamp: new Date().toISOString()
        };
        this.messageService.sendMessage(this.selectedConversationId, messageData).subscribe(() => {
            this.messageContent = ''; // Clear the input field
        });
    }

    constructor(
        private messageService: MessageService
    ) { }
}