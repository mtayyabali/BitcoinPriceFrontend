import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

class Bitcoin {
  constructor(
    public bitcoin: Bitcoin
  ) {
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'X-Auth-Token':
      '62121c4f783e487fbc0785830af63bf4'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {
  api = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
  ) {
  }

  getBPIData(filters: { endDate: string; startDate: string }): Observable<Bitcoin> {
    try {

      const urlPrefix = this.api + '/v1/bpi';
      const params = new HttpParams()
        .set('startDate', filters.startDate)
        .set('endDate', filters.endDate);
      return this.http.get<Bitcoin>(urlPrefix, {params});
    } catch (e) {
      console.log('Error in Sending Request =>', e);
      return e;
    }
  }
}
