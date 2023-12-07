import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CustomerDetailsDetailComponent } from './customer-details-detail.component';

describe('CustomerDetails Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetailsDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CustomerDetailsDetailComponent,
              resolve: { customerDetails: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CustomerDetailsDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load customerDetails on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CustomerDetailsDetailComponent);

      // THEN
      expect(instance.customerDetails).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
