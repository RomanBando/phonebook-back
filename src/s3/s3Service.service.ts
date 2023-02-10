import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

const randomBytes = promisify(crypto.randomBytes);

@Injectable()
export default class S3Service {
  constructor(private configService: ConfigService) {}

  private s3 = new S3({
    region: this.configService.get('AWS_REGION'),
    accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
    secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    signatureVersion: 'v4',
  });

  async getUploadUrl() {
    const rawBytes = await randomBytes(16);
    const params = {
      Bucket: this.configService.get('AWS_BUCKET'),
      Key: rawBytes.toString('hex'),
      Expires: 30,
    };
    return this.s3.getSignedUrlPromise('putObject', params);
  }
}
