import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, Role } from './_core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Root] },
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./pages/contact/contact.module').then((m) => m.ContactModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Root] },
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'patients-add',
    loadChildren: () =>
      import('./pages/patients/patients_add/patients_add.module').then(
        (m) => m.PatientsAddModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'patients-edit/:id',
    loadChildren: () =>
      import('./pages/patients/patients_add/patients_add.module').then(
        (m) => m.PatientsAddModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'patients-detail/:id',
    loadChildren: () =>
      import('./pages/patients/patients_detail/patients_detail.module').then(
        (m) => m.PatientsDetailModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'patients-list',
    loadChildren: () =>
      import('./pages/patients/patients_list/patients_list.module').then(
        (m) => m.PatientsListModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'articles-add',
    loadChildren: () =>
      import('./pages/articles/articles_add/articles_add.module').then(
        (m) => m.ArticlesAddModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'articles-edit/:id',
    loadChildren: () =>
      import('./pages/articles/articles_add/articles_add.module').then(
        (m) => m.ArticlesAddModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'articles-detail/:id',
    loadChildren: () =>
      import('./pages/articles/articles_detail/articles_detail.module').then(
        (m) => m.ArticlesDetailModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'articles-list',
    loadChildren: () =>
      import('./pages/articles/articles_list/articles_list.module').then(
        (m) => m.ArticlesListModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'slides-add',
    loadChildren: () =>
      import('./pages/slides/slides_add/slides_add.module').then(
        (m) => m.SlidesAddModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'slides-edit/:id',
    loadChildren: () =>
      import('./pages/slides/slides_add/slides_add.module').then(
        (m) => m.SlidesAddModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'slides-list',
    loadChildren: () =>
      import('./pages/slides/slides_list/slides_list.module').then(
        (m) => m.SlidesListModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'users-add',
    loadChildren: () =>
      import('./pages/users/users_add/users_add.module').then(
        (m) => m.UsersAddModule
      ),
    canActivate: [AuthGuard],
    data: { roles: [Role.Root] },
  },
  {
    path: 'users-edit/:id',
    loadChildren: () =>
      import('./pages/users/users_add/users_add.module').then(
        (m) => m.UsersAddModule
      ),
    canActivate: [AuthGuard],
    data: { roles: [Role.Root] },
  },
  {
    path: 'users-detail/:id',
    loadChildren: () =>
      import('./pages/users/users_detail/users_detail.module').then(
        (m) => m.UsersDetailModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'users-list',
    loadChildren: () =>
      import('./pages/users/users_list/users_list.module').then(
        (m) => m.UsersListModule
      ),
    canActivate: [AuthGuard],
    data: { roles: [Role.Root] },
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./pages/messages/messages.module').then((m) => m.MessagesModule),
    canActivate: [AuthGuard],
    // data: { roles: [Role.Root] },
  },
  {
    path: 'residences-list',
    loadChildren: () =>
      import('./pages/residences/residences_list/residences_list.module').then(
        (m) => m.ResidencesListModule
      ),
    canActivate: [AuthGuard],
    // data: { roles: [Role.Root] },
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./pages/_error/error.component').then((m) => m.ErrorModule),
  },
  {
    path: '404',
    loadChildren: () =>
      import('./pages/404/not_found.module').then((m) => m.NotFoundModule),
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRouting {}
