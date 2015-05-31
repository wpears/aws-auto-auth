var test = require('tape');
var aws = require('aws-sdk');
var awsAutoAuth = require('../index');

test('With profile', function(t){
  t.plan(2);
  
  process.env.AWS_ACCESS_KEY_ID = '';
  process.env.AWS_SECRET_ACCESS_KEY = '';

  var cred = awsAutoAuth(aws, 'default');
  t.ok(cred, 'Makes credentials.'); 
  t.ok(cred.accessKeyId, 'Picks up access key.')
});

test('With credentials object', function(t){
  t.plan(2);

  process.env.AWS_ACCESS_KEY_ID = '';
  process.env.AWS_SECRET_ACCESS_KEY = '';

  var cred = awsAutoAuth(aws, {accessKeyId: 'fake', secretAccessKey:'faker'});
  t.ok(cred, 'Makes credentials.');
  t.equal(cred.accessKeyId, 'fake', 'Credentials from object.');
});

test('With env', function(t){
  t.plan(2);

  process.env.AWS_ACCESS_KEY_ID = 'envkey';
  process.env.AWS_SECRET_ACCESS_KEY = 'secret';

  var cred = awsAutoAuth(aws);
  t.ok(cred, 'Makes credentials.'); 
  t.equal(cred.accessKeyId, 'envkey', 'Pulls credentials from environmental variables.')

  process.env.AWS_ACCESS_KEY_ID = '';
  process.env.AWS_SECRET_ACCESS_KEY = '';
});

test('With profile and obj', function(t){
  t.plan(2);

  process.env.AWS_ACCESS_KEY_ID = '';
  process.env.AWS_SECRET_ACCESS_KEY = '';

  var cred = awsAutoAuth(aws, 'default', {accessKeyId: 'fake', secretAccessKey:'faker'});
  t.ok(cred, 'Makes credentials.');
  t.equal(cred.accessKeyId, 'fake', 'Credentials from obj override profile.');
});

test('With profile and env', function(t){
  t.plan(2);

  process.env.AWS_ACCESS_KEY_ID = 'envkey';
  process.env.AWS_SECRET_ACCESS_KEY = 'secret';

  var cred = awsAutoAuth(aws, 'default');
  t.ok(cred, 'Makes credentials.'); 
  t.equal(cred.accessKeyId, 'envkey', 'Pulls credentials from environmental variables over profile.')

  process.env.AWS_ACCESS_KEY_ID = '';
  process.env.AWS_SECRET_ACCESS_KEY = '';
});

test('With profile, env, and obj', function(t){
  t.plan(2);
  process.env.AWS_ACCESS_KEY_ID = 'envkey';
  process.env.AWS_SECRET_ACCESS_KEY = 'secret';

  var cred = awsAutoAuth(aws, 'default', {accessKeyId: 'fake', secretAccessKey:'faker'});
  t.ok(cred, 'Makes credentials.'); 
  t.equal(cred.accessKeyId, 'fake', 'Passed credentials obj overrides env and profile.')

  process.env.AWS_ACCESS_KEY_ID = '';
  process.env.AWS_SECRET_ACCESS_KEY = '';
});

test('Only aws', function(t){
  t.plan(2); 

  process.env.AWS_ACCESS_KEY_ID = '';
  process.env.AWS_SECRET_ACCESS_KEY = '';

  var cred = awsAutoAuth(aws);
  t.ok(cred, 'Makes credentials.');
  t.ok(cred.accessKeyId, 'Credentials from profile.');
});

test('Empty credentials object and env', function(t){
  t.plan(2); 

  process.env.AWS_ACCESS_KEY_ID = 'fake';
  process.env.AWS_SECRET_ACCESS_KEY = 'faker';

  var cred = awsAutoAuth(aws, {});
  t.ok(cred, 'Makes credentials.');
  t.equal(cred.accessKeyId, 'fake', 'Credentials from env, empty credentials obj skipped.');
});
test('No aws', function(t){
  t.plan(1);

  try{
    awsAutoAuth();
  }catch(e){
    t.pass('Bails with no aws object passed.');
  }
});
