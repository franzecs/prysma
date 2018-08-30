import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../../../shared/services';

@Component({
  selector: 'app-produtos-create-update',
  templateUrl: './produtos-create-update.component.html',
  styleUrls: ['./produtos-create-update.component.css']
})
export class ProdutosCreateUpdateComponent implements OnInit {

  constructor(private produtosService: ProdutosService) { }

  ngOnInit() {
  }

}
