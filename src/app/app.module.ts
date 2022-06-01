import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScheduleModule, ResizeService, DragAndDropService, RecurrenceEditorAllModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './auth-config';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ProjectUserComponent } from './components/project-user/project-user.component';
import { ProjectComponent } from './components/project/project.component';
import { FileViewerComponent } from './components/file-viewer/file-viewer.component';
import { DialogTechnologyCreateComponent } from './components/dialog-technology-create/dialog-technology-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TechnologyComponent } from './components/technology/technology.component';
import { DialogCandidateTableComponent } from './components/dialog-candidate-table/dialog-candidate-table.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { DialogCreateProjectComponent } from './components/dialog-create-project/dialog-create-project.component';
import { PipePipe } from './pipes/pipe.pipe';
import { TechnologyPipe } from './pipes/technology.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PollComponent } from './components/poll/poll.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    ProjectComponent,
    ProjectUserComponent,
    FileViewerComponent,
    DialogTechnologyCreateComponent,
    TechnologyComponent,
    DialogCandidateTableComponent,
    SchedulerComponent,
    DialogCreateProjectComponent,
    PipePipe,
    TechnologyPipe,
    PollComponent
  ],
  entryComponents: [
    DialogTechnologyCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ScheduleModule,
    RecurrenceEditorAllModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,

    MsalModule.forRoot(new PublicClientApplication(msalConfig),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ["https://kaplenko.onmicrosoft.com/dip-api/dip.read"]
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          ["https://kaplenko.onmicrosoft.com/dip-api/v1.0/me", ["https://kaplenko.onmicrosoft.com/dip-api/dip.read"]]
        ])
      }),

    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard,
    AppComponent,
    ProfileComponent,
    HomeComponent,
    ProjectComponent,
    ProjectUserComponent,
    DialogTechnologyCreateComponent,
    SchedulerComponent,
    DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService, ResizeService, DragAndDropService

  ],
  bootstrap: [
    AppComponent,
    SchedulerComponent,
    MsalRedirectComponent
  ]
})
export class AppModule { }