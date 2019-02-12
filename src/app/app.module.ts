import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component'
import { GraphQLModule } from './graphql.module'
import { SearchComponent } from './search/search.component'
import { UserComponent } from './user/user.component'
import { UsersListComponent } from './users-list/users-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    UsersListComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
