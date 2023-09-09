import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './components/report/report.component';
import { ConvoListComponent } from './components/convo-list/convo-list.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { ComposeMessageComponent } from './components/compose-message/compose-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReportComponent,
    ConvoListComponent,
    MessageListComponent,
    ComposeMessageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FeedbackModule { }
