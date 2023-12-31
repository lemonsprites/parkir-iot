import { AreaAddComponent } from '@App/shared/components/area-add/area-add.component';
import { DetailBookingComponent } from '@App/user/components/user-dasboard/components/detail-booking/detail-booking.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { EnterOtpComponent } from './components/user-dasboard/components/enter-otp/enter-otp.component';
import { InfoDukunganComponent } from './components/info-dukungan/info-dukungan.component';
import { UserHeaderComponent } from './components/layouts/user-header/user-header.component';
import { UserSidebarComponent } from './components/layouts/user-sidebar/user-sidebar.component';
import { AddBookingComponent } from './components/user-dasboard/components/add-booking/add-booking.component';
import { ListBookingComponent } from './components/user-dasboard/components/list-booking/list-booking.component';
import { UserDasboardComponent } from './components/user-dasboard/user-dasboard.component';
import { UserComponent } from './user.component';
import { UserRoutes } from './user.routing';
import { ActivityBookingComponent } from './components/user-dasboard/components/activity-booking/activity-booking.component';
import { UserAkunComponent } from '@App/user/components/user-akun/user-akun.component';
import { FeedbackModule } from '@App/feedback/feedback.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
    declarations: [UserComponent, UserDasboardComponent, UserHeaderComponent, InfoDukunganComponent, UserSidebarComponent, AddBookingComponent, DetailBookingComponent, EnterOtpComponent, ListBookingComponent, ActivityBookingComponent, UserAkunComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, UserRoutes, ReactiveFormsModule, AreaAddComponent, DataTablesModule, ClipboardModule, FeedbackModule, NgApexchartsModule]
})
export class UserModule { }
