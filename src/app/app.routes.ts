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

       // rutas para materias
      {
        path: 'profesor',
        loadComponent: () =>
          import('./profesor/profesor-listar/profesor-listar').then(
            (m) => m.ProfesorListarComponent
          ),
      },
      {
        path: 'profesor/crear',
        loadComponent: () =>
          import('./profesor/profesor-crear/profesor-crear').then(
            (m) => m.ProfesorCrearComponent
          ),
      },

      {
        path: 'profesor/editar/:id',
        loadComponent: () =>
          import('./profesor/profesor-editar/profesor-editar').then(
            (m) => m.ProfesorEditarComponent
          ),
      },

       // rutas para estudiantes
      {
        path: 'estudiante',
        loadComponent: () =>
          import('./estudiante/estudiante-listar/estudiante-listar').then(
            (m) => m.EstudianteListarComponent
          ),
      },
      {
        path: 'estudiante/crear',
        loadComponent: () =>
          import('./estudiante/estudiante-crear/estudiante-crear').then(
            (m) => m.EstudianteCrearComponent
          ),
      },

      {
        path: 'estudiante/editar/:id',
        loadComponent: () =>
          import('./estudiante/estudiante-editar/estudiante-editar').then(
            (m) => m.EstudianteEditarComponent
          ),
      },

        // rutas para cursos
      {
        path: 'curso',
        loadComponent: () =>
          import('./curso/curso-listar/curso-listar').then(
            (m) => m.CursoListarComponent
          ),
      },
      {
        path: 'curso/crear',
        loadComponent: () =>
          import('./curso/curso-crear/curso-crear').then(
            (m) => m.CursoCrearComponent
          ),
      },

      {
        path: 'curso/editar/:id',
        loadComponent: () =>
          import('./curso/curso-editar/curso-editar').then(
            (m) => m.CursoEditarComponent
          ),
      },
  

      // rutas para matriculas
      {
        path: 'matricula/crear',        
        loadComponent: () =>
          import('./matriculas/matricula-crear/matricula-crear').then(
            (m) => m.MatriculaCrearComponent
          ),
      },

      {
        path: 'matricula',        
        loadComponent: () =>
          import('./matriculas/matricula-listar/matricula-listar').then(
            (m) => m.MatriculaListar
          ),
      },

     
     

    ],
  },

  // REDIRECCIONES
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: '**', redirectTo: 'auth/login' },
];
