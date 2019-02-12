import { NgModule } from '@angular/core'
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular'
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { environment } from '../environments/environment'
const uri = 'https://api.github.com/graphql' // <-- add the URL of the GraphQL server here

// import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
// import introspectionQueryResultData from '../../fragmentTypes.json'

export function createApollo (httpLink: HttpLink) {
  console.log('IN CREATE APOLLO')
  const authLink = setContext((_, { headers }) => {
    console.log('IN AUTH LINK SET CONTEXT')
    // get the authentication token from local storage if it exists
    const token = environment.GH_AUTH_TOKEN
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  // const fragmentMatcher = new IntrospectionFragmentMatcher({
  //   introspectionQueryResultData
  // })

  return {
    link: authLink.concat(httpLink.create({ uri })),
    cache: new InMemoryCache(/*{
      fragmentMatcher
    }*/)
  }
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
