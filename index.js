module.exports = function(aws, profile, env){
  var credentials;
  
  if(!aws || !aws.EC2 || !aws.S3){
    throw new Error('Must pass an instance of the aws sdk as the first argument.'); 
  }
  if(typeof profile === 'object' && !env){
    env = profile;
    profile = 'default';
  }else{
    profile = profile || 'default';
    env = env || process.env;
  } 
  process.env.AWS_ACCESS_KEY_ID = env.AWS_ACCESS_KEY_ID; 
  process.env.AWS_SECRET_ACCESS_KEY = env.AWS_SECRET_ACCESS_KEY;
  process.env.AWS_SESSION_TOKEN = env.AWS_SESSION_TOKEN;

  if(env.AWS_ACCESS_KEY_ID){
    credentials = new aws.EnvironmentCredentials('AWS');
  }else{
    credentials = new aws.SharedIniFileCredentials({profile: profile});
  }
  
  aws.config.credentials = credentials;

  return credentials;
};
