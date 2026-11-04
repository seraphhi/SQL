export interface Ubicacion {
  id_ubicacion: number;
  pais: string;
  ciudad: string;
  codigo_postal?: string;
  puerto_aeropuerto?: string;
}

export interface Cliente {
  id_cliente: number;
  nombre_empresa: string;
  tipo_documento: string;
  numero_documento: string;
  email: string;
  telefono?: string;
}

export interface Vehiculo {
  id_vehiculo: number;
  tipo_transporte: 'Marítimo' | 'Aéreo' | 'Terrestre';
  matricula: string;
  capacidad_carga_kg: number;
  estado: string;
}

export interface TramoRuta {
  id_tramo: number;
  id_envio: number;
  vehiculo: Vehiculo;
  origen: Ubicacion;
  destino: Ubicacion;
  fecha_salida?: string;
  fecha_llegada?: string;
}

export interface Seguimiento {
  id_seguimiento: number;
  id_envio: number;
  ubicacion_actual: string;
  descripcion_evento: string;
  fecha_evento: string;
}

export interface EnvioDetalle {
  id_envio: number;
  remitente: Cliente;
  destinatario: Cliente;
  origen: Ubicacion;
  destino: Ubicacion;
  fecha_creacion: string;
  fecha_estimada_entrega: string;
  peso_kg: number;
  volumen_m3: number;
  estado_actual: string;
  tramos: TramoRuta[];
  historial_seguimiento: Seguimiento[];
}
