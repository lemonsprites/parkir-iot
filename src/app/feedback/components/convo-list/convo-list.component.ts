import { MessageService } from '@App/shared/services/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-convo-list',
    templateUrl: './convo-list.component.html',
    styleUrls: ['./convo-list.component.scss']
})
export class ConvoListComponent implements OnInit {
    conversations: any[] = [];
    selectedConversationId: string | null = null;

    ngOnInit(): void {
        this.loadConversations()
    }

    loadConversations() {
        this.messageService.getConversations().subscribe((conversations) => {
            this.conversations = conversations;
        });
    }
    selectConversation(conversationId: string) {
        this.selectedConversationId = conversationId;
        // Load messages for the selected conversation using this.selectedConversationId
    }

    constructor(
        private messageService: MessageService
    ) { }

}
