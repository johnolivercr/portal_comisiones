import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleAppearance, MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './component/home/home.component';
import { MovementComponent } from './component/movement/movement.component';
import { SaleComponent } from './component/sale/sale.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonToggleModule, HomeComponent, SaleComponent, MovementComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  appearance = signal<MatButtonToggleAppearance>('standard');
  hideSingleSelectionIndicator = signal(true);
  selectedToggle: string = 'Inicio'; // Valor por defecto

}
