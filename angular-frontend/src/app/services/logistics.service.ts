import { Injectable, inject } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvioDetalle, Seguimiento } from '../models/logistics.model';

@Injectable({
  providedIn: 'root'
})
export class LogisticsService {
  private http = inject(HttpClient);
  private apiUrl = `/api/v1/logistics`;

  getShipmentTracking(idEnvio: number): Observable<EnvioDetalle> {
    return this.http.get<EnvioDetalle>(`${this.apiUrl}/envios/${idEnvio}/tracking`);
  }

  addTrackingEvent(idEnvio: number, evento: Partial<Seguimiento>): Observable<Seguimiento> {
    return this.http.post<Seguimiento>(`${this.apiUrl}/envios/${idEnvio}/seguimiento`, evento);
  }
}
