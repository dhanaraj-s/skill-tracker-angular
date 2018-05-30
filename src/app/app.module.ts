import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AssociateComponent } from './associate/associate.component';
import { SkillsComponent } from './skills/skills.component';
import { HomeComponent } from './home/home.component';
import { SkillsFilterPipe } from './skillsfilter.pipe';
import { AssociateFilterPipe } from './associatefilter.pipe';
import { SkillsService } from './skills/skills.service';
import { AssociateService } from './associate/associate.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'associate', component: AssociateComponent },
  { path: 'skill', component: SkillsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AssociateComponent,
    SkillsComponent,
    HomeComponent,
    SkillsFilterPipe,
    AssociateFilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [
    SkillsService,
    AssociateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
