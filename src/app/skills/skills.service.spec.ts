import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { SkillsService } from './skills.service';

describe('SkillsService', () => {

    let spyHttp: jasmine.SpyObj<Http>;
    let service: SkillsService;

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

    beforeEach(() => {
        const httpSpy = jasmine.createSpyObj('Http', ['get', 'post', 'delete']);
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [SkillsService, { provide: Http, useValue: httpSpy }]
        }).compileComponents();
        service = TestBed.get(SkillsService);
        spyHttp = TestBed.get(Http);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all available skills', () => {
        spyHttp.get.and.returnValue(Observable.of(skillsList));
        service.viewAllSkills();
        expect(spyHttp.get.calls.count()).toBeGreaterThan(0);
    });

    it('should be able to delete skills', () => {
        spyHttp.delete.and.returnValue(Observable.of(skillsList));
        service.deleteSkill(skill.skillId);
        expect(spyHttp.delete.calls.count()).toBeGreaterThan(0);
    });

    it('should be able to edit skills ', () => {
        spyHttp.post.and.returnValue(Observable.of(skillsList));
        service.editSkill(skill);
        expect(spyHttp.post.calls.count()).toBeGreaterThan(0);
    });

    it('should be able to add skills ', () => {
        spyHttp.post.and.returnValue(Observable.of(skillsList));
        service.addSkill(skill);
        expect(spyHttp.post.calls.count()).toBeGreaterThan(0);
    });
});