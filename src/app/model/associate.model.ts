import { Skills } from '../model/skills.model';
import { Observable } from 'rxjs/Rx';

export class Associate {
    associateId: number;
    name: string;
    email: string;
    mobile: string;
    statusGreen: string;
    statusBlue: string;
    statusRed: string;
    level1: string;
    level2: string;
    level3: string;
    remark: string;
    strength: string;
    weakness: string;
    skills: Skills[];
    spoken: number;
    communication: number;
    logic: number;
    aptitude: number;
    confidence: number;
    other: string;
    skillsString: string;
    gender: string;
    constructor() {}
}
