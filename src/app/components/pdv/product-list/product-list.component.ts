import { Component, Input } from '@angular/core';
import { IItemOrder } from 'src/app/models/pdv';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  @Input() items: IItemOrder[] = [];

  columns = [
    'count',
    'code',
    'name',
    'unit',
    'quantity',
    'unit_value',
    'total_value',
  ];

  limitCaracter(code: string, limit: number) {
    return code.length > limit ? code.slice(0, limit) + '...' : code;
  }
}
