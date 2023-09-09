import { Injectable } from '@angular/core';
import { Database, list, push, ref } from '@angular/fire/database';
import { Observable, forkJoin, from, map, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(private db: Database) { }

    getMessages(conversationId: string): Observable<any[]> {
        return list(ref(this.db, `messages/${conversationId}`));
    }

    sendMessage(conversationId: string, messageData: any) {
        return from(push(ref(this.db, `conversations/${conversationId}/messages`), messageData));
    }

    getConversations() {
        return list(ref(this.db, `conversations/`));
    }

    submitReport(reportData: any) {
        return push(ref(this.db, 'reports'), reportData);
    }

    getReportsWithMessages(): Observable<any[]> {
        return list(ref(this.db,'reports')).pipe(
            switchMap(reports => {
                const reportObservables = reports.map((report: any): any =>
                    this.getMessages(report.message_id).pipe(
                        map(message => ({
                            ...report,
                            message
                        }))
                    )
                );
                return forkJoin(reportObservables);
            })
        );
    }
}
