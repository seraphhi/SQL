import React, { useState } from 'react';
import { getShipmentTracking } from '../services/logisticsService';
import { EnvioDetalle } from '../types/logistics';
import './ShipmentTracker.css';

export const ShipmentTracker: React.FC = () => {
  const [searchId, setSearchId] = useState<string>('');
  const [shipment, setShipment] = useState<EnvioDetalle | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getShipmentTracking(Number(searchId));
      setShipment(data);
    } catch (err) {
      setError('No se encontró el envío solicitado o existió un problema de red.');
      setShipment(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tracker-container">
      <h2>Rastreo de Carga Internacional (React)</h2>

      <div className="search-box">
        <input
          type="number"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Ingrese ID del envío (ej. 1001)"
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar Envío'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {shipment && (
        <div className="shipment-card">
          <div className="header">
            <h3>Envío #{shipment.id_envio}</h3>
            <span className={`badge ${shipment.estado_actual.toLowerCase().replace(/\s+/g, '-')}`}>
              {shipment.estado_actual}
            </span>
          </div>

          <div className="details-grid">
            <div><strong>Remitente:</strong> {shipment.remitente.nombre_empresa}</div>
            <div><strong>Destinatario:</strong> {shipment.destinatario.nombre_empresa}</div>
            <div><strong>Origen:</strong> {shipment.origen.ciudad}, {shipment.origen.pais}</div>
            <div><strong>Destino:</strong> {shipment.destino.ciudad}, {shipment.destino.pais}</div>
            <div><strong>Peso Carga:</strong> {shipment.peso_kg} kg</div>
            <div>
              <strong>Entrega Estimada:</strong>{' '}
              {new Date(shipment.fecha_estimada_entrega).toLocaleDateString()}
            </div>
          </div>

          <h4>Etapas de Transporte (Tramos)</h4>
          <div className="tramos-list">
            {shipment.tramos.map((tramo) => (
              <div key={tramo.id_tramo} className="tramo-item">
                <span className="icon">
                  {tramo.vehiculo.tipo_transporte === 'Marítimo'
                    ? '🚢'
                    : tramo.vehiculo.tipo_transporte === 'Aéreo'
                    ? '✈️'
                    : '🚛'}
                </span>
                <div className="tramo-info">
                  <strong>
                    {tramo.origen.ciudad} → {tramo.destino.ciudad}
                  </strong>
                  <small> Matrícula: {tramo.vehiculo.matricula}</small>
                </div>
              </div>
            ))}
          </div>

          <h4>Línea de Tiempo de Auditoría</h4>
          <ul className="timeline">
            {shipment.historial_seguimiento.map((event) => (
              <li key={event.id_seguimiento}>
                <div className="time">{new Date(event.fecha_evento).toLocaleString()}</div>
                <div className="location">
                  <strong>{event.ubicacion_actual}</strong>
                </div>
                <div className="desc">{event.descripcion_evento}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
