import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SkillsComponent } from './skills.component';
import { SkillsService } from '../skills/skills.service';
import { Skills } from '../model/skills.model';
import { SkillsFilterPipe } from '../skillsfilter.pipe';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
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

  beforeEach(async(() => {
    const skillsServiceSpy = jasmine.createSpyObj('SkillsService',
      ['viewAllSkills', 'addSkill', 'deleteSkill', 'editSkill']);
    TestBed.configureTestingModule({
      imports: [FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [SkillsComponent,
        SkillsFilterPipe
      ],
      providers: [SkillsComponent,
        { provide: SkillsService, useValue: skillsServiceSpy },
        { provide: APP_BASE_HREF, useValue: '/skill' }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(SkillsComponent);
    spySkillService = TestBed.get(SkillsService);
    spySkillService.viewAllSkills.and.returnValue(Observable.of(skillsList));
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
