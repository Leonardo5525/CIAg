import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProdutos, NewProdutos } from '../produtos.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProdutos for edit and NewProdutosFormGroupInput for create.
 */
type ProdutosFormGroupInput = IProdutos | PartialWithRequiredKeyOf<NewProdutos>;

type ProdutosFormDefaults = Pick<NewProdutos, 'id'>;

type ProdutosFormGroupContent = {
  id: FormControl<IProdutos['id'] | NewProdutos['id']>;
  nome: FormControl<IProdutos['nome']>;
  preco: FormControl<IProdutos['preco']>;
  categoria: FormControl<IProdutos['categoria']>;
  imagem: FormControl<IProdutos['imagem']>;
};

export type ProdutosFormGroup = FormGroup<ProdutosFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProdutosFormService {
  createProdutosFormGroup(produtos: ProdutosFormGroupInput = { id: null }): ProdutosFormGroup {
    const produtosRawValue = {
      ...this.getFormDefaults(),
      ...produtos,
    };
    return new FormGroup<ProdutosFormGroupContent>({
      id: new FormControl(
        { value: produtosRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nome: new FormControl(produtosRawValue.nome),
      preco: new FormControl(produtosRawValue.preco),
      categoria: new FormControl(produtosRawValue.categoria),
      imagem: new FormControl(produtosRawValue.imagem),
    });
  }

  getProdutos(form: ProdutosFormGroup): IProdutos | NewProdutos {
    return form.getRawValue() as IProdutos | NewProdutos;
  }

  resetForm(form: ProdutosFormGroup, produtos: ProdutosFormGroupInput): void {
    const produtosRawValue = { ...this.getFormDefaults(), ...produtos };
    form.reset(
      {
        ...produtosRawValue,
        id: { value: produtosRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ProdutosFormDefaults {
    return {
      id: null,
    };
  }
}
