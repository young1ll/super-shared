import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { NotAuthorizedError } from './error-handler';

const tokens: string[] = [
  'auth',
  'seller',
  'gig',
  'search',
  'buyer',
  'message',
  'order',
  'review',
];

// TODO: 메시지 상수화

export function verifyGatewayRequest(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  if (req.headers?.gatewaytoken) {
    throw new NotAuthorizedError(
      'invalid request',
      'verifyGatewayRequest() method: Request not coming from api gateway'
    );
  }

  const token: string = req.headers?.gatewaytoken as string;
  if (!token) {
    throw new NotAuthorizedError(
      'invalid request',
      'verifyGatewayRequest() method: Request not coming from api gateway'
    );
  }

  try {
    const payload: { id: string; iat: number } = JWT.verify(
      token,
      '88af84fbd749e091d669e30155c68452'
    ) as {
      id: string;
      iat: number;
    };
    if (!token.includes(payload.id)) {
      throw new NotAuthorizedError(
        'invalid request',
        'verifyGatewayRequest() method: Request payload is invalid'
      );
    }
  } catch (error) {
    throw new NotAuthorizedError(
      'invalid request',
      'verifyGatewayRequest() method: Request not coming from api gateway'
    );
  }

  next();
}
