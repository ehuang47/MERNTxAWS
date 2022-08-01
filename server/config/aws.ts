import AWS from "aws-sdk";

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

export const createImgSrc = (contentType: string, buffer: Buffer) => `data:${contentType};base64,${buffer.toString("base64")}`;

export const uploadFile = async (file: any, id: string): Promise<string> => {
  const params = {
    Bucket: process.env.AWS_BUCKET as string,
    Key: `userProfile/${id}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ContentLength: file.size
  };
  const data = await s3.upload(params).promise();
  return data.Location;
};

export const deleteFiles = async (idList: string[]): Promise<any> => {
  const params = {
    Bucket: process.env.AWS_BUCKET as string,
    Delete: { Objects: idList.map(id => ({ Key: `userProfile/${id}` })) }
  };
  return await s3.deleteObjects(params).promise();
};

export const retrieveImg = async (id: string): Promise<string> => {
  const params = {
    Bucket: process.env.AWS_BUCKET as string,
    Key: `userProfile/${id}`
  };
  const data = await s3.getObject(params).promise();
  // return `data:${data.ContentType};base64,${data.Body?.toString("base64")}`;
  return createImgSrc(data.ContentType as string, data.Body as Buffer);
};