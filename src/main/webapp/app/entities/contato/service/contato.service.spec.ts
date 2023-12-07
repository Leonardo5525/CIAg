import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IContato } from '../contato.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../contato.test-samples';

import { ContatoService } from './contato.service';

const requireRestSample: IContato = {
  ...sampleWithRequiredData,
};

describe('Contato Service', () => {
  let service: ContatoService;
  let httpMock: HttpTestingController;
  let expectedResult: IContato | IContato[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ContatoService);
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

    it('should create a Contato', () => {
      const contato = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(contato).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Contato', () => {
      const contato = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(contato).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Contato', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Contato', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Contato', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addContatoToCollectionIfMissing', () => {
      it('should add a Contato to an empty array', () => {
        const contato: IContato = sampleWithRequiredData;
        expectedResult = service.addContatoToCollectionIfMissing([], contato);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contato);
      });

      it('should not add a Contato to an array that contains it', () => {
        const contato: IContato = sampleWithRequiredData;
        const contatoCollection: IContato[] = [
          {
            ...contato,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addContatoToCollectionIfMissing(contatoCollection, contato);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Contato to an array that doesn't contain it", () => {
        const contato: IContato = sampleWithRequiredData;
        const contatoCollection: IContato[] = [sampleWithPartialData];
        expectedResult = service.addContatoToCollectionIfMissing(contatoCollection, contato);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contato);
      });

      it('should add only unique Contato to an array', () => {
        const contatoArray: IContato[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const contatoCollection: IContato[] = [sampleWithRequiredData];
        expectedResult = service.addContatoToCollectionIfMissing(contatoCollection, ...contatoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const contato: IContato = sampleWithRequiredData;
        const contato2: IContato = sampleWithPartialData;
        expectedResult = service.addContatoToCollectionIfMissing([], contato, contato2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contato);
        expect(expectedResult).toContain(contato2);
      });

      it('should accept null and undefined values', () => {
        const contato: IContato = sampleWithRequiredData;
        expectedResult = service.addContatoToCollectionIfMissing([], null, contato, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contato);
      });

      it('should return initial array if no Contato is added', () => {
        const contatoCollection: IContato[] = [sampleWithRequiredData];
        expectedResult = service.addContatoToCollectionIfMissing(contatoCollection, undefined, null);
        expect(expectedResult).toEqual(contatoCollection);
      });
    });

    describe('compareContato', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareContato(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareContato(entity1, entity2);
        const compareResult2 = service.compareContato(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareContato(entity1, entity2);
        const compareResult2 = service.compareContato(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareContato(entity1, entity2);
        const compareResult2 = service.compareContato(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
