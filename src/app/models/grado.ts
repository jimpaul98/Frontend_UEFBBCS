export interface Grado {
  _id: string;
  nombre: string;
  profesor_id: string;  // Relación con el profesor asignado
  materia_ids: string[];  // IDs de las materias asociadas
  estudiantes_ids: string[];  // IDs de los estudiantes asignados
  horario: Horario;  // Subdocumento para almacenar el horario
}

export interface Horario {
  lunes: string;
  martes: string;
  miercoles: string;
  jueves: string;
  viernes: string;
  sabado: string;
  domingo: string;
}

