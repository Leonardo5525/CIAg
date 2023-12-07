import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ContatoDetailComponent } from './contato-detail.component';

describe('Contato Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContatoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ContatoDetailComponent,
              resolve: { contato: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ContatoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load contato on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ContatoDetailComponent);

      // THEN
      expect(instance.contato).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
