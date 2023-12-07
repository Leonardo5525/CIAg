import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IContato, NewContato } from '../contato.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IContato for edit and NewContatoFormGroupInput for create.
 */
type ContatoFormGroupInput = IContato | PartialWithRequiredKeyOf<NewContato>;

type ContatoFormDefaults = Pick<NewContato, 'id'>;

type ContatoFormGroupContent = {
  id: FormControl<IContato['id'] | NewContato['id']>;
  nome: FormControl<IContato['nome']>;
  email: FormControl<IContato['email']>;
  telefone: FormControl<IContato['telefone']>;
  rg: FormControl<IContato['rg']>;
  cpf: FormControl<IContato['cpf']>;
};

export type ContatoFormGroup = FormGroup<ContatoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContatoFormService {
  createContatoFormGroup(contato: ContatoFormGroupInput = { id: null }): ContatoFormGroup {
    const contatoRawValue = {
      ...this.getFormDefaults(),
      ...contato,
    };
    return new FormGroup<ContatoFormGroupContent>({
      id: new FormControl(
        { value: contatoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nome: new FormControl(contatoRawValue.nome),
      email: new FormControl(contatoRawValue.email),
      telefone: new FormControl(contatoRawValue.telefone),
      rg: new FormControl(contatoRawValue.rg),
      cpf: new FormControl(contatoRawValue.cpf),
    });
  }

  getContato(form: ContatoFormGroup): IContato | NewContato {
    return form.getRawValue() as IContato | NewContato;
  }

  resetForm(form: ContatoFormGroup, contato: ContatoFormGroupInput): void {
    const contatoRawValue = { ...this.getFormDefaults(), ...contato };
    form.reset(
      {
        ...contatoRawValue,
        id: { value: contatoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ContatoFormDefaults {
    return {
      id: null,
    };
  }
}
