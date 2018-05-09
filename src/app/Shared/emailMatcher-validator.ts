import { AbstractControl, ValidatorFn } from '@angular/forms';

export class emailMatcherValidator{

    static courrielConfirmation(): ValidatorFn{
        return (c: AbstractControl): { [key: string]: boolean } | null => { 
            let email = c.get('Courriel');
            let emailVal = c.get('CourrielValidation');

        if(!email.value || !emailVal.value ){
            return null;
        }

        if(email.value === emailVal.value){
            return null;
        }

        return {'Match': true};
        };
    }
}