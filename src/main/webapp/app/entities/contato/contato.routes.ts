import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ContatoComponent } from './list/contato.component';
import { ContatoDetailComponent } from './detail/contato-detail.component';
import { ContatoUpdateComponent } from './update/contato-update.component';
import ContatoResolve from './route/contato-routing-resolve.service';

const contatoRoute: Routes = [
  {
    path: '',
    component: ContatoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContatoDetailComponent,
    resolve: {
      contato: ContatoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContatoUpdateComponent,
    resolve: {
      contato: ContatoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContatoUpdateComponent,
    resolve: {
      contato: ContatoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default contatoRoute;
