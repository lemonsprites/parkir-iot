import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { InfoDukunganComponent } from './components/info-dukungan/info-dukungan.component';
import { UserHeaderComponent } from './components/layouts/user-header/user-header.component';
import { UserSidebarComponent } from './components/layouts/user-sidebar/user-sidebar.component';
import { UserDasboardComponent } from './components/user-dasboard/user-dasboard.component';
import { UserReservasiComponent } from './components/user-reservasi/user-reservasi.component';
import { UserComponent } from './user.component';
import { UserRoutes } from './user.routing';

const userRoutes: Routes = [


];

@NgModule({
    declarations: [UserComponent, UserDasboardComponent, UserHeaderComponent, InfoDukunganComponent, UserSidebarComponent, UserReservasiComponent],
    imports: [CommonModule, FormsModule, UserRoutes]
})
export class UserModule { }
