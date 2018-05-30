import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { SkillsService } from '../skills/skills.service';
import { AssociateService } from './associate.service';
import { Skills } from '../model/skills.model';
import { Associate } from '../model/associate.model';

@Component({
    selector: 'app-associate',
    templateUrl: './associate.component.html',
    styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {

    form: FormGroup;
    skills: Skills[];
    associate: Associate = new Associate();
    errorMessage: string;
    associateId: number;
    file: File;
    editMode: boolean;
    viewMode: boolean;
    localUrl: any;
    skill: Skills;

    constructor(
        private formBuilder: FormBuilder,
        private skillsService: SkillsService,
        private associateService: AssociateService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: [null, Validators.required],
            email: [null, [Validators.required]],
            associateId: [null, Validators.required],
            mobile: [null, [Validators.required]],
            photo: [null, null],
            remark: [null, Validators.required],
            communication: [null, Validators.required],
            spoken: [null, Validators.required],
            aptitude: [null, Validators.required],
            logic: [null, Validators.required],
            confidence: [null, Validators.required],
            gender: [null, Validators.required],
            status: [null, Validators.required],
            level: [null, Validators.required],
            other: [null, null],
            strength: [null, Validators.required],
            weakness: [null, Validators.required],
            newSkill: [null, null],
            searchText: [null, null]
        });
        this.mapDefaultFormControls();
        this.skillsService.viewAllSkills()
            .subscribe(
            skills => {
                this.skills = skills;
                this.mapSkillsDefaultVal(this.skills);
                this.poulateEditData();
                console.log(this.skills);
            },
            error => this.errorMessage = error
            );
    }

    poulateEditData() {
        /**
         * Edit/View flow
         */
        this.editMode = false;
        this.viewMode = false;
        var associateObj = this.route.snapshot.paramMap.get('data');
        var mode = this.route.snapshot.paramMap.get('mode');
        if ("edit" === mode) {
            this.editMode = true;
        } 
        if (associateObj) {
            var associateObject = JSON.parse(associateObj);
            associateObject.skills.forEach(element => {
                this.setValue(element, element.skillRate);
            });
            this.form.controls['name'].setValue(associateObject.name);
            this.form.controls['associateId'].setValue(associateObject.associateId);
            var status;
            if (associateObject.statusBlue === 'Y') {
                status = "statusBlue";
            } else if (associateObject.statusGreen === 'Y') {
                status = "statusGreen";
            } else if (associateObject.statusRed === 'Y') {
                status = "statusRed";
            }
            var level;
            if (associateObject.level1 === 'Y') {
                level = "level1";
            } else if (associateObject.level2 === 'Y') {
                level = "level2";
            } else if (associateObject.level3 === 'Y') {
                level = "level3";
            }
            this.form.controls['status'].setValue(status);
            this.form.controls['level'].setValue(level);
            this.form.controls['gender'].setValue(associateObject.gender);
            this.form.controls['remark'].setValue(associateObject.remark);
            this.form.controls['mobile'].setValue(associateObject.mobile);
            this.form.controls['email'].setValue(associateObject.email);
            this.form.controls['photo'].setValue("");
            this.localUrl = "http://localhost:8090/skilltracker/getimage/" + associateObject.associateId;
            this.form.controls['communication'].setValue(associateObject.communication);
            this.form.controls['spoken'].setValue(associateObject.spoken);
            this.form.controls['aptitude'].setValue(associateObject.aptitude);
            this.form.controls['logic'].setValue(associateObject.logic);
            this.form.controls['confidence'].setValue(associateObject.confidence);
            this.form.controls['other'].setValue(associateObject.other);
            this.form.controls['strength'].setValue(associateObject.strength);
            this.form.controls['weakness'].setValue(associateObject.weakness);
        }
    }

    mapSkillsDefaultVal(skills: Skills[]) {
        this.skills.forEach(obj => {
            obj.skillRate = 0;
        });
    }

    mapDefaultFormControls() {
        this.form.controls['status'].setValue("statusGreen");
        this.form.controls['level'].setValue("level1");
        this.form.controls['gender'].setValue("M");
        this.form.controls['communication'].setValue(0);
        this.form.controls['spoken'].setValue(0);
        this.form.controls['aptitude'].setValue(0);
        this.form.controls['logic'].setValue(0);
        this.form.controls['confidence'].setValue(0);
    }

    showPreviewImage(event: any) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.localUrl = event.target.result;
            }
            this.file = event.target.files[0];
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    setValue(skill: Skills, value: string) {
        this.skills.forEach(obj => {
            if (obj.skillId === skill.skillId) {
                obj.skillRate = parseInt(value);
            }
        });
    }

    onReset() {
        this.form.reset();
        this.mapSkillsDefaultVal(this.skills);
        this.mapDefaultFormControls();
    }

    onCancel() {
        this.router.navigate(['/']);
    }

    onSave() {
        if (this.form.valid) {
            console.log(this.form.value);
            this.associate.associateId = this.form.value.associateId;
            this.associate.name = this.form.value.name;
            this.associate.email = this.form.value.email;
            this.associate.mobile = this.form.value.mobile;
            this.associate.remark = this.form.value.remark;
            this.associate.statusGreen = this.form.value.status === 'statusGreen' ? 'Y' : 'N';
            this.associate.statusBlue = this.form.value.status === 'statusBlue' ? 'Y' : 'N';
            this.associate.statusRed = this.form.value.status === 'statusRed' ? 'Y' : 'N';
            this.associate.level1 = this.form.value.level === 'level1' ? 'Y' : 'N';
            this.associate.level2 = this.form.value.level === 'level2' ? 'Y' : 'N';
            this.associate.level3 = this.form.value.level === 'level3' ? 'Y' : 'N';
            this.associate.skills = this.skills;
            this.associate.spoken = this.form.get('spoken').value;
            this.associate.communication = this.form.get('communication').value;
            this.associate.logic = this.form.get('logic').value;
            this.associate.aptitude = this.form.get('aptitude').value;
            this.associate.confidence = this.form.get('confidence').value;
            this.associate.other = this.form.value.other;
            this.associate.strength = this.form.value.strength;
            this.associate.weakness = this.form.value.weakness;
            this.associate.gender = this.form.value.gender;
            this.associateService.addAssociate(this.file, this.associate).subscribe(
                result => {
                    console.log(result);
                    this.navigateAway(result);
                },
                error => console.log(<any>error)
            );
        }
    }

    onDelete() {
        this.associateService.deleteAssociate(this.form.value.associateId).subscribe(
            associates => {
              var associatesList = associates;
              console.log(associatesList);
              this.router.navigate(['/']);
            },
            error => this.errorMessage = error
          );
    }

    navigateAway(data) {
        if (data.status === 200) {
            this.router.navigate(['/']);
        }
    }

    addSkill() {
        if (this.form.value.newSkill) {
            this.skill = new Skills();
            this.skill.skillName = this.form.value.newSkill;
            this.skillsService.addSkill(this.skill)
                .subscribe(
                skills => {
                    this.skills = skills;
                    console.log(this.skills);
                    this.mapSkillsDefaultVal(this.skills);
                    this.poulateEditData();
                    this.form.controls['newSkill'].setValue("");
                },
                error => this.errorMessage = error
                );
        }
    }

}
