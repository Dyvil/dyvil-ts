import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'editor', loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule)},
  {path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path: '', pathMatch: 'full', redirectTo: 'editor'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
