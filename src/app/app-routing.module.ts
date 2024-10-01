import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/login/auth/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module')
                          .then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'electricity/predefinedRates',
    loadChildren: () => import('./modules/electricity-predefined-rates/electricity-predefined-rates.module')
                          .then(m => m.ElectricityPredefinedRatesModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'electricity/comparativeAnalysis',
    loadChildren: () => import('./modules/electricity-comparative-analysis/electricity-comparative-analysis.module')
                          .then(m => m.ElectricityComparativeAnalysisModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
