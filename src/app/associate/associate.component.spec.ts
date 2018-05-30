import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

import { AssociateComponent } from './associate.component';
import { AssociateService } from './associate.service';
import { SkillsService } from '../skills/skills.service';
import { Skills } from '../model/skills.model';
import { Associate } from '../model/associate.model';
import { SkillsFilterPipe } from '../skillsfilter.pipe';

describe('AssociateComponent', () => {
  let component: AssociateComponent;

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

  const skill: any = {
    "skillId": 14, "skillName": "JAX-RS", "skillRate": null
  }

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

  const associateObj: any = {
    "associateId": 206156, "name": "Ramraj",
    "email": "cicil.thomas@cognizant.com", "mobile": "8664139863", "gender": "M",
    "statusGreen": "N", "statusBlue": "Y", "statusRed": "N", "level1": "N", "level2": "Y",
    "level3": "N", "remark": "Cicil", "strength": "UI", "weakness": "backend",
    "skills": [{ "skillId": 1, "skillName": "HTML5", "skillRate": 16 },
    { "skillId": 2, "skillName": "CSS3", "skillRate": 15 }],
    "spoken": 0, "communication": 16,
    "logic": 12, "aptitude": 0, "confidence": 0, "other": "SASS"
  };

  beforeEach(async(() => {
    const associateServiceSpy = jasmine.createSpyObj('AssociateService', ['addAssociate', 'deleteAssociate']);
    const skillsServiceSpy = jasmine.createSpyObj('SkillsService', ['viewAllSkills', 'addSkill']);
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]),
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [AssociateComponent,
        SkillsFilterPipe
      ],
      providers: [AssociateComponent,
        FormBuilder,
        { provide: AssociateService, useValue: associateServiceSpy },
        { provide: SkillsService, useValue: skillsServiceSpy },
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get(name: string): string {
                  if (name === 'mode') {
                    return 'edit';
                  } else if (name === 'data') {
                    return JSON.stringify(associateObj);
                  }
                }
              }
            }
          }
        }]

    }).compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(AssociateComponent);
    spyAssociateService = TestBed.get(AssociateService);
    spySkillService = TestBed.get(SkillsService);
    spySkillService.viewAllSkills.and.returnValue(Observable.of(skillsList));
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should save associate details', () => {
    component.ngOnInit();
    component.form.controls['name'].setValue("Mathew");
    component.form.controls['email'].setValue("a@aol.com");
    component.form.controls['associateId'].setValue(455355);
    component.form.controls['mobile'].setValue("9995886316");
    component.form.controls['gender'].setValue("M");
    component.form.controls['status'].setValue("statusBlue");
    component.form.controls['level'].setValue("level1");
    component.form.controls['remark'].setValue("Remark");
    component.form.controls['photo'].setValue("");
    component.form.controls['communication'].setValue(1);
    component.form.controls['spoken'].setValue(2);
    component.form.controls['aptitude'].setValue(3);
    component.form.controls['logic'].setValue(4);
    component.form.controls['confidence'].setValue(5);
    component.form.controls['other'].setValue("other");
    component.form.controls['strength'].setValue("strength");
    component.form.controls['weakness'].setValue("weakness");
    spyAssociateService.addAssociate.and.returnValue(Observable.of({
      'status': 'success'
    }));
    component.onSave();
    expect(spyAssociateService.addAssociate.calls.count()).toBe(1);
  });

  it('should delete associate details', () => {
    component.ngOnInit();
    spyAssociateService.deleteAssociate.and.returnValue(Observable.of(associateList));
    component.onDelete();
    expect(spyAssociateService.deleteAssociate.calls.count()).toBeGreaterThan(0);
  });

  it('should add skill details', () => {
    component.ngOnInit();
    component.form.controls['newSkill'].setValue("ReactJs");
    spySkillService.addSkill.and.returnValue(Observable.of(skillsList));
    component.addSkill();
    expect(spySkillService.addSkill.calls.count()).toBeGreaterThan(0);
  });

  it('should reset associate details', () => {
    component.ngOnInit();
    component.onReset();
    expect(component.form.valid).toBeFalsy();
  });

  it('should edit associate details', () => {
    component.ngOnInit();
    expect(component.form.valid).toBeTruthy();
  });

  it('should cancel associate save operation', () => {
    component.ngOnInit();
    component.onCancel();
    expect(component.form.valid).toBeTruthy();
  });

});
