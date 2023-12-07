import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IContato, NewContato } from '../contato.model';

export type PartialUpdateContato = Partial<IContato> & Pick<IContato, 'id'>;

export type EntityResponseType = HttpResponse<IContato>;
export type EntityArrayResponseType = HttpResponse<IContato[]>;

@Injectable({ providedIn: 'root' })
export class ContatoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/contatoes');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(contato: NewContato): Observable<EntityResponseType> {
    return this.http.post<IContato>(this.resourceUrl, contato, { observe: 'response' });
  }

  update(contato: IContato): Observable<EntityResponseType> {
    return this.http.put<IContato>(`${this.resourceUrl}/${this.getContatoIdentifier(contato)}`, contato, { observe: 'response' });
  }

  partialUpdate(contato: PartialUpdateContato): Observable<EntityResponseType> {
    return this.http.patch<IContato>(`${this.resourceUrl}/${this.getContatoIdentifier(contato)}`, contato, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContato>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContato[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getContatoIdentifier(contato: Pick<IContato, 'id'>): number {
    return contato.id;
  }

  compareContato(o1: Pick<IContato, 'id'> | null, o2: Pick<IContato, 'id'> | null): boolean {
    return o1 && o2 ? this.getContatoIdentifier(o1) === this.getContatoIdentifier(o2) : o1 === o2;
  }

  addContatoToCollectionIfMissing<Type extends Pick<IContato, 'id'>>(
    contatoCollection: Type[],
    ...contatoesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const contatoes: Type[] = contatoesToCheck.filter(isPresent);
    if (contatoes.length > 0) {
      const contatoCollectionIdentifiers = contatoCollection.map(contatoItem => this.getContatoIdentifier(contatoItem)!);
      const contatoesToAdd = contatoes.filter(contatoItem => {
        const contatoIdentifier = this.getContatoIdentifier(contatoItem);
        if (contatoCollectionIdentifiers.includes(contatoIdentifier)) {
          return false;
        }
        contatoCollectionIdentifiers.push(contatoIdentifier);
        return true;
      });
      return [...contatoesToAdd, ...contatoCollection];
    }
    return contatoCollection;
  }
}
