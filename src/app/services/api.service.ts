import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Repo } from '../interfaces/repo.interface';
import { User } from '../interfaces/user.interface';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient, private cacheService: CacheService
  ) { }

  // API calling to fetch user details

  getUser(username: string): Observable<any> {
    
    return this.httpClient.get<User>(`https://api.github.com/users/${username}`).pipe(
      // Error handling 
      catchError((error: HttpErrorResponse) => {                                         
        let errorMessage = '';
         if (error.status === 403) {  
          errorMessage = '403-Access denied or rate limit exceeded. Try again later.';
          alert(errorMessage);
        }
        else if (error.status !== 404) {  
          //Empty State considered for 404 error.
          //for other error codes
          errorMessage = error.status + ' : An error occurred while fetching user data.';
          alert(errorMessage);
        }

        return new Observable((observer) => {
          observer.error(errorMessage);
        });
      })
    );}


      // API calling to fetch repos detail
      getRepos(User: string, page: number = 1, per_page: number = 10): Observable<any> {
        const url = `https://api.github.com/users/${User}/repos?page=${page}&per_page=${per_page}`;
        //cache key to store in 
        const cacheKey = `${url}-${page}-${per_page}`;
      
        const cachedData = this.cacheService.get<Repo[]>(cacheKey);
        if (cachedData) {
          return new Observable(observer => {
            observer.next(cachedData);
            observer.complete();
          });
        }
      
        return this.httpClient.get<Repo[]>(url).pipe(
          tap(data => {
            this.cacheService.set<Repo[]>(cacheKey, data);
          }),
          catchError((error: HttpErrorResponse) => {                                    
            let errorMessage = '';
            if (error.status === 403) {  
              errorMessage = '403-Access denied or rate limit exceeded. Try again later.';
              alert(errorMessage);
            }

            else if (error.status !== 404) {  
            // Empty State considered for 404 error.
            // For other error codes
            errorMessage = error.status + ' : An error occurred while fetching user data.';
            alert(errorMessage);
            }
            return new Observable((observer) => {
              observer.error(errorMessage);
            }); // Use throwError to propagate the error in the observable chain
          })
        );
      }
}
