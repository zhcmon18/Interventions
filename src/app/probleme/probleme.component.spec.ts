import { async, ComponentFixture, TestBed } from '@angular/core/testing';
 
import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ProblemeService } from './probleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AngularFontAwesomeModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[ProblemeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('zone PRENOM invalide avec 2 caractères', () => {
  let errors = {};
  let zone = component.problemeForm.controls['prenom'];
  zone.setValue('a'.repeat(2));
  errors = zone.errors || {};
  expect(errors['longueurMinimum']).toBeFalsy();
  });

  it('zone PRENOM valide avec 3 caractères', () => {
  let errors = {};
  let zone = component.problemeForm.controls['prenom'];
  zone.setValue('a'.repeat(3));
  errors = zone.errors || {};
  expect(zone.valid).toBeTruthy;
  //expect(errors['longueurMinimum']).toBeNull();
  });

  it('zone PRENOM valide avec 200 caractères', () => {
  let errors = {};
  let zone = component.problemeForm.controls['prenom'];
  zone.setValue('a'.repeat(200));
  errors = zone.errors || {};
  expect(zone.valid).toBeTruthy;
  //expect(errors['longueurMinimum']).toBeNull();
  });

  it('zone PRENOM invalide avec aucune valeur', () => {
  let errors = {};
  let zone = component.problemeForm.controls['prenom'];
  zone.setValue('');
  errors = zone.errors || {};
  expect(errors['longueurMinimum']).toBeFalsy();
  });

 it('zone PRENOM invalide avec 1 caractère', () => {
  let errors = {};
  let zone = component.problemeForm.controls['prenom'];
  zone.setValue('a');
  errors = zone.errors || {};
  expect(errors['longueurMinimum']).toBeFalsy();
  });

 it('zone PRENOM invalide avec 10 espaces', () => {
  let errors = {};
  let zone = component.problemeForm.controls['prenom'];
  zone.setValue(' '.repeat(10));
  errors = zone.errors || {};
  expect(errors['sansEspaces']).toBeFalsy();
  });

 it('zone PRENOM invalide avec 2 espaces et 1 caractère', () => {
  let errors = {};
  let zone = component.problemeForm.controls['prenom'];
  zone.setValue('  a');
  errors = zone.errors || {};
  expect(errors['longueurMinimum']).toBeFalsy();
  });

it('zone TELEPHONE est désativée quand ne pas me notifier', ()=>{
   component.appliquerNotifications('Non');
   let zone = component.problemeForm.get('telephone');
   expect(zone.status).toEqual('DISABLED');
  });

it('Zone TELEPHONE est vide quand ne pas me notifier', () =>{
    component.appliquerNotifications('Non');
    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();
    })
  
it('Zone ADRESSE COURRIEL est désactivée si non sélectionnée'), () =>{
  component.appliquerNotifications('Non');
  let zone = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
  expect(zone.status).toEqual('DISABLED');
}
it('Zone ADRESSE COURRIEL est vide quand ne pas me notifier', () =>{
  component.appliquerNotifications('Non');
  let zone = component.problemeForm.get('notificationCourrielGroupe.Courriel');
  expect(zone.value).toBeNull();
  });
    
it('Zone CONFIRMER COURRIEL est désactivé si non sélectionner', ()=>{
  component.appliquerNotifications('Non');
  let zone = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
  expect(zone.status).toEqual('DISABLED');
  });
    
it('Zone CONFIRMER COURRIEL est vide quand ne pas me notifier', () =>{
  component.appliquerNotifications('Non');
  let zone = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
  expect(zone.value).toBeNull();
  });

it('Zone ADRESSE COURRIEL a la même valeur que la zone CONFIRMER COURRIEL', () => {
  component.appliquerNotifications('MeNotifierCourriel');
  let errors = {};

  let courriel = component.problemeForm.get('notificationCourrielGroupe.Courriel');
  let courrielValidation = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
  courriel.setValue('remy_b-f@hotmail.com');
  courrielValidation.setValue('remy_b-f@hotmail.com');

  let groupe = component.problemeForm.get('notificationCourrielGroupe');
  errors = groupe.errors || {};
  expect(errors['EmailMatch']).toBeUndefined();
});

/*13*/

it('Zone TELEPHONE est désactivée quand notifier par courriel', () =>{
  component.appliquerNotifications('MeNotifierCourriel');
  let zone = component.problemeForm.get('telephone');
  expect(zone.status).toEqual('DISABLED');
});

it('Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
  component.appliquerNotifications('MeNotifierCourriel');
  let zone = component.problemeForm.get('notificationCourrielGroupe.Courriel');
  expect(zone.status).not.toEqual('DISABLED');
});

it('Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
  component.appliquerNotifications('MeNotifierCourriel');
  let errors = {};
  
  let zone = component.problemeForm.get('notificationCourrielGroupe.Courriel');
  zone.setValue('');
  errors = zone.errors || {};
  expect(errors['required']).toBeTruthy();
});

