import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AssociateService } from '../associate/associate.service';
import { SkillsService } from '../skills/skills.service';
import { Skills } from '../model/skills.model';
import { Associate } from '../model/associate.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pieChartLabels: string[] = ['HTML5', 'CSS3', 'Java', 'Spring', 'Spring Restful', 'Angular1', 'Angular2', 'React', 'Others'];
  public pieChartData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  public pieChartType: string = 'pie';

  associates: Associate[];
  skills: Skills[];
  errorMessage: string;
  random: number;
  skillsMap = new Map();

  registeredCandidates: number;
  femaleCandidates: number;
  maleCandidates: number;
  freshersCandidates: number;
  ratedCandidates: number = 0;
  femaleRatedCandidates: number = 0;
  maleRatedCandidates: number = 0;
  level1Candidates: number;
  level2Candidates: number;
  level3Candidates: number;

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(
    private skillsService: SkillsService,
    private associateService: AssociateService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.skillsService.viewAllSkills()
      .subscribe(
      skills => {
        this.skills = skills;
        console.log(this.skills);
      },
      error => this.errorMessage = error
      );
    this.associateService.viewAllAssociates()
      .subscribe(
      associates => {
        this.associates = associates;
        this.mapAssociatesSkills(this.associates);
        console.log(this.associates);
      },
      error => this.errorMessage = error
      );
    this.random = Math.random();
  }

  mapAssociatesSkills(associates: Associate[]) {
    this.registeredCandidates = associates.length;
    var female = 0;
    var male = 0;
    var level1 = 0;
    var level2 = 0;
    var level3 = 0;
    var ratedMale = 0;
    var ratedFemale = 0;
    this.associates.forEach(obj => {
      obj.skills.forEach(element => {
        if (obj.skillsString === undefined || obj.skillsString === null) {
          obj.skillsString = '';
        } else {
          obj.skillsString += ', ';
        }
        obj.skillsString += element.skillName;
        if (this.skillsMap.has(element.skillName)) {
          var value = this.skillsMap.get(element.skillName) + element.skillRate;
          this.skillsMap.set(element.skillName, value);
        } else {
          this.skillsMap.set(element.skillName, element.skillRate);
        }
      });
      if (obj.gender === 'F') {
        female++;
        if (obj.statusRed === 'Y') {
          this.ratedCandidates++;
          ratedFemale++;
        }
      } else {
        male++;
        if (obj.statusRed === 'Y') {
          this.ratedCandidates++;
          ratedMale++;
        }
      }
      if (obj.level1 === 'Y') {
        level1++;
      } else if (obj.level2 === 'Y') {
        level2++;
      } else if (obj.level3 === 'Y') {
        level3++;
      }
    });

    this.femaleCandidates = (female/this.registeredCandidates)*100;
    this.femaleCandidates = Math.round(this.femaleCandidates * 100) / 100;
    this.maleCandidates = (male/this.registeredCandidates)*100;
    this.maleCandidates = Math.round(this.maleCandidates * 100) / 100;
    this.freshersCandidates = (level1/this.registeredCandidates)*100;
    this.freshersCandidates = Math.round(this.freshersCandidates * 100) / 100;
    this.femaleRatedCandidates = (ratedFemale/this.ratedCandidates)*100;
    this.femaleRatedCandidates = Math.round(this.femaleRatedCandidates * 100) / 100;
    this.maleRatedCandidates = (ratedMale/this.ratedCandidates)*100;
    this.maleRatedCandidates = Math.round(this.maleRatedCandidates * 100) / 100;
    this.level1Candidates = (level1/this.registeredCandidates)*100;
    this.level1Candidates = Math.round(this.level1Candidates * 100) / 100;
    this.level2Candidates = (level2/this.registeredCandidates)*100;
    this.level2Candidates = Math.round(this.level2Candidates * 100) / 100;
    this.level3Candidates = (level3/this.registeredCandidates)*100;
    this.level3Candidates = Math.round(this.level3Candidates * 100) / 100;

    this.pieChartData = new Array<number>();
    this.pieChartLabels.forEach(element=>{
      if(this.skillsMap.has(element)) {
        this.pieChartData.push(this.skillsMap.get(element));
      } else {
        this.pieChartData.push(0);
      }
    });
    console.log(this.pieChartData);
  }

  navigateToAssociate() {
    this.router.navigate(['/', 'associate']);
  }

  editAssociate(associate: Associate) {
    if (associate) {
      this.router.navigate(['/associate', { "mode": "edit", data: JSON.stringify(associate) }]);
    }
  }

  deleteAssociate(associateId: string) {
    this.associateService.deleteAssociate(associateId).subscribe(
      associates => {
        this.associates = associates;
        this.mapAssociatesSkills(this.associates);
        console.log(this.associates);
      },
      error => this.errorMessage = error
    );
  }

  viewAssociate(associate: Associate) {
    if (associate) {
      this.router.navigate(['/associate', { "mode": "edit", data: JSON.stringify(associate) }]);
    }
  }

}
