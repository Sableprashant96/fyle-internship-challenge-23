import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve repositories', () => {
    const user = 'testUser';
    const mockReposResponse = [
      {
        id: 12345,
        name: "angular-test-gen",
        description: "Test repository for Angular",
        language: "TypeScript"
      },
      {
        id: 67890,
        name: "my-other-repo",
        description: "Another test repository",
        language: "Python"
      }
    ]

    service.getRepos(user).subscribe((data: any) => {
      expect(data).toEqual(mockReposResponse);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${user}/repos?page=1&per_page=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReposResponse);
  });


  it('should retrieve user data for a valid username', (done) => {
    const username = 'fylein';
    const mockUserData = {
      login: username,
      id: 50228201,
      node_id: 'MDEyOk9yZ2FuaXphdGlvbjUwMjI4MjAx',
      avatar_url: 'https://avatars.githubusercontent.com/u/50228201?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/fylein',
      html_url: 'https://github.com/fylein',
      followers_url: 'https://api.github.com/users/fylein/followers',
      following_url: 'https://api.github.com/users/fylein/following{/other_user}',
      gists_url: 'https://api.github.com/users/fylein/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/fylein/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/fylein/subscriptions',
      organizations_url: 'https://api.github.com/users/fylein/orgs',
      repos_url: 'https://api.github.com/users/fylein/repos',
      events_url: 'https://api.github.com/users/fylein/events{/privacy}',
      received_events_url: 'https://api.github.com/users/fylein/received_events',
      type: 'User',
      name: 'John Doe',
      location: 'San Francisco, CA',
      public_repos: 50,
      followers: 100,
      following: 200,
      created_at: '2024-02-18T00:00:00Z',
    };

    spyOn(service['httpClient'], 'get').and.returnValue(of(mockUserData));

    service.getUser(username).subscribe((data) => {
      expect(data).toEqual(mockUserData);
      done();
    });
  });


  it('should handle other errors in getUser', (done) => {
    const username = 'testUser';
    const errorMessage = '500 : An error occurred while fetching user data.';
    const errorResponse = new HttpErrorResponse({ status: 500 });
  
    spyOn(service['httpClient'], 'get').and.returnValue(throwError(errorResponse));
  
    service.getUser(username).subscribe(
      () => {},
      (error) => {
        expect(error).toEqual(errorMessage);
        done();
      }
    );
  });

  it('should handle other errors in getRepos', (done) => {
    const username = 'testUser';
    const errorMessage = '500 : An error occurred while fetching user data.';
    const errorResponse = new HttpErrorResponse({ status: 500 });
  
    spyOn(service['httpClient'], 'get').and.returnValue(throwError(errorResponse));
  
    service.getRepos(username).subscribe(
      () => {},
      (error) => {
        expect(error).toEqual(errorMessage);
        done();
      }
    );
  });

    it('should retrieve cached repositories if available', () => {
      const user = 'fylein';
      const page = 1;
      const perPage = 10;
      const cacheKey = `https://api.github.com/users/${user}/repos?page=${page}&per_page=${perPage}-1-10`;
    
      const mockCachedData = [
        {
          id: 12345,
          name: "My GitHub Repo",
          description: "A test repository",
          language: "JavaScript",
          stars: 10,
          forks: 5,
          topics: ["web-development", "javascript", "github"]
        },
        {
          id: 12345,
          name: "My GitHub Repo",
          description: "A test repository",
          language: "JavaScript",
          stars: 10,
          forks: 5,
          topics: ["web-development", "javascript", "github"]
        }
      ]; 
    
      spyOn(service['cacheService'], 'get').and.returnValue(mockCachedData);
    
      service.getRepos(user, page, perPage).subscribe((data) => {
        expect(data).toEqual(mockCachedData);
    
        expect(service['cacheService'].get).toHaveBeenCalledWith(cacheKey);
      });
    
       httpMock.expectNone(`https://api.github.com/users/${user}/repos`);
    });

    // Tests error handling
  it('should handle 403 error for restricted user access due to rate limit exceeded', (done) => {
    const username = 'restrictedUser';
    const errorMessage = '403-Access denied or rate limit exceeded. Try again later.';
    const errorResponse = new HttpErrorResponse({ status: 403 });

    spyOn(service['httpClient'], 'get').and.returnValue(throwError(errorResponse));

    service.getUser(username).subscribe(
      () => {},
      (error) => {
        expect(error).toEqual(errorMessage);
        done();
      }
    );
  });


  it('should handle 403 error for restricted user access', (done) => {
    const username = 'restrictedUser';
    const errorMessage = '403-Access denied or rate limit exceeded. Try again later.';
    const errorResponse = new HttpErrorResponse({ status: 403 });

    spyOn(service['httpClient'], 'get').and.returnValue(throwError(errorResponse));

    service.getRepos(username).subscribe(
      () => {},
      (error) => {
        expect(error).toEqual(errorMessage);
        done();
      }
    );
  });
});