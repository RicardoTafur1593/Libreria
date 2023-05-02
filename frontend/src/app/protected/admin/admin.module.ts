import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CartModule } from 'src/app/material/cart/cart.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { DialogComponent } from './dialog/dialog.component';
import { AutorDialogComponent } from './autor-dialog/autor-dialog.component';

@NgModule({
  providers: [
    CurrencyPipe,
    TitleCasePipe,
  ],
  declarations: [
    AdminComponent,
    DialogComponent,
    AutorDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    CartModule,

    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatSidenavModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
})
export class AdminModule { }
