import { VerifierCaracteresValidator } from "./caracteres-validator";
import { AbstractControl } from "@angular/forms";

describe('sansEspaces Validator', () => {
   
    it('une chaîne vide est invalide', () =>  {    
        let control = {value: ""};
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['chaineValide']).toBe(false);
    });

    it('une chaîne avec 10 espaces est invalide', () =>  {    
        let control = {value: "         "};
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['chaineValide']).toBe(false);
    });
   
    it('une phrase avec des mots est valide', () =>  {    
        let control = {value: "ng testtest mots"};
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result).toBe(null);
    });

    it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide ', () =>  {    
        let control = {value: "   test trois espaces   "};
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result).toBe(null);
    });
});

describe('longueurMinimum Validator', () => {
   it('Une expression avec 1 espace et 2 caractères est invalide', () => {
       let control = { value: ' xx'};
       let validator = VerifierCaracteresValidator.longueurMinimum(3);
       let result = validator(control as AbstractControl);
       expect(result['longueurMinimum']).toBe(false);
       });
   
   it('Une expression avec 2 espace et 1 caractère est invalide', () => {
       let control = { value: '  x'};
       let validator = VerifierCaracteresValidator.longueurMinimum(3);
       let result = validator(control as AbstractControl);
       expect(result['longueurMinimum']).toBe(false);
       });

   it('Une phrase avec 3 espaces et 3 caractères est valide', () => {
       let control = { value: '   J’aime Angular'};
       let validator = VerifierCaracteresValidator.longueurMinimum(3);
       let result = validator(control as AbstractControl);
       expect(result).toBe(null);
       });

   it('Une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
       let control = { value: '     J’aime Angular     '};
       let validator = VerifierCaracteresValidator.longueurMinimum(3);
       let result = validator(control as AbstractControl);
       expect(result).toBe(null);
       });
}); 