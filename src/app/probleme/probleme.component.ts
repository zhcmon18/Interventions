import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VerifierCaracteresValidator } from '../Shared/caracteres-validator';
import { ProblemeService } from './probleme.service';
import { ITypeProbleme } from './probleme';
import { emailMatcherValidator } from '../Shared/emailMatcher-validator';
 
 @Component({
   selector: 'Inter-probleme',
   templateUrl: './probleme.component.html',
   styleUrls: ['./probleme.component.css']
 })
 export class ProblemeComponent implements OnInit {
 
   problemeForm: FormGroup;
   categoriesProbleme: ITypeProbleme[];
   errorMessage: string;

   constructor(private fb:FormBuilder, private probleme: ProblemeService) { }
 
   ngOnInit() {
     this.problemeForm = this.fb.group({
 
        prenom: ['',[VerifierCaracteresValidator.sansEspaces(), VerifierCaracteresValidator.longueurMinimum(3)]],
        nom: ['',[VerifierCaracteresValidator.sansEspaces(), VerifierCaracteresValidator.longueurMinimum(3)]],
        noProbleme: ['', Validators.required],
        notifier:['PasNotifier'],
        telephone: [{value: '', disabled: true}],
        notificationCourrielGroupe: this.fb.group({
          Courriel: [{value: '', disabled: true}],
          CourrielValidation: [{value: '', disabled: true}],
           
        }),
        descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
          noUnite: '', 
        dateProbleme: {value: Date(), disabled: true}
      });

     this.probleme.obtenirProbleme()
    .subscribe(cat => this.categoriesProbleme = cat,
               error => this.errorMessage = <any>error);  

     this.problemeForm.get('notifier').valueChanges
     .subscribe(value => this.appliquerNotifications(value));
   }

  appliquerNotifications(typeNotification: string): void{
    const ControleCourriel = this.problemeForm.get('notificationCourrielGroupe.Courriel');
    const ControleTelephone = this.problemeForm.get('telephone');
    const ControleCourrielValidation = this.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
    const CourrielGroupControl = this.problemeForm.get('notificationCourrielGroupe')

    ControleCourriel.clearValidators();
    ControleTelephone.clearValidators();
    ControleCourrielValidation.clearValidators();

    ControleCourriel.reset();
    ControleTelephone.reset();
    ControleCourrielValidation.reset();

    ControleCourriel.disable();
    ControleTelephone.disable();
    ControleCourrielValidation.disable();

    if(typeNotification === 'MeNotifierCourriel'){
      ControleCourriel.enable();
      ControleCourriel.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      ControleCourrielValidation.enable();
      ControleCourrielValidation.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      CourrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielConfirmation()])])
    }else if(typeNotification === 'MeNotifierMessagerie'){
      ControleTelephone.enable();
      ControleTelephone.setValidators([Validators.required,Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)]);
    }

    ControleCourriel.updateValueAndValidity();
    ControleTelephone.updateValueAndValidity();
    ControleCourrielValidation.updateValueAndValidity();
    CourrielGroupControl.updateValueAndValidity();
  }
 
 }