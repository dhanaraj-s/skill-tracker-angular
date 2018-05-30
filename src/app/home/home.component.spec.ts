import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { HomeComponent } from './home.component';
import { AssociateService } from '../associate/associate.service';
import { SkillsService } from '../skills/skills.service';
import { Skills } from '../model/skills.model';
import { Associate } from '../model/associate.model';
import { AssociateFilterPipe } from '../associatefilter.pipe';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let spyAssociateService: jasmine.SpyObj<AssociateService>;
  let spySkillService: jasmine.SpyObj<SkillsService>;

  const skillsList = [{ "skillId": 1, "skillName": "HTML5", "skillRate": null },
  { "skillId": 2, "skillName": "CSS3", "skillRate": null },
  { "skillId": 3, "skillName": "Bootstrap", "skillRate": null },
  { "skillId": 4, "skillName": "Javascript", "skillRate": null },
  { "skillId": 5, "skillName": "Jquery", "skillRate": null },
  { "skillId": 6, "skillName": "Angular 1", "skillRate": null },
  { "skillId": 7, "skillName": "Angular 2", "skillRate": null },
  { "skillId": 8, "skillName": "Angular 4", "skillRate": null },
  { "skillId": 9, "skillName": "React", "skillRate": null },
  { "skillId": 10, "skillName": "Spring", "skillRate": null },
  { "skillId": 11, "skillName": "Spring MVC", "skillRate": null },
  { "skillId": 12, "skillName": "Java", "skillRate": null },
  { "skillId": 13, "skillName": "Spring Restful", "skillRate": null },
  { "skillId": 14, "skillName": "JAX-RS", "skillRate": null },
  { "skillId": 15, "skillName": "JSON", "skillRate": null },
  { "skillId": 16, "skillName": "XML", "skillRate": null },
  { "skillId": 17, "skillName": "Hidernate", "skillRate": null },
  { "skillId": 18, "skillName": "Spring Cache", "skillRate": null },
  { "skillId": 19, "skillName": "Devops", "skillRate": null }];

  const associateList = [{
    "associateId": 206156, "name": "Ramraj",
    "email": "cicil.thomas@cognizant.com", "mobile": "8664139863", "gender": "M",
    "statusGreen": "N", "statusBlue": "Y", "statusRed": "N", "level1": "N", "level2": "Y",
    "level3": "N", "remark": "Cicil", "strength": "UI", "weakness": "backend",
    "skills": [{ "skillId": 1, "skillName": "HTML5", "skillRate": 16 },
    { "skillId": 2, "skillName": "CSS3", "skillRate": 15 }],
    "spoken": 0, "communication": 16,
    "logic": 12, "aptitude": 0, "confidence": 0, "other": "SASS"
  },
  {
    "associateId": 455355, "name": "Dhanaraj", "email": "dhanaraj.s@cognizant.com",
    "mobile": "9995886316", "gender": "M", "statusGreen": "N", "statusBlue": "N", "statusRed": "Y",
    "level1": "N", "level2": "N", "level3": "Y", "remark": "Nothing", "strength": "strength",
    "weakness": "weakness",
    "skills": [{ "skillId": 1, "skillName": "HTML5", "skillRate": 16 },
    { "skillId": 10, "skillName": "Spring", "skillRate": 19 },
    { "skillId": 11, "skillName": "Spring MVC", "skillRate": 17 },
    { "skillId": 13, "skillName": "Spring Restful", "skillRate": 17 },
    { "skillId": 17, "skillName": "Hidernate", "skillRate": 16 }],
    "spoken": 16, "communication": 0, "logic": 0, "aptitude": 17, "confidence": 0, "other": "Other"
  }];

  beforeEach(async(() => {
    const associateServiceSpy = jasmine.createSpyObj('AssociateService', ['viewAllAssociates', 'deleteAssociate']);
    const skillsServiceSpy = jasmine.createSpyObj('SkillsService', ['viewAllSkills']);
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]),
        FormsModule,
        ReactiveFormsModule,
        ChartsModule
      ],
      declarations: [HomeComponent,
        AssociateFilterPipe
      ],
      providers: [HomeComponent,
        { provide: AssociateService, useValue: associateServiceSpy },
        { provide: SkillsService, useValue: skillsServiceSpy },
        { provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(HomeComponent);
    spyAssociateService = TestBed.get(AssociateService);
    spySkillService = TestBed.get(SkillsService);
    spySkillService.viewAllSkills.and.returnValue(Observable.of(skillsList));
    spyAssociateService.viewAllAssociates.and.returnValue(Observable.of(associateList));
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
