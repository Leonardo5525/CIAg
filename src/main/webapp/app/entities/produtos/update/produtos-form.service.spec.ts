import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../produtos.test-samples';

import { ProdutosFormService } from './produtos-form.service';

describe('Produtos Form Service', () => {
  let service: ProdutosFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutosFormService);
  });

  describe('Service methods', () => {
    describe('createProdutosFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProdutosFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            preco: expect.any(Object),
            categoria: expect.any(Object),
            imagem: expect.any(Object),
          }),
        );
      });

      it('passing IProdutos should create a new form with FormGroup', () => {
        const formGroup = service.createProdutosFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            preco: expect.any(Object),
            categoria: expect.any(Object),
            imagem: expect.any(Object),
          }),
        );
      });
    });

    describe('getProdutos', () => {
      it('should return NewProdutos for default Produtos initial value', () => {
        const formGroup = service.createProdutosFormGroup(sampleWithNewData);

        const produtos = service.getProdutos(formGroup) as any;

        expect(produtos).toMatchObject(sampleWithNewData);
      });

      it('should return NewProdutos for empty Produtos initial value', () => {
        const formGroup = service.createProdutosFormGroup();

        const produtos = service.getProdutos(formGroup) as any;

        expect(produtos).toMatchObject({});
      });

      it('should return IProdutos', () => {
        const formGroup = service.createProdutosFormGroup(sampleWithRequiredData);

        const produtos = service.getProdutos(formGroup) as any;

        expect(produtos).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProdutos should not enable id FormControl', () => {
        const formGroup = service.createProdutosFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProdutos should disable id FormControl', () => {
        const formGroup = service.createProdutosFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
