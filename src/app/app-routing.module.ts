import { FullMockComponent } from './pages/full-mock/full-mock.component';
import { MockMongodbComponent } from './pages/mock-mongodb/mock-mongodb.component';
import { ListContactComponent } from './pages/list-contact/list-contact.component';
import { FullContactComponent } from './pages/full-contact/full-contact.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateContactComponent } from './pages/create-contact/create-contact.component';
import { HealthResearchComponent } from './pages/health-research/health-research.component';



const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "createcontact", component: CreateContactComponent },
  { path: "listcontact", component: ListContactComponent },
  { path: "fullcontact", component: FullContactComponent },
  { path: "health", component: HealthResearchComponent },
  { path: "mockmongo", component: MockMongodbComponent },
  { path: "fullmock", component: FullMockComponent },
  { path: "dashboard", component: DashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
