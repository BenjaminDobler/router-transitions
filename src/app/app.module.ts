import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Route, RouterModule, Routes} from '@angular/router';
import {Page1ComponentComponent} from './components/page1-component/page1-component.component';
import {Page2Component} from './components/page2/page2.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MusicService} from './services/MusicService';
import {FormsModule} from '@angular/forms';


const appRoutes: Routes = [
  {
    path: 'page1', component: Page1ComponentComponent, data: {animation: '1'}
  },
  {path: 'page2', component: Page2Component, data: {animation: '2'}},
  {
    path: '',
    redirectTo: '/page1',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    Page1ComponentComponent,
    Page2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [MusicService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
