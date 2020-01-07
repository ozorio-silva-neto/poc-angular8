import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor() { }

  todayDate() {
    const ndate = new Date();
    return ndate;
  }
}
