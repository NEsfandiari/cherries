require('dotenv').config({ path: '.env.development' })
const postLambda = require('../src/utilities/postLambda')
const axios = require('axios')
const getAccount = require('../lambda-src/getAccount')
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}
const shopifyConfig = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_KEY,
}

exports.handler = async function(event, context, callback) {
  //make sure request is secure - CORS
  //sends an option method request
  if (event.httpMethod !== 'POST' || !event.body) {
    return callback(null, {
      statusCode: 200,
      headers,
      body: '',
    })
  }
  if (event.body[0] == '{') {
    let data = JSON.parse(event.body)
    let body = JSON.parse(data.body)

    const payload = {
      query: `
        mutation customerCreate($input: CustomerCreateInput!) {
          customerCreate(input: $input) {
            userErrors {
              field
              message
            }
            customer {
              id
            }
            customerUserErrors {
              field
              message
            }
          }
        }`,
      variables: {
        input: {
          email: body.email,
          password: body.password,
          acceptsMarketing: body.newsletter,
          firstName: body.firstName,
          lastName: body.lastName,
        },
      },
    }

    axios({
      url: 'https://cherries2018.myshopify.com/api/graphql',
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payload),
    })
      .then(async function(response) {
        let customer
        if (response.data.errors) {
          return callback(response.data.errors)
        } else {
          customer = response.data.data.customerCreate
        }

        // After signing user up, immediately log then im using getAccount lambda function
        let loginInfo = {
          email: body.email,
          password: body.password,
          remember: true,
        }
        let request = {
          httpMethod: 'POST',
          body: JSON.stringify({
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginInfo),
          }),
        }
        let loggedInUser = await getAccount.handler(request)
        return callback(null, loggedInUser)
      })
      .catch(err => {
        console.log('error, error')
        return callback(err)
      })
  }
}
