import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProdutos } from '../produtos.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../produtos.test-samples';

import { ProdutosService } from './produtos.service';

const requireRestSample: IProdutos = {
  ...sampleWithRequiredData,
};

describe('Produtos Service', () => {
  let service: ProdutosService;
  let httpMock: HttpTestingController;
  let expectedResult: IProdutos | IProdutos[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProdutosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Produtos', () => {
      const produtos = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(produtos).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Produtos', () => {
      const produtos = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(produtos).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Produtos', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Produtos', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Produtos', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addProdutosToCollectionIfMissing', () => {
      it('should add a Produtos to an empty array', () => {
        const produtos: IProdutos = sampleWithRequiredData;
        expectedResult = service.addProdutosToCollectionIfMissing([], produtos);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(produtos);
      });

      it('should not add a Produtos to an array that contains it', () => {
        const produtos: IProdutos = sampleWithRequiredData;
        const produtosCollection: IProdutos[] = [
          {
            ...produtos,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProdutosToCollectionIfMissing(produtosCollection, produtos);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Produtos to an array that doesn't contain it", () => {
        const produtos: IProdutos = sampleWithRequiredData;
        const produtosCollection: IProdutos[] = [sampleWithPartialData];
        expectedResult = service.addProdutosToCollectionIfMissing(produtosCollection, produtos);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(produtos);
      });

      it('should add only unique Produtos to an array', () => {
        const produtosArray: IProdutos[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const produtosCollection: IProdutos[] = [sampleWithRequiredData];
        expectedResult = service.addProdutosToCollectionIfMissing(produtosCollection, ...produtosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const produtos: IProdutos = sampleWithRequiredData;
        const produtos2: IProdutos = sampleWithPartialData;
        expectedResult = service.addProdutosToCollectionIfMissing([], produtos, produtos2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(produtos);
        expect(expectedResult).toContain(produtos2);
      });

      it('should accept null and undefined values', () => {
        const produtos: IProdutos = sampleWithRequiredData;
        expectedResult = service.addProdutosToCollectionIfMissing([], null, produtos, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(produtos);
      });

      it('should return initial array if no Produtos is added', () => {
        const produtosCollection: IProdutos[] = [sampleWithRequiredData];
        expectedResult = service.addProdutosToCollectionIfMissing(produtosCollection, undefined, null);
        expect(expectedResult).toEqual(produtosCollection);
      });
    });

    describe('compareProdutos', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProdutos(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareProdutos(entity1, entity2);
        const compareResult2 = service.compareProdutos(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareProdutos(entity1, entity2);
        const compareResult2 = service.compareProdutos(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareProdutos(entity1, entity2);
        const compareResult2 = service.compareProdutos(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
