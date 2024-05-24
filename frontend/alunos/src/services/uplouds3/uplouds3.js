import { S3 } from 'aws-sdk';

// Configurar as credenciais da AWS e a região
const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID, // Substitua com sua Access Key ID
  secretAccessKey:process.env.REACT_APP_SECRET_ACCESS_KEY, // Substitua com sua Secret Access Key
  region: 'us-east-1', // Substitua pela sua região
};

const s3 = new S3({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});

async function uploadFile(event) {
  const file = event.target.files[0];
  const params = {
    Bucket: config.bucketName,
    Key: file.name,
    Body: file,
    ContentType: file.type,
  };

  console.log(`uploading file (${file.name})...`);

  try {
    const data = await s3.upload(params).promise();
    console.log("...upload finish");
    console.log(data);
    return data;
  } catch (err) {
    console.error("...upload error");
    console.error(err);
    throw err; // rethrow the error so it can be caught by the caller
  }
}

export default uploadFile;
