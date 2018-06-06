import { browser, by, element } from 'protractor';

export class AssociatePage {
  navigateTo() {
    return browser.get('/associate');
  }

  getParagraphText() {
    return element(by.css('app-associate h2')).getText();
  }

  getAssociateSkills() {
    return element(by.css('app-associate h4')).getText();
  }

  getButton() {
    return element(by.css('app-associate btn btn-primary btn-block button-space'));
  }

}
