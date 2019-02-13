// implemented due to warning regarding fragments and union types see https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
const fetch = require('node-fetch')
const fs = require('fs')

const uri = 'https://api.github.com/graphql'
const GH_AUTH_TOKEN = '5a651da64b419fdf2bf3bc4c55f062fcf5998398'

fetch(uri, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GH_AUTH_TOKEN}` },
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
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null
    )
    result.data.__schema.types = filteredData
    fs.writeFile('./fragmentTypes.json', JSON.stringify(result.data), err => {
      if (err) {
        console.error('Error writing fragmentTypes file', err)
      } else {
        console.log('Fragment types successfully extracted!')
      }
    })
  })
