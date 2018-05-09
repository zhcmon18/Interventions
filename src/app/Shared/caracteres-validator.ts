import { ValidatorFn, AbstractControl } from "@angular/forms";

export class VerifierCaracteresValidator {
    static sansEspaces(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean, } | null => {

            if ((c.value.replace(/ /g, "").length == 0)) {
                return { 'chaineValide': false };

            } else if ((c.value.replace(/ /g, "").length >= 0)) {
                return null;
            }
        };
    }
    static longueurMinimum(min: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value.trim().length >= min) {
                return null;
            }
            return { 'longueurMinimum': false };

        };
    }
} 