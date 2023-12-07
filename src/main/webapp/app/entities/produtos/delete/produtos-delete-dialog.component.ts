import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IProdutos } from '../produtos.model';
import { ProdutosService } from '../service/produtos.service';

@Component({
  standalone: true,
  templateUrl: './produtos-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ProdutosDeleteDialogComponent {
  produtos?: IProdutos;

  constructor(
    protected produtosService: ProdutosService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.produtosService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
