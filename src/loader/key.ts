import * as fs from 'fs';
import { config } from '../config';

export const privateKey = fs.readFileSync(config.privateKeyPath);
export const publicKey = fs.readFileSync(config.publicKeyPath);
