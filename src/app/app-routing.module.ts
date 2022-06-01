import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectUserComponent } from './components/project-user/project-user.component';
import { ProjectComponent } from './components/project/project.component';
import { FileViewerComponent } from './components/file-viewer/file-viewer.component';
import { DialogTechnologyCreateComponent } from './components/dialog-technology-create/dialog-technology-create.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'project-user',
    component: ProjectUserComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'project',
    component: ProjectComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'file-viewer',
    component: FileViewerComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'dialog-technology-create',
    component: DialogTechnologyCreateComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'scheduler',
    component: SchedulerComponent,
    canActivate: [MsalGuard]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation:'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }