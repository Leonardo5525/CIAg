import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IContato } from '../contato.model';
import { ContatoService } from '../service/contato.service';

export const contatoResolve = (route: ActivatedRouteSnapshot): Observable<null | IContato> => {
  const id = route.params['id'];
  if (id) {
    return inject(ContatoService)
      .find(id)
      .pipe(
        mergeMap((contato: HttpResponse<IContato>) => {
          if (contato.body) {
            return of(contato.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default contatoResolve;
