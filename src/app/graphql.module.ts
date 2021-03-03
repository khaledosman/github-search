import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular'
import { HttpLink, HttpLinkModule } from 'apollo-angular/http'
import { InMemoryCache, IntrospectionFragmentMatcher } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { NgModule } from '@angular/core'

import { environment } from '../environments/environment'
const uri = 'https://api.github.com/graphql'

// See https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher

import introspectionQueryResultData from '../../fragmentTypes.json'

export function createApollo (httpLink: HttpLink) {
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('gh_token') || environment.GH_AUTH_TOKEN
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  })

  return {
    link: authLink.concat(httpLink.create({ uri })),
    cache: new InMemoryCache({
      fragmentMatcher
    })
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
