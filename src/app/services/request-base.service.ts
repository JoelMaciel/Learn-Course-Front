import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user.model";
import { AuthenticationService } from "./authentication.service";


export abstract class RequestBaseService {

  protected currentUser: User = new User;

 protected constructor(
  protected authenticationService: AuthenticationService, protected http: HttpClient) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    })
   }

   get getHeaders(): HttpHeaders {
    return new HttpHeaders(
      {
        authorization: 'Bearer ' + this.currentUser?.token,
        "Content_type": "application/json; charset=UTF-8"
      }
    )
   }
}

