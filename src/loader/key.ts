import { config } from '../config';

export const privateKey = Buffer.from(config.privateKeyBase64Str, 'base64');
export const publicKey = Buffer.from(config.publicKeyBase64Str, 'base64');
