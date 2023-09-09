import { MessageService } from '@App/shared/services/message.service';
import { ToastService } from '@App/toast/toast.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent {
    onSubmitReport() {
        // Submit the report using reportService

        let reportData = {}
        this.messageService.submitReport(reportData).then(() => {
            // Show a success message
            this.toast.showToast('Info Guys!', 'Laporan berhasil dikirim');
            // Clear form fields
            // this.clearForm();
        });
    }

    constructor(
        private messageService: MessageService,
        private toast: ToastService
    ) { }
}