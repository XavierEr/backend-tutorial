import express from 'express';
import {
  AuthorizationCodeRequest,
  AuthorizationUrlRequest,
  ConfidentialClientApplication,
} from '@azure/msal-node';

import {
  msalConfig,
  // POST_LOGOUT_REDIRECT_URI,
  REDIRECT_URI,
} from '../authConfig.js';

const router = express.Router();

const cca = new ConfidentialClientApplication(msalConfig);

router.get('/', async (req, res, next) => {
  const authCodeUrlParams: AuthorizationUrlRequest = {
    scopes: [],
    redirectUri: REDIRECT_URI!,
  };

  try {
    const authCodeUrlResponse = await cca.getAuthCodeUrl(authCodeUrlParams);

    res.redirect(authCodeUrlResponse);
  } catch (error) {
    // next(error);
    console.log(JSON.stringify(error))
    res.send(error);
  }
});

router.get('/redirect', async (req, res, next) => {
  const tokenRequest: AuthorizationCodeRequest = {
    code: req.query.code as string,
    scopes: [],
    redirectUri: REDIRECT_URI!,
  };

  try {
    const tokenByCodeResponse = await cca.acquireTokenByCode(tokenRequest);

    // console.log(tokenByCodeResponse);
    res.cookie('token', tokenByCodeResponse.idToken, { httpOnly: true, sameSite: 'lax', secure: true, });
    res.cookie('access_token', tokenByCodeResponse.accessToken, { httpOnly: true, sameSite: 'lax', secure: true, });
    // res.sendStatus(200);
    res.json(tokenByCodeResponse);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;