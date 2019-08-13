import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {HttpClientModule} from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {DemoMaterialModule} from './material-module';
import 'materialize-css';
import {MaterializeModule} from 'angular2-materialize';
import { HighchartsChartModule } from 'highcharts-angular';


import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { SearchFieldComponent } from './search-field/search-field.component';
import { ControlPanelComponent } from './dashboard/control-panel/control-panel.component';
import { PlotComponent } from './dashboard/plot/plot.component';
import { MapComponent } from './dashboard/control-panel/map/map.component';


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
    PlotComponent,
    MapComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    MaterializeModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
