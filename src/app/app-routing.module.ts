import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { BookingComponent } from './booking/booking.component';


const appRouters: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'schedule', component: ScheduleComponent},
    {path: 'booking', component: BookingComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRouters)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
