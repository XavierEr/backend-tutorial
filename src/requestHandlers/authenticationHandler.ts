import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { getProfile } from '../apis/msGraphAPIs.js';

export default async function authenticationHandler(req: Request, res: Response, next: NextFunction) {
  const accessToken: string | undefined = req.cookies['access_token'];

  if (!accessToken) {
    res.sendStatus(403);
  }

  try {
    const profile = await getProfile(accessToken!);

    console.log(profile);
    next();
  } catch (error) {
    console.log(error)
    res.sendStatus(403);
  }
}