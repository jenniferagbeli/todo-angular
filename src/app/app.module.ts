import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { TodoState } from './store/states/todo.state';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxsModule.forRoot([TodoState]), // Register the TodoState with NGXS to manage the state of todo items
    NgxsLoggerPluginModule.forRoot(), // Logger plugin to see actions in the console
    NgxsReduxDevtoolsPluginModule.forRoot() // Devtools plugin for easier debugging
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
