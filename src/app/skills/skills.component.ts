import { Component, OnInit } from '@angular/core';

import { SkillsService } from './skills.service';
import { Skills } from '../model/skills.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skills: Skills[];
  skill: Skills;
  private errorMessage: String;
  newSkill: string;

  constructor(
    private skillsService: SkillsService
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
  }

  deleteSkill(skillId: string) {
    this.skillsService.deleteSkill(skillId).subscribe(
      skills => {
        this.skills = skills;
        console.log(this.skills);
      },
      error => this.errorMessage = error
    );
  }

  editSkill(skill: Skills) {
    this.skills.forEach(obj => {
      if (obj.skillId === skill.skillId) {
        obj.isEdit = true;
      }
    });
  }

  updateSkill(skill: Skills) {
    this.skillsService.editSkill(skill)
      .subscribe(
      skills => {
        this.skills = skills;
        console.log(this.skills);
      },
      error => this.errorMessage = error
      );
  }

  addSkill() {
    if (this.newSkill) {
      this.skill = new Skills();
      this.skill.skillName = this.newSkill;
      this.skillsService.addSkill(this.skill)
        .subscribe(
        skills => {
          this.skills = skills;
          console.log(this.skills);
          this.newSkill = '';
        },
        error => this.errorMessage = error
        );
    }
  }

}
