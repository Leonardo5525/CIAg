import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ProdutosDetailComponent } from './produtos-detail.component';

describe('Produtos Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ProdutosDetailComponent,
              resolve: { produtos: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ProdutosDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load produtos on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ProdutosDetailComponent);

      // THEN
      expect(instance.produtos).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
