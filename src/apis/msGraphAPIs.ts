import { httpClient } from '../utils/msHttpClient.js';

export async function getProfile(accessToken: string): Promise<any> {
  const url = '/me';

  const response = await httpClient.get<any>(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (response.status === 200) {
    return response.data;
  }
  throw new Error(response.statusText);
}