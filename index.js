module.exports = function(aws, profile, obj){
  var credentials;
  
  if(!aws || !aws.EC2 || !aws.S3){
    throw new Error('Must pass an instance of the aws sdk as the first argument.'); 
  }
  if(typeof profile === 'object' && !obj){
    obj = profile;
    profile = 'default';
  }

  profile = profile || 'default';

  if(obj){
    credentials = new aws.Credentials(obj); 
  }else if(process.env.AWS_ACCESS_KEY_ID){
    credentials = new aws.EnvironmentCredentials('AWS');
  }else{
    credentials = new aws.SharedIniFileCredentials({profile: profile});
  }
  
  aws.config.credentials = credentials;

  return credentials;
};
