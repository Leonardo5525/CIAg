import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProdutos } from '../produtos.model';
import { ProdutosService } from '../service/produtos.service';

export const produtosResolve = (route: ActivatedRouteSnapshot): Observable<null | IProdutos> => {
  const id = route.params['id'];
  if (id) {
    return inject(ProdutosService)
      .find(id)
      .pipe(
        mergeMap((produtos: HttpResponse<IProdutos>) => {
          if (produtos.body) {
            return of(produtos.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default produtosResolve;
