import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProdutos, NewProdutos } from '../produtos.model';

export type PartialUpdateProdutos = Partial<IProdutos> & Pick<IProdutos, 'id'>;

export type EntityResponseType = HttpResponse<IProdutos>;
export type EntityArrayResponseType = HttpResponse<IProdutos[]>;

@Injectable({ providedIn: 'root' })
export class ProdutosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/produtos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(produtos: NewProdutos): Observable<EntityResponseType> {
    return this.http.post<IProdutos>(this.resourceUrl, produtos, { observe: 'response' });
  }

  update(produtos: IProdutos): Observable<EntityResponseType> {
    return this.http.put<IProdutos>(`${this.resourceUrl}/${this.getProdutosIdentifier(produtos)}`, produtos, { observe: 'response' });
  }

  partialUpdate(produtos: PartialUpdateProdutos): Observable<EntityResponseType> {
    return this.http.patch<IProdutos>(`${this.resourceUrl}/${this.getProdutosIdentifier(produtos)}`, produtos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProdutos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProdutos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProdutosIdentifier(produtos: Pick<IProdutos, 'id'>): number {
    return produtos.id;
  }

  compareProdutos(o1: Pick<IProdutos, 'id'> | null, o2: Pick<IProdutos, 'id'> | null): boolean {
    return o1 && o2 ? this.getProdutosIdentifier(o1) === this.getProdutosIdentifier(o2) : o1 === o2;
  }

  addProdutosToCollectionIfMissing<Type extends Pick<IProdutos, 'id'>>(
    produtosCollection: Type[],
    ...produtosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const produtos: Type[] = produtosToCheck.filter(isPresent);
    if (produtos.length > 0) {
      const produtosCollectionIdentifiers = produtosCollection.map(produtosItem => this.getProdutosIdentifier(produtosItem)!);
      const produtosToAdd = produtos.filter(produtosItem => {
        const produtosIdentifier = this.getProdutosIdentifier(produtosItem);
        if (produtosCollectionIdentifiers.includes(produtosIdentifier)) {
          return false;
        }
        produtosCollectionIdentifiers.push(produtosIdentifier);
        return true;
      });
      return [...produtosToAdd, ...produtosCollection];
    }
    return produtosCollection;
  }
}
