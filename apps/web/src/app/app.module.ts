import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MonacoEditorModule} from 'ngx-monaco-editor-v2';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MonacoEditorModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
