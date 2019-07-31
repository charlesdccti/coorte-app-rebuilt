import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {DemoMaterialModule} from './material-module';
import 'materialize-css';
import {MaterializeModule} from 'angular2-materialize';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { SearchFieldComponent } from './search-field/search-field.component';
import { ControlPanelComponent } from './dashboard/control-panel/control-panel.component';
import { PlotComponent } from './dashboard/plot/plot.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    DashboardComponent,
    HomeComponent,
    NavComponent,
    SearchFieldComponent,
    ControlPanelComponent,
    PlotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterializeModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
