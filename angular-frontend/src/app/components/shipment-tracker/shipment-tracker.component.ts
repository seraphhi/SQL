import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogisticsService } from '../../services/logistics.service';
import { EnvioDetalle } from '../../models/logistics.model';

@Component({
  selector: 'app-shipment-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shipment-tracker.component.html',
  styleUrls: ['./shipment-tracker.component.css']
})
export class ShipmentTrackerComponent {
  private logisticsService = inject(LogisticsService);

  searchId = signal<number | null>(null);
  shipment = signal<EnvioDetalle | null>(null);
  loading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  onSearch(): void {
    const id = this.searchId();
    if (!id) return;

    this.loading.set(true);
    this.errorMessage.set(null);

    this.logisticsService.getShipmentTracking(id).subscribe({
      next: (data) => {
        this.shipment.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('No se encontró el envío solicitado o existió un problema de red.');
        this.shipment.set(null);
        this.loading.set(false);
      }
    });
  }
}
