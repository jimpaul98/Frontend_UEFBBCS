export interface Estudiante {
  _id: string;
  nombres: string;
  apellidos: string;
  cedula?: string;
  fecha_nacimiento?: string; // formato ISO (ej. "2005-06-15")
  direccion?: string;
  telefono?: string;         // desde contacto.telefono
  email?: string;            // no está en backend, pero puede venir del padre o guardianes
  activo?: boolean;
  padre?: {
    _id: string;
    nombre: string;
    telefono?: string;
    email?: string;
  };
  guardianes?: {
    nombre: string;
    parentesco: 'padre' | 'madre' | 'tutor' | 'otro';
    telefono?: string;
    email?: string;
  }[];
}