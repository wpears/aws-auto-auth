var test = require('tape');
var aws = require('aws-sdk');
var awsAutoAuth = require('../index');

test('With profile', function(t){
  t.plan(2);
  var cred = awsAutoAuth(aws, 'default');
  t.ok(cred, 'Makes credentials.'); 
  t.ok(cred.accessKeyId, 'Picks up access key.')
});

test('With env', function(t){
  t.plan(2);
  var cred = awsAutoAuth(aws, {AWS_ACCESS_KEY_ID:'fake', AWS_SECRET_ACCESS_KEY:'faker'});
  t.ok(cred, 'Makes credentials.');
  console.log(cred);
  t.equal(cred.accessKeyId, 'fake');
});

test('With profile and env', function(t){

});

test('Only aws', function(t){

});

test('With profile', function(t){

});
