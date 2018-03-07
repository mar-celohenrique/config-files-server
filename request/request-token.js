const request = require('request');
 
request({
  url: 'https://p-spring-cloud-services.uaa.run.pivotal.io/oauth/token',
  method: 'POST',
  auth: {
    user: 'p-config-server-d3890de9-55fa-47d5-b0ed-3cb5d07a31eb',
    pass: 'HbKZOxWCtwsC'
  },
  form: {
    'grant_type': 'client_credentials'
  }
}, function(err, res) {
  var json = JSON.parse(res.body);
  console.log("Access Token:", json.access_token);
  encrypt(json.access_token, 'senha');
});

function encrypt(token, word){
  request({
    url: 'https://config-d363aef2-d717-4f9d-af52-92784089c03c.cfapps.io/encrypt/',
    method: 'POST',
    auth: {
      'bearer': token
    },
    body: word
  }, function(err, res) {
    console.log(res.body);
  });
}