import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-home h1')).getText();
  }

  getPieChart() {
    return element(by.id('skillChart'));
  }

  getRegisteredCandidates() {
    return element(by.id('registeredCandidates')).getText();
  }

  getFemaleCandidates() {
    return element(by.id('femaleCandidates')).getText();
  }

  getMaleCandidates() {
    return element(by.id('maleCandidates')).getText();
  }

  getCandidatesFreshers() {
    return element(by.id('candidatesFreshers')).getText();
  }

  getCandidatesRated() {
    return element(by.id('candidatesRated')).getText();
  }

  getFemaleCandidatesRated() {
    return element(by.id('femaleCandidatesRated')).getText();
  }

  getMaleCandidatesRated() {
    return element(by.id('maleCandidatesRated')).getText();
  }

  getLevelOneCandidates() {
    return element(by.id('levelOneCandidates')).getText();
  }

  getLevelTwoCandidates() {
    return element(by.id('levelTwoCandidates')).getText();
  }

  getLevelThreeCandidates() {
    return element(by.id('levelThreeCandidates')).getText();
  }

  getAssociates() {
    return element.all(by.css('app-home tbody tr'));
  }
  
}
