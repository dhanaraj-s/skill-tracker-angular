import { AppPage } from './app.po';
import { AssociatePage } from './associate.po';
import { HomePage } from './home.po';
import { SkillsPage } from './skills.po';
import { browser, by, element } from 'protractor';

describe('skill-tracker App', () => {
  let page: AppPage;
  let homePage: HomePage;
  let associatePage: AssociatePage;
  let skillsPage: SkillsPage;

  beforeEach(() => {
    page = new AppPage();
    homePage = new HomePage();
    associatePage = new AssociatePage();
    skillsPage = new SkillsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual(' Skills Tracker');
  });

  it('should show navbar options', () => {
    page.navigateTo();
    expect(page.getNavBarOptions()).toBeTruthy();
    expect(element(by.id('addAssociate'))).toBeTruthy();
    expect(element(by.id('addSkills'))).toBeTruthy();
  });
  /**
   * Home Page
   */
  it('should display Dashboard', () => {
    homePage.navigateTo();
    expect(homePage.getParagraphText()).toEqual('Dashboard');
  });

  it('should show pie chart', () => {
    homePage.navigateTo();
    expect(homePage.getPieChart()).toBeTruthy();
  });

  it('should show all candidates details', () => {
    homePage.navigateTo();
    expect(homePage.getRegisteredCandidates()).toEqual('REGISTERED CANDIDATES');
    expect(homePage.getFemaleCandidates()).toEqual('FEMALE CANDIDATES');
    expect(homePage.getMaleCandidates()).toEqual('MALE CANDIDATES');
    expect(homePage.getCandidatesFreshers()).toEqual('CANDIDATES FRESHERS');
    expect(homePage.getCandidatesRated()).toEqual('CANDIDATES RATED');
    expect(homePage.getFemaleCandidatesRated()).toEqual('FEMALE CANDIDATES RATED');
    expect(homePage.getMaleCandidatesRated()).toEqual('MALE CANDIDATES RATED');
    expect(homePage.getLevelOneCandidates()).toEqual('LEVEL 1 CANDIDATES');
    expect(homePage.getLevelTwoCandidates()).toEqual('LEVEL 2 CANDIDATES');
    expect(homePage.getLevelThreeCandidates()).toEqual('LEVEL 3 CANDIDATES');
  });

  it('should show all associate details', () => {
    homePage.navigateTo();
    expect(homePage.getAssociates().count()).toBeGreaterThan(0);
  });

  /**
   * Associate Page
   */
  it('should display Add New Employee Skills', () => {
    associatePage.navigateTo();
    expect(associatePage.getParagraphText()).toEqual('Add New Employee Skills');
  });

  it('should display Employee Skills', () => {
    associatePage.navigateTo();
    expect(associatePage.getAssociateSkills()).toEqual('Skills');
  });

  it('should display Employee Registration Form', () => {
    associatePage.navigateTo();
    expect(element(by.id('name'))).toBeTruthy();
    expect(element(by.id('email'))).toBeTruthy();
    expect(element(by.id('mobile'))).toBeTruthy();
    expect(element(by.id('photo'))).toBeTruthy();
    expect(element(by.id('male'))).toBeTruthy();
    expect(element(by.id('female'))).toBeTruthy();
    expect(element(by.id('statusGreen'))).toBeTruthy();
    expect(element(by.id('statusBlue'))).toBeTruthy();
    expect(element(by.id('statusRed'))).toBeTruthy();
    expect(element(by.id('level1'))).toBeTruthy();
    expect(element(by.id('level2'))).toBeTruthy();
    expect(element(by.id('level3'))).toBeTruthy();
    expect(element(by.id('remark'))).toBeTruthy();
    expect(element(by.id('other'))).toBeTruthy();
    expect(element(by.id('strength'))).toBeTruthy();
    expect(element(by.id('weakness'))).toBeTruthy();
    expect(associatePage.getButton()).toBeTruthy();
  });

 /**
  * Skills Page
  */

  it('should display Add Skills', () => {
    skillsPage.navigateTo();
    expect(skillsPage.getParagraphText()).toEqual('Add Skills');
  });

  it('should display Available Skills', () => {
    skillsPage.navigateTo();
    expect(skillsPage.getSkills().count()).toBeGreaterThan(0);
  });

  it('should be able to search Available Skills', () => {
    skillsPage.navigateTo();
    expect(element(by.id('skillSearchText'))).toBeTruthy();
  });

  it('should be able to add New Skills', () => {
    skillsPage.navigateTo();
    expect(element(by.id('newSkill'))).toBeTruthy();
  });
});
