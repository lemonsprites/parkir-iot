import { AreaAddComponent } from '@App/shared/components/area-add/area-add.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { AddBookingComponent } from './components/add-booking/add-booking.component';
import { InfoDukunganComponent } from './components/info-dukungan/info-dukungan.component';
import { UserHeaderComponent } from './components/layouts/user-header/user-header.component';
import { UserSidebarComponent } from './components/layouts/user-sidebar/user-sidebar.component';
import { UserDasboardComponent } from './components/user-dasboard/user-dasboard.component';
import { UserComponent } from './user.component';
import { UserRoutes } from './user.routing';

const userRoutes: Routes = [


];

@NgModule({
    declarations: [UserComponent, UserDasboardComponent, UserHeaderComponent, InfoDukunganComponent, UserSidebarComponent, AddBookingComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, UserRoutes, ReactiveFormsModule, AreaAddComponent]
})
export class UserModule { }
