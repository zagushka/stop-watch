import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Delete localStorage object and setState to default
   */
  remove(KEY) {
    localStorage.removeItem(KEY);
  }

  /**
   * Store to localStorage object
   * stringify provided state automatically
   */
  set(KEY, state: any) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  /**
   * Retrieve object from localStorage
   * use reviver to parse retrieved json string
   * default value will be used in case stored item was not found or there were parsing issues
   */
  get<T>(KEY: string, reviver, defaultValue: T): T {
    try {
      return JSON.parse(localStorage.getItem(KEY), reviver) || defaultValue;
    } catch (error) {
      return defaultValue;
    }
  }
}
