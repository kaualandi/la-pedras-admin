import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payment-types',
  templateUrl: './payment-types.component.html',
  styleUrls: ['./payment-types.component.scss'],
})
export class PaymentTypesComponent {
  constructor(private fb: FormBuilder) {}

  payment = this.fb.group({
    type: [''],
  });

  payment_types = [
    {
      value: 'cash',
      label: 'Dinheiro',
    },
    {
      value: 'credit_card',
      label: 'Cartão de Crédito',
    },
    {
      value: 'debit_card',
      label: 'Cartão de Débito',
    },
    {
      value: 'pix',
      label: 'Pix',
    },
    {
      value: 'partial',
      label: 'Parcelado',
    },
    {
      value: 'cancel',
      label: 'Cancelar',
    },
  ];

  handleSubmitForm() {
    console.log(this.payment.value);
  }
}
