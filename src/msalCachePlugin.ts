import {
  ICachePlugin, 
  TokenCacheContext,
} from '@azure/msal-node';

export default class MsalCachePlugin implements ICachePlugin {
  async beforeCacheAccess(tokenCacheContext: TokenCacheContext): Promise<void> {
    // todo: Redis Cache
    // console.log('before', tokenCacheContext.tokenCache);
    // console.log('before', tokenCacheContext.tokenCache.serialize());    
  };

  async afterCacheAccess(tokenCacheContext: TokenCacheContext): Promise<void> {
    // todo: Redis Cache
    // console.log('after', tokenCacheContext.tokenCache);
    console.log('after', tokenCacheContext.tokenCache.serialize());
  };
};