import { EnvioDetalle } from '../types/logistics';

// Asume que las llamadas al backend se manejan bajo el path /api/v1/logistics
const API_URL = '/api/v1/logistics';

export const getShipmentTracking = async (idEnvio: number): Promise<EnvioDetalle> => {
  const response = await fetch(`${API_URL}/envios/${idEnvio}/tracking`);
  if (!response.ok) {
    throw new Error('Error al obtener la información del envío');
  }
  return response.json();
};
