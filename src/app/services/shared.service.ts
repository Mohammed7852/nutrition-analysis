import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  data : Map<string, any>  = new Map<string, any>();

  constructor() { }

  setData(key:string,value:any) {
    this.data.set(key, value);
  }

  getDate(key:string) {
    return this.data.get(key);
  }
}
