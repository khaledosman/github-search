// implemented due to warning regarding fragments and union types see https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
const fetch = require('node-fetch')
const fs = require('fs')

const uri = 'https://api.github.com/graphql'
const GH_AUTH_TOKEN = 'enter private token here'

fetch(uri, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GH_AUTH_TOKEN}` },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
  })
})
  .then(result => result.json())
  .then(result => {
    console.log(result.data)
    const possibleTypes = {}

    result.data.__schema.types.forEach(supertype => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name] =
          supertype.possibleTypes.map(subtype => subtype.name)
      }
    })

    fs.writeFile('./possibleTypes.json', JSON.stringify(possibleTypes), err => {
      if (err) {
        console.error('Error writing possibleTypes.json', err)
      } else {
        console.log('Fragment types successfully extracted!')
      }
    })
  })
