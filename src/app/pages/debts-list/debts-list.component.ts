import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-debts-list',
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    ToastModule],
    providers: [MessageService],

  templateUrl: './debts-list.component.html',
  styleUrl: './debts-list.component.css',
  standalone: true,
})
export class DebtsListComponent {
   

  @Input() saleId!: number;
 
  debtForm!: FormGroup;
 
  // constructor(
  //   private fb: FormBuilder,
  //   private messageService: MessageService
  // ) 
}

