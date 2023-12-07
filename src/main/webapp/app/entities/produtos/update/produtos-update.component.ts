import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IProdutos } from '../produtos.model';
import { ProdutosService } from '../service/produtos.service';
import { ProdutosFormService, ProdutosFormGroup } from './produtos-form.service';

@Component({
  standalone: true,
  selector: 'jhi-produtos-update',
  templateUrl: './produtos-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ProdutosUpdateComponent implements OnInit {
  isSaving = false;
  produtos: IProdutos | null = null;

  editForm: ProdutosFormGroup = this.produtosFormService.createProdutosFormGroup();

  constructor(
    protected produtosService: ProdutosService,
    protected produtosFormService: ProdutosFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produtos }) => {
      this.produtos = produtos;
      if (produtos) {
        this.updateForm(produtos);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const produtos = this.produtosFormService.getProdutos(this.editForm);
    if (produtos.id !== null) {
      this.subscribeToSaveResponse(this.produtosService.update(produtos));
    } else {
      this.subscribeToSaveResponse(this.produtosService.create(produtos));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProdutos>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(produtos: IProdutos): void {
    this.produtos = produtos;
    this.produtosFormService.resetForm(this.editForm, produtos);
  }
}
