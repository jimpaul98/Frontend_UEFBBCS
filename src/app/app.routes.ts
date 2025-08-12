import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  // PÚBLICAS bajo /auth
  {
    path: 'auth',
    children: [
      { path: 'login', component: Login },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./auth/forgot-password/forgot-password')
            .then(m => m.ForgotPassword),
      },
      // Soporta ?token=... y :token
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./auth/reset-password/reset-password')
            .then(m => m.ResetPassword),
      },
      {
        path: 'reset-password/:token',
        loadComponent: () =>
          import('./auth/reset-password/reset-password')
            .then(m => m.ResetPassword),
      },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
    ]
  },

  // PRIVADAS (con layout) — protegidas
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./componentes/layout/layout').then(m => m.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./componentes/dashboard/dashboard').then(m => m.Dashboard),
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./usuario/listar-usuarios/listar-usuarios').then(m => m.ListarUsuarios),
      },
      {
        path: 'usuarios/crear',
        loadComponent: () =>
          import('./usuario/crear-usuario/crear-usuario').then(m => m.CrearUsuarioComponent),
      },
      {
        path: 'usuarios/editar/:id',
        loadComponent: () =>
          import('./usuario/editar-usuario/editar-usuario').then(m => m.EditarUsuario),
      },

      // Rutas para Estudiantes
      {
        path: 'estudiantes',
        loadComponent: () =>
          import('./estudiante/listar-estudiante/listar-estudiante').then(m => m.ListarEstudiantes),
      },
      {
        path: 'estudiantes/crear',
        loadComponent: () =>
          import('./estudiante/crear-estudiante/crear-estudiante').then(m => m.CrearEstudianteComponent),
      },
      {
        path: 'estudiantes/editar/:id',
        loadComponent: () =>
          import('./estudiante/editar-estudiante/editar-estudiante').then(m => m.EditarEstudiante),
      },

      // Rutas para Profesores
      {
        path: 'profesores',
        loadComponent: () =>
          import('./profesor/listar-profesores/listar-profesores').then(m => m.ListarProfesoresComponent),
      },
      {
        path: 'profesores/crear',
        loadComponent: () =>
          import('./profesor/crear-profesor/crear-profesor').then(m => m.CrearProfesorComponent),
      },
      {
        path: 'profesores/editar/:id',
        loadComponent: () =>
          import('./profesor/editar-profesor/editar-profesor').then(m => m.EditarProfesor),
      },

      // Rutas para Clases
      {
        path: 'clases',
        loadComponent: () =>
          import('./clase/listar-clases/listar-clases').then(m => m.ListarClases),
      },
      {
        path: 'clases/crear',
        loadComponent: () =>
          import('./clase/crear-clase/crear-clase').then(m => m.CrearClaseComponent),
      },
      {
        path: 'clases/editar/:id',
        loadComponent: () =>
          import('./clase/editar-clase/editar-clase').then(m => m.EditarClase),
      },

      // Rutas para Asistencia
      {
        path: 'asistencia',
        loadComponent: () =>
          import('./asistencia/listar-asistencias/listar-asistencias').then(m => m.ListarAsistenciasComponent),
      },
      {
        path: 'asistencia/crear',
        loadComponent: () =>
          import('./asistencia/crear-asistencia/crear-asistencia').then(m => m.CrearAsistenciaComponent),
      },
      {
        path: 'asistencia/editar/:id',
        loadComponent: () =>
          import('./asistencia/editar-asistencia/editar-asistencia').then(m => m.EditarAsistencia),
      },

      // Rutas para Padres
      {
        path: 'padres',
        loadComponent: () =>
          import('./padre/listar-padres/listar-padres').then(m => m.ListarPadres),
      },
      {
        path: 'padres/crear',
        loadComponent: () =>
          import('./padre/crear-padre/crear-padre').then(m => m.CrearPadreComponent),
      },
      {
        path: 'padres/editar/:id',
        loadComponent: () =>
          import('./padre/editar-padre/editar-padre').then(m => m.EditarPadre),
      },
    ],
  },

  // REDIRECCIONES
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: '**', redirectTo: 'auth/login' },
];
