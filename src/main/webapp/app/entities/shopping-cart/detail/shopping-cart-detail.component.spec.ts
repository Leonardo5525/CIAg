import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ShoppingCartDetailComponent } from './shopping-cart-detail.component';

describe('ShoppingCart Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ShoppingCartDetailComponent,
              resolve: { shoppingCart: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ShoppingCartDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load shoppingCart on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ShoppingCartDetailComponent);

      // THEN
      expect(instance.shoppingCart).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
