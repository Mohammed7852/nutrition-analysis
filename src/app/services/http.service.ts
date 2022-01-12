import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  getNutritionDetails(ingr:any[]) {
    return this.http.post(`${environment.nutrition_details_url}?app_id=${environment.app_id}&app_key=${environment.app_key}`
      , {ingr:ingr});
  }
}
