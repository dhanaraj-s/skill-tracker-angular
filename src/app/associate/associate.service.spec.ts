import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AssociateService } from './associate.service';
import { SkillsFilterPipe } from '../skillsfilter.pipe'

describe('AssociateService', () => {

    let spyHttp: jasmine.SpyObj<Http>;
    let service: AssociateService;
    let skillsfilter: SkillsFilterPipe;

    const associateList = [{"associateId":206156,"name":"Ramraj",
    "email":"cicil.thomas@cognizant.com","mobile":"8664139863","gender":"M",
    "statusGreen":"N","statusBlue":"Y","statusRed":"N","level1":"N","level2":"Y",
    "level3":"N","remark":"Cicil","strength":"UI","weakness":"backend",
    "skills":[{"skillId":1,"skillName":"HTML5","skillRate":16},
    {"skillId":2,"skillName":"CSS3","skillRate":15}],
    "spoken":0,"communication":16,
    "logic":12,"aptitude":0,"confidence":0,"other":"SASS"},
    {"associateId":455355,"name":"Dhanaraj","email":"dhanaraj.s@cognizant.com",
    "mobile":"9995886316","gender":"M","statusGreen":"N","statusBlue":"N","statusRed":"Y",
    "level1":"N","level2":"N","level3":"Y","remark":"Nothing","strength":"strength",
    "weakness":"weakness",
    "skills":[{"skillId":1,"skillName":"HTML5","skillRate":16},
    {"skillId":10,"skillName":"Spring","skillRate":19},
    {"skillId":11,"skillName":"Spring MVC","skillRate":17},
    {"skillId":13,"skillName":"Spring Restful","skillRate":17},
    {"skillId":17,"skillName":"Hidernate","skillRate":16}],
    "spoken":16,"communication":0,"logic":0,"aptitude":17,"confidence":0,"other":"Other"}];

    const associate: any = {
        "associateId":206156,"name":"Ramraj",
        "email":"cicil.thomas@cognizant.com","mobile":"8664139863","gender":"M",
        "statusGreen":"N","statusBlue":"Y","statusRed":"N","level1":"N","level2":"Y",
        "level3":"N","remark":"Cicil","strength":"UI","weakness":"backend",
        "skills":[{"skillId":1,"skillName":"HTML5","skillRate":16},
        {"skillId":2,"skillName":"CSS3","skillRate":15}],
        "spoken":0,"communication":16,
        "logic":12,"aptitude":0,"confidence":0,"other":"SASS"
    };

    const file: any = File;

    beforeEach(() => {
        const httpSpy = jasmine.createSpyObj('Http', ['get', 'post', 'delete']);
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [AssociateService, { provide: Http, useValue: httpSpy }]
        }).compileComponents();
        service = TestBed.get(AssociateService);
        spyHttp = TestBed.get(Http);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all associate details', () => {
        spyHttp.get.and.returnValue(Observable.of(associateList));
        service.viewAllAssociates();
        expect(spyHttp.get.calls.count()).toBeGreaterThan(0);
    });

    it('should be able to delete associates', () => {
        spyHttp.delete.and.returnValue(Observable.of(associateList));
        service.deleteAssociate(associate.associateId);
        expect(spyHttp.delete.calls.count()).toBeGreaterThan(0);
    });

    it('should be able to add associates ', () => {
        spyHttp.post.and.returnValue(Observable.of(associateList));
        service.addAssociate(file, associate);
        expect(spyHttp.post.calls.count()).toBe(0);
    });
});