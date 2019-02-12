import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component'
import { GraphQLModule } from './graphql.module'
import { SearchComponent } from './search/search.component'
import { UserComponent } from './user/user.component'
import { UsersListComponent } from './users-list/users-list.component'

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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
