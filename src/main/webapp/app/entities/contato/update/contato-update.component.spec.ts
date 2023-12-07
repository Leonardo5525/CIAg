import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ContatoService } from '../service/contato.service';
import { IContato } from '../contato.model';
import { ContatoFormService } from './contato-form.service';

import { ContatoUpdateComponent } from './contato-update.component';

describe('Contato Management Update Component', () => {
  let comp: ContatoUpdateComponent;
  let fixture: ComponentFixture<ContatoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let contatoFormService: ContatoFormService;
  let contatoService: ContatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ContatoUpdateComponent],
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
      .overrideTemplate(ContatoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ContatoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    contatoFormService = TestBed.inject(ContatoFormService);
    contatoService = TestBed.inject(ContatoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const contato: IContato = { id: 456 };

      activatedRoute.data = of({ contato });
      comp.ngOnInit();

      expect(comp.contato).toEqual(contato);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContato>>();
      const contato = { id: 123 };
      jest.spyOn(contatoFormService, 'getContato').mockReturnValue(contato);
      jest.spyOn(contatoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contato });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contato }));
      saveSubject.complete();

      // THEN
      expect(contatoFormService.getContato).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(contatoService.update).toHaveBeenCalledWith(expect.objectContaining(contato));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContato>>();
      const contato = { id: 123 };
      jest.spyOn(contatoFormService, 'getContato').mockReturnValue({ id: null });
      jest.spyOn(contatoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contato: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contato }));
      saveSubject.complete();

      // THEN
      expect(contatoFormService.getContato).toHaveBeenCalled();
      expect(contatoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContato>>();
      const contato = { id: 123 };
      jest.spyOn(contatoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contato });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(contatoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
