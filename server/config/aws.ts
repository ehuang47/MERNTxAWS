import AWS from "aws-sdk";

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

// s3.listObjects({ Bucket: process.env.AWS_BUCKET as string }, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data);
//   }
// });


export const uploadFile = async (file: any, id: string) => {
  // do: figure out if i need to make the bucket public to access the img
  // do: overwrite the existing bucket file with same userID
  const params = {
    Bucket: process.env.AWS_BUCKET as string,
    Key: `userProfile/${id}`,
    Body: file.buffer,
  };
  const data = await s3.upload(params).promise();
  return data.Location;
};
