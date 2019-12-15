import {environment} from '../../environments/environment';

export function doApiUrl(path: string) {
  return `${environment.apiBaseUrl}/api/v${environment.apiMajorVersion}/${path}`;
}
