import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        data: { pageTitle: 'storeApp.product.home.title' },
        loadChildren: () => import('./product/product.routes'),
      },
      {
        path: 'region',
        data: { pageTitle: 'storeApp.region.home.title' },
        loadChildren: () => import('./region/region.routes'),
      },
      {
        path: 'product-category',
        data: { pageTitle: 'storeApp.productCategory.home.title' },
        loadChildren: () => import('./product-category/product-category.routes'),
      },
      {
        path: 'country',
        data: { pageTitle: 'storeApp.country.home.title' },
        loadChildren: () => import('./country/country.routes'),
      },
      {
        path: 'customer-details',
        data: { pageTitle: 'storeApp.customerDetails.home.title' },
        loadChildren: () => import('./customer-details/customer-details.routes'),
      },
      {
        path: 'location',
        data: { pageTitle: 'storeApp.location.home.title' },
        loadChildren: () => import('./location/location.routes'),
      },
      {
        path: 'shopping-cart',
        data: { pageTitle: 'storeApp.shoppingCart.home.title' },
        loadChildren: () => import('./shopping-cart/shopping-cart.routes'),
      },
      {
        path: 'department',
        data: { pageTitle: 'storeApp.department.home.title' },
        loadChildren: () => import('./department/department.routes'),
      },
      {
        path: 'product-order',
        data: { pageTitle: 'storeApp.productOrder.home.title' },
        loadChildren: () => import('./product-order/product-order.routes'),
      },
      {
        path: 'task',
        data: { pageTitle: 'storeApp.task.home.title' },
        loadChildren: () => import('./task/task.routes'),
      },
      {
        path: 'employee',
        data: { pageTitle: 'storeApp.employee.home.title' },
        loadChildren: () => import('./employee/employee.routes'),
      },
      {
        path: 'job',
        data: { pageTitle: 'storeApp.job.home.title' },
        loadChildren: () => import('./job/job.routes'),
      },
      {
        path: 'job-history',
        data: { pageTitle: 'storeApp.jobHistory.home.title' },
        loadChildren: () => import('./job-history/job-history.routes'),
      },
      {
        path: 'contato',
        data: { pageTitle: 'storeApp.contato.home.title' },
        loadChildren: () => import('./contato/contato.routes'),
      },
      {
        path: 'produtos',
        data: { pageTitle: 'storeApp.produtos.home.title' },
        loadChildren: () => import('./produtos/produtos.routes'),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
