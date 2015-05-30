module.exports = function(aws, profile, env){
  var credentials;

  if(typeof profile === 'object' && !env){
    env = profile;
    profile = 'default';
  }else{
    profile = profile || 'default';
    env = env || process.env;
  } 

  if(env.AWS_ACCESS_KEY_ID){
    credentials = new aws.EnvironmentCredentials('AWS');
  }else{
    credentials = new aws.SharedIniFileCredentials({profile: profile});
  }

  return credentials;
};
