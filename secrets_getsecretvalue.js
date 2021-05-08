// Load the AWS SDK
var AWS = require('aws-sdk'),
    //region = "singapore",
     region="ap-southeast-1",
    //secretName = ‘${environment}/my-secrets’,
   // secretName = `${environment}/my-secrets`,
   // secretName = "nodejs-docker-secrets",
    
   secretName = `${process.env.environment}/my-secrets`,
    secret,
    decodedBinarySecret;
    var client = new AWS.SecretsManager({
        region: region
    });
// snippet-end:[secretsmanager.JavaScript.secrets.GetSecretValue]
function loadSecrets() {
  return new Promise((res,rej)=>{
    client.getSecretValue({SecretId: secretName}, function(err, data) {
        console.error(err,data)
        if (err) {
            if (err.code === 'DecryptionFailureException')
                // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InternalServiceErrorException')
                // An error occurred on the server side.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InvalidParameterException')
                // You provided an invalid value for a parameter.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InvalidRequestException')
                // You provided a parameter value that is not valid for the current state of the resource.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'ResourceNotFoundException')
                // We can't find the resource that you asked for.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            return rej(err)
        }
        else {
            // Decrypts secret using the associated KMS CMK.
            // Depending on whether the secret is a string or binary, one of these fields will be populated.
            if ('SecretString' in data) {
                secret = data.SecretString;
               Object.assign(process.env, JSON.parse(secret))
                console.log("Secrets from aws secret manager",secretName);
            } else {
                let buff = new Buffer(data.SecretBinary, 'base64');
                decodedBinarySecret = buff.toString('ascii');
            }
            res();
        }
        // Your code goes here. 
    });
  })
}
module.exports = {loadSecrets}
