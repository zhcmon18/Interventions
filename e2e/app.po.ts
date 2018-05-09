import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/probleme');
  }

  getParagraphText() {
    return element(by.css('Inter-root h5')).getText();
  }

  setChampsValidesScenarioNominal() : void {
    element(by.id('prenomId')).sendKeys('Test prenom');
    element(by.id('nomId')).sendKeys('Test nom');    
    // Sélectionner le premier élément dans la zone de liste déroulante
    element(by.id('noProblemeId')).all(by.tagName('option')).get(1).click();      
    // Cliquer sur la première option du bouton radio
    element.all(by.id('NotifierId')).get(0).click();      
  }
  boutonSubmit() : ElementFinder { 
    return element(by.buttonText('Sauvegarder'));
  } 
  setZoneDescriptionCaracteresInsuffisant() : void {
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('XXXX');
  }

  obtenirClasseZoneDescription()   { 
    return element(by.id('descriptionProblemeId')).getAttribute("class");
  }  
}



