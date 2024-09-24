import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/packages',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Dashboard'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./components/routers/routers.module').then(m => m.RoutersModule)
      }
    ]
  },
  { path: '**', redirectTo: '/packages' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
