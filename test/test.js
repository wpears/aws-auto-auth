var test = require('tape');
var aws = require('aws-sdk');
var awsAutoAuth = require('../index');

test('With profile', function(t){
  t.plan(2);
  var cred = awsAutoAuth(aws, 'default');
  t.ok(cred, 'Makes credentials.'); 
  t.ok(cred.accessKeyId, 'Picks up access key.')
});

test('With obj', function(t){
  t.plan(2);
  var cred = awsAutoAuth(aws, {accessKeyId: 'fake', secretAccessKey:'faker'});
  console.log(cred);
  t.ok(cred, 'Makes credentials.');
  t.equal(cred.accessKeyId, 'fake', 'Credentials from obj.');
});

test('With profile and obj', function(t){
  t.plan(2);
  var cred = awsAutoAuth(aws, 'default', {accessKeyId: 'fake', secretAccessKey:'faker'});
  t.ok(cred, 'Makes credentials.');
  t.equal(cred.accessKeyId, 'fake', 'Credentials from obj override profile.');
});

test('Only aws', function(t){
 t.plan(3); 
  var cred = awsAutoAuth(aws);
  console.log(cred);
  t.ok(cred, 'Makes credentials.');
  t.ok(cred.accessKeyId, 'Credentials from profile.');
  t.notEqual(cred.accessKeyId, 'fake', 'Credentials not from env.');
});
