import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProdutosService } from '../service/produtos.service';
import { IProdutos } from '../produtos.model';
import { ProdutosFormService } from './produtos-form.service';

import { ProdutosUpdateComponent } from './produtos-update.component';

describe('Produtos Management Update Component', () => {
  let comp: ProdutosUpdateComponent;
  let fixture: ComponentFixture<ProdutosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let produtosFormService: ProdutosFormService;
  let produtosService: ProdutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ProdutosUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ProdutosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProdutosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    produtosFormService = TestBed.inject(ProdutosFormService);
    produtosService = TestBed.inject(ProdutosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const produtos: IProdutos = { id: 456 };

      activatedRoute.data = of({ produtos });
      comp.ngOnInit();

      expect(comp.produtos).toEqual(produtos);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProdutos>>();
      const produtos = { id: 123 };
      jest.spyOn(produtosFormService, 'getProdutos').mockReturnValue(produtos);
      jest.spyOn(produtosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ produtos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: produtos }));
      saveSubject.complete();

      // THEN
      expect(produtosFormService.getProdutos).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(produtosService.update).toHaveBeenCalledWith(expect.objectContaining(produtos));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProdutos>>();
      const produtos = { id: 123 };
      jest.spyOn(produtosFormService, 'getProdutos').mockReturnValue({ id: null });
      jest.spyOn(produtosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ produtos: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: produtos }));
      saveSubject.complete();

      // THEN
      expect(produtosFormService.getProdutos).toHaveBeenCalled();
      expect(produtosService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProdutos>>();
      const produtos = { id: 123 };
      jest.spyOn(produtosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ produtos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(produtosService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
