import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestBaseService } from './request-base.service';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../models/purchase.models';
import { Observable } from 'rxjs';

const API_URL_COURSE =
  environment.BASE_URL + '/learn-course/api/courses/purchases';

const API_URL = environment.BASE_URL + '/learn-purchase/api/purchases';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService extends RequestBaseService {
  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  savePurchase(purchase: Purchase): Observable<any> {
    return this.http.post(API_URL_COURSE, { headers: this.getHeaders });
  }

  getAllPurchaseItems(): Observable<any> {
    return this.http.get(API_URL, { headers: this.getHeaders });
  }
}
