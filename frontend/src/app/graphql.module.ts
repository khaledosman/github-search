import { APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { NgModule } from '@angular/core'

import { environment } from '../environments/environment'
const uri = 'https://api.github.com/graphql'

// See https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher

import introspectionQueryResultData from '../../possibleTypes.json'

export function createApollo (httpLink: HttpLink) {
  const authLink = setContext((_, { headers }) => {
    console.log('setting context',  _, headers)
    const token = localStorage.getItem('gh_token')
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
    cache: new InMemoryCache({
      possibleTypes: introspectionQueryResultData
    })
  }
}

@NgModule({
  exports: [],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
