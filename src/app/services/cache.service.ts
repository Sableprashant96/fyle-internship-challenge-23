import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CacheService {

  private cache: Map<string, { data: any, timestamp: number }> = new Map();

  get<T>(key: string): ({ name: string; description: string; topics: any; }[] | undefined) | undefined {
    const cachedEntry = this.cache.get(key);

    if (cachedEntry) {
      // Checks if the entry has exceeded the time limit
      if (Date.now() - cachedEntry.timestamp > 300000) {
        // if Entry has expired then remove it from the cache
        this.cache.delete(key);
        return undefined;
      }
      return cachedEntry.data;
    }
    return undefined;
  }

  
  set<T>(key: string, value: T): void {
    // Stores the entry along with the current timestamp
    this.cache.set(key, { data: value, timestamp: Date.now() });
    // console.log("key: " + key)
  }


  // clear(): void {
  //   //clears the cache
  //   this.cache.clear();
  // }
}


