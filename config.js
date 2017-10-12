let creds = {
  returnURL: 'http://localhost:3000/auth/openid/return',
 	identityMetadata: 'https://login.microsoftonline.com/common/.well-known/openid-configuration', // For using Microsoft you should never need to change this.
 	clientID: 'f8a798d8-2314-425e-80d7-5086efb1ae95',
 	clientSecret: 'blUtFk3LZFZPLMjYpKt0C39U7jrxah4VFnTdQ0zqh1Y=', // if you are doing code or id_token code
 	skipUserProfile: true, // for AzureAD should be set to true.
 	responseType: 'id_token code', // for login only flows use id_token. For accessing resources use `id_token code`
 	responseMode: 'query', // For login only flows we should have token passed back to us in a POST
 	//scope: ['email', 'profile'] // additional scopes you may wish to pass
}

module.exports = creds