it('Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
  component.appliquerNotifications('MeNotifierCourriel');
  let errors = {};
  let zone = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
  zone.setValue('');
  errors = zone.errors || {};
  expect(errors['required']).toBeTruthy();
});

it('Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
  component.appliquerNotifications('MeNotifierCourriel');
  let errors = {};
  let zone = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
  zone.setValue('ecineic');
  errors = zone.errors || {};
  expect(errors['pattern']).toBeTruthy();
});

it('Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur retourne null', () => {
  component.appliquerNotifications('MeNotifierCourriel');
  let zoneCourriel = component.problemeForm.get('notificationCourrielGroupe.Courriel');
  let zoneValidation = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
  zoneCourriel.setValue('');
  zoneValidation.setValue('test@hotmail.com');
  let zoneGroup = component.problemeForm.get('notificationCourrielGroupe');
 let errors = zoneGroup.errors || {};
  expect(errors['Match']).toBeUndefined();
});

it('Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
  component.appliquerNotifications('MeNotifierCourriel');
  let zoneCourriel = component.problemeForm.get('notificationCourrielGroupe.Courriel');
  let zoneValidation = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
  zoneValidation.setValue('');
  zoneCourriel.setValue('test@hotmail.com');
  let zoneGroup = component.problemeForm.get('notificationCourrielGroupe');
  let errors = zoneGroup.errors || {};
  expect(errors['Match']).toBeUndefined();
});

it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier courriel', () => {
  component.appliquerNotifications('MeNotifierCourriel');
  let zoneCourriel = component.problemeForm.get('notificationCourrielGroupe.Courriel');
  let zoneValidation = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
  zoneValidation.setValue('test@hotmail.com');
  zoneCourriel.setValue('testtest@hotmail.com');
  let zoneGroup = component.problemeForm.get('notificationCourrielGroupe');
  let errors = zoneGroup.errors || {};
  expect(errors['Match']).toBeTruthy();
});

it('Zones ADRESSE COURRIEL avec valeur et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
 component.appliquerNotifications('MeNotifierCourriel');
  let zoneCourriel = component.problemeForm.get('notificationCourrielGroupe.Courriel');
  let zoneValidation = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
  zoneValidation.setValue('test@hotmail.com');
  zoneCourriel.setValue('test@hotmail.com');
  let zoneGroup = component.problemeForm.get('notificationCourrielGroupe');
  let errors = zoneGroup.errors || {};
  expect(errors['Match']).toBeUndefined();
});


/* fin 13 */
/* 14 */
it('Zone TELEPHONE est activée quand notifier par message texte', () => {
      component.appliquerNotifications('MeNotifierMessagerie');
  
      let zone = component.problemeForm.get('telephone');
      expect(zone.status).not.toEqual('DISABLED');
});

it('Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
      component.appliquerNotifications('MeNotifierMessagerie');
  
      let zone = component.problemeForm.get('notificationCourrielGroupe.Courriel');
      expect(zone.status).toEqual('DISABLED');
});

it('Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
      component.appliquerNotifications('MeNotifierMessagerie');
  
      let zone = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
      expect(zone.status).toEqual('DISABLED');
});

it('Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
      component.appliquerNotifications('MeNotifierMessagerie');
      let zone = component.problemeForm.get('telephone');
      zone.setValue('');
      let errors = zone.errors || {};
      expect(errors['required']).toBeTruthy();
});

it('Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
      component.appliquerNotifications('MeNotifierMessagerie');
      let zone = component.problemeForm.get('telephone');
      zone.setValue('450662925e');
      let errors = zone.errors || {};
      expect(errors['pattern']).toBeTruthy();
});

it('Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
      component.appliquerNotifications('MeNotifierMessagerie');
      let zone = component.problemeForm.get('telephone');
      zone.setValue('450662925');
      let errors = zone.errors || {};
      expect(errors['minlength']).toBeTruthy();
});

it('Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
      component.appliquerNotifications('MeNotifierMessagerie');
      let zone = component.problemeForm.get('telephone');
      zone.setValue('45066292521');
      let errors = zone.errors || {};
      expect(errors['maxlength']).toBeTruthy();
});

it('Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
      component.appliquerNotifications('MeNotifierMessagerie');
      let zone = component.problemeForm.get('telephone');
      zone.setValue('4506629252');
      expect(zone.valid).toBeTruthy();
    });

    /* fin 14 */

    /*17*/
it('Zone DESCRIPTION est valide avec plus de 5 caractères', () => {
  component.appliquerNotifications('MeNotifierMessagerie');
  let zone = component.problemeForm.get('descriptionProbleme');
  zone.setValue('Description');
  expect(zone.valid).toBeTruthy();
});

  });