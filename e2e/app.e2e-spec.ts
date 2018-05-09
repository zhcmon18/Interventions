import { AppPage } from './app.po';

describe('stocks App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Déclarer un problème');
  });

  it('zone DESCRIPTION DU PROBLÈME : a une bordure ROUGE si nombre de caractères insuffisant', () => {
    page.setZoneDescriptionCaracteresInsuffisant();  
    expect(page.obtenirClasseZoneDescription()).toContain('is-invalid');
  });
  
  it('doit activer le bouton Sauvegarder avec champs valides scénario nominal', () => {
    page.setChampsValidesScenarioNominal();                    
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });   

});


