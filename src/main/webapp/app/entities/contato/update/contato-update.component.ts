import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IContato } from '../contato.model';
import { ContatoService } from '../service/contato.service';
import { ContatoFormService, ContatoFormGroup } from './contato-form.service';

@Component({
  standalone: true,
  selector: 'jhi-contato-update',
  templateUrl: './contato-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ContatoUpdateComponent implements OnInit {
  isSaving = false;
  contato: IContato | null = null;

  editForm: ContatoFormGroup = this.contatoFormService.createContatoFormGroup();

  constructor(
    protected contatoService: ContatoService,
    protected contatoFormService: ContatoFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contato }) => {
      this.contato = contato;
      if (contato) {
        this.updateForm(contato);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contato = this.contatoFormService.getContato(this.editForm);
    if (contato.id !== null) {
      this.subscribeToSaveResponse(this.contatoService.update(contato));
    } else {
      this.subscribeToSaveResponse(this.contatoService.create(contato));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContato>>): void {
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

  protected updateForm(contato: IContato): void {
    this.contato = contato;
    this.contatoFormService.resetForm(this.editForm, contato);
  }
}
