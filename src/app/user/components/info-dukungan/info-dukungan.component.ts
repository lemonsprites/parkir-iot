import { Component } from '@angular/core';

interface Message {
    text: string;
    isCustomer: boolean;
}

interface Ticket {
    id: number;
    title: string;
    messages: Message[];
}


@Component({
    selector: 'app-info-dukungan',
    templateUrl: './info-dukungan.component.html',
    styleUrls: ['./info-dukungan.component.scss']
})

export class InfoDukunganComponent {
    tickets: Ticket[] = [
        { id: 1, title: 'Ticket 1', messages: [] },
        { id: 2, title: 'Ticket 2', messages: [] },
        // Add more tickets as needed
    ];
    selectedTicket: Ticket | null = null;
    newMessage: string = '';

    selectTicket(ticket: Ticket) {
        this.selectedTicket = ticket;
    }

    sendMessage() {
        if (this.newMessage.trim() !== '') {
            if (this.selectedTicket) {
                this.selectedTicket.messages.push({ text: this.newMessage, isCustomer: true });
                this.newMessage = '';
                // Simulate agent's reply
                setTimeout(() => {
                    this.selectedTicket!.messages.push({ text: 'Hello! How can I assist you?', isCustomer: false });
                }, 1000);
            }
        }
    }

    createNewTicket() {
        const newTicket: Ticket = {
            id: this.tickets.length + 1,
            title: `Ticket ${this.tickets.length + 1}`,
            messages: []
        };
        this.tickets.push(newTicket);
        this.selectTicket(newTicket);
    }
}
