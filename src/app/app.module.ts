import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './components/app/app.component';

import { CarService } from './services/car.service';
import { JliTableModule } from 'jli-table';

import { NgScrollbarModule } from 'ngx-scrollbar';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    JliTableModule,
    NgScrollbarModule
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
