import 'dotenv/config';

import {
  Configuration,
  LogLevel,
} from '@azure/msal-node';

import MsalCachePlugin from './msalCachePlugin.js';

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.CLIENT_ID!, // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
    authority: `${process.env.CLOUD_INSTANCE}${process.env.TENANT_ID}`, // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
    clientSecret: process.env.CLIENT_SECRET // Client secret generated from the app registration in Azure portal
  },
  cache: {
    cachePlugin: new MsalCachePlugin(),
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: LogLevel.Verbose,
    }
  }
};

export const REDIRECT_URI = process.env.REDIRECT_URI;

export const POST_LOGOUT_REDIRECT_URI = process.env.POST_LOGOUT_REDIRECT_URI;