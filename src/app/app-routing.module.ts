import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";

import {HeaderComponent} from "./components/header/header.component";
import {TestComponent} from "./components/test/test.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home', component: HomeComponent, children: [
      {path: 'test', component: HeaderComponent}
    ]
  },
  {path: 'test', component: TestComponent , pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
