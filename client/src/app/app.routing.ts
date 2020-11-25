import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./_pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./_pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'articles',
    loadChildren: () =>
      import('./_pages/articles/articles.module').then((m) => m.ArticlesModule),
  },
  {
    path: 'article/:id',
    loadChildren: () =>
      import('./_pages/article_detail/article_detail.module').then(
        (m) => m.ArticleDetailModule
      ),
  },
  {
    path: 'covId',
    loadChildren: () =>
      import('./_pages/stats/stats.module').then((m) => m.StatsModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    // useHash: true,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
}),
  ],
  exports: [RouterModule],
})
export class AppRouting {}
