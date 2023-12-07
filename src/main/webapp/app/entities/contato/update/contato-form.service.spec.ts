import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../contato.test-samples';

import { ContatoFormService } from './contato-form.service';

describe('Contato Form Service', () => {
  let service: ContatoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContatoFormService);
  });

  describe('Service methods', () => {
    describe('createContatoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createContatoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            email: expect.any(Object),
            telefone: expect.any(Object),
            rg: expect.any(Object),
            cpf: expect.any(Object),
          }),
        );
      });

      it('passing IContato should create a new form with FormGroup', () => {
        const formGroup = service.createContatoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            email: expect.any(Object),
            telefone: expect.any(Object),
            rg: expect.any(Object),
            cpf: expect.any(Object),
          }),
        );
      });
    });

    describe('getContato', () => {
      it('should return NewContato for default Contato initial value', () => {
        const formGroup = service.createContatoFormGroup(sampleWithNewData);

        const contato = service.getContato(formGroup) as any;

        expect(contato).toMatchObject(sampleWithNewData);
      });

      it('should return NewContato for empty Contato initial value', () => {
        const formGroup = service.createContatoFormGroup();

        const contato = service.getContato(formGroup) as any;

        expect(contato).toMatchObject({});
      });

      it('should return IContato', () => {
        const formGroup = service.createContatoFormGroup(sampleWithRequiredData);

        const contato = service.getContato(formGroup) as any;

        expect(contato).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IContato should not enable id FormControl', () => {
        const formGroup = service.createContatoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewContato should disable id FormControl', () => {
        const formGroup = service.createContatoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
