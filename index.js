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

  if(env.AWS_ACCESS_KEY_ID){
    credentials = new aws.EnvironmentCredentials('AWS');
  }else{
    credentials = new aws.SharedIniFileCredentials({profile: profile});
  }
  
  aws.config.credentials = credentials;

  return credentials;
};
