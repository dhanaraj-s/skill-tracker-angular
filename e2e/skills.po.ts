import { browser, by, element } from 'protractor';

export class SkillsPage {
  navigateTo() {
    return browser.get('/skill');
  }

  getParagraphText() {
    return element(by.css('app-skills h2')).getText();
  }

  getSkills() {
    return element.all(by.css('app-skills tbody tr'));
  }

}
