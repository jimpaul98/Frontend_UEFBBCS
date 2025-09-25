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
          import('./auth/forgot-password/forgot-password').then(
            (m) => m.ForgotPassword
          ),
      },
      // Soporta ?token=... y :token
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./auth/reset-password/reset-password').then(
            (m) => m.ResetPassword
          ),
      },
      {
        path: 'reset-password/:token',
        loadComponent: () =>
          import('./auth/reset-password/reset-password').then(
            (m) => m.ResetPassword
          ),
      },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
    ],
  },

  // PRIVADAS (con layout) — protegidas
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./componentes/layout/layout').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./componentes/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./usuario/listar-usuarios/listar-usuarios').then(
            (m) => m.ListarUsuarios
          ),
      },
      {
        path: 'usuarios/crear',
        loadComponent: () =>
          import('./usuario/crear-usuario/crear-usuario').then(
            (m) => m.CrearUsuarioComponent
          ),
      },
      {
        path: 'usuarios/editar/:id',
        loadComponent: () =>
          import('./usuario/editar-usuario/editar-usuario').then(
            (m) => m.EditarUsuario
          ),
      },

      // rutas para anioslectivos
      {
        path: 'anios',
        loadComponent: () =>
          import('./anio-lectivo/anio-lectivo-listar/anio-lectivo-listar').then(
            (m) => m.AnioLectivoListarComponent
          ),
      },
      {
        path: 'anios/crear',
        loadComponent: () =>
          import('./anio-lectivo/anio-lectivo-crear/anio-lectivo-crear').then(
            (m) => m.AnioLectivoCrearComponent
          ),
      },

      {
        path: 'anios/editar/:id',
        loadComponent: () =>
          import('./anio-lectivo/anio-lectivo-editar/anio-lectivo-editar').then(
            (m) => m.AnioLectivoEditarComponent
          ),
      },

      // rutas para materias
      {
        path: 'materia',
        loadComponent: () =>
          import('./materia/materia-listar/materia-listar').then(
            (m) => m.MateriaListarComponent
          ),
      },
      {
        path: 'materia/crear',
        loadComponent: () =>
          import('./materia/materia-crear/materia-crear').then(
            (m) => m.MateriaCrear
          ),
      },

      {
        path: 'materia/editar/:id',
        loadComponent: () =>
          import('./materia/materia-editar/materia-editar').then(
            (m) => m.MateriaEditar
          ),
      },





    ],
  },

  // REDIRECCIONES
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: '**', redirectTo: 'auth/login' },
];
