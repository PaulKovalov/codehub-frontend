import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Search, SearchResult } from '../interfaces';
import { Utils } from '../../shared/utils';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public lastResult: Search;

  constructor(private http: HttpClient) {
  }

  public search(queryString: string): Observable<SearchResult> {
    return this.http.get<SearchResult>(Utils.doApiUrl(`search/?query=${encodeURIComponent(queryString)}`)).pipe(tap(data => {
      this.lastResult = {query: queryString, result: data};
    }));
  }
}
