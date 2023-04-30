import { TTimeout } from './../../../models/utils';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.scss'],
})
export class TableSearchComponent implements OnInit {
  @Output() search = new EventEmitter<string>();

  inputName = new FormControl('');

  timeout: TTimeout;

  ngOnInit() {
    this.inputName.valueChanges.subscribe((value) => {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.search.emit(value || '');
        this.timeout = undefined;
      }, 1000);
    });
  }

  sent() {
    this.search.emit(this.inputName.value || '');
  }
}
