import { JSON_CONTENT_TYPE } from './../constants';
import { getAccessToken, getToken } from './access_credentials';

export function GetHeaders() {
  const config = {
    headers: {
      'content-Type': JSON_CONTENT_TYPE,
      token: getToken(),
    },
  };
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers['Access-Token'] = getAccessToken();
  }
  return config;
}
