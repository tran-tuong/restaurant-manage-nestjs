import { Request } from 'express';

export interface ExpressRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}