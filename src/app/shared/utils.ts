import { environment } from '../../environments/environment';
import { Location } from '@angular/common';

export class Utils {
  static doApiUrl(path: string) {
    return Location.joinWithSlash(environment.apiUrl, path);
  }
}
