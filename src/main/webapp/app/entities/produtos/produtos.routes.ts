import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ProdutosComponent } from './list/produtos.component';
import { ProdutosDetailComponent } from './detail/produtos-detail.component';
import { ProdutosUpdateComponent } from './update/produtos-update.component';
import ProdutosResolve from './route/produtos-routing-resolve.service';

const produtosRoute: Routes = [
  {
    path: '',
    component: ProdutosComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProdutosDetailComponent,
    resolve: {
      produtos: ProdutosResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProdutosUpdateComponent,
    resolve: {
      produtos: ProdutosResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProdutosUpdateComponent,
    resolve: {
      produtos: ProdutosResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default produtosRoute;
