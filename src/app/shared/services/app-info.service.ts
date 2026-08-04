import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Indexa Dx';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
