import { ApiService } from './services/api.service';
import { CacheService } from './services/cache.service';
import { AppComponent } from './app.component';
import { of, throwError } from 'rxjs';
import { Repo } from '../app/interfaces/repo.interface';
import { User } from '../app/interfaces/user.interface';
describe('AppComponent', () => {
  let component: AppComponent;
  let apiService: jasmine.SpyObj<ApiService>;
  let cacheService: jasmine.SpyObj<CacheService>;

  beforeEach(() => {
    apiService = jasmine.createSpyObj('ApiService', ['getUser', 'getRepos']);
    cacheService = jasmine.createSpyObj('CacheService', ['get', 'set']);
    component = new AppComponent(apiService, cacheService);
  });



  
  it('should initialize with default values', () => {
    expect(component.currentPage).toEqual(1);
    expect(component.reposPerPage).toEqual(10);
    expect(component.noOfRepos).toEqual(0);
    expect(component.User).toEqual('');
    expect(component.isLoading).toBeFalse();
    expect(component.userAvatarUrl).toEqual('');
    expect(component.bio).toEqual([]);
    expect(component.name).toEqual('');
    expect(component.location).toEqual('');
    expect(component.htmlUrl).toEqual('');
    expect(component.twitter).toEqual('');
    expect(component.repos).toEqual([]);
    expect(component.isLoadingRepo).toBeFalse();
    expect(component.blog).toEqual('');
    expect(component.pages).toEqual([]);
  });




  it('should fetch user details and repositories when UserDetailsAndRepo called successfully', (done: DoneFn) => {
    const userDetails: User = {
      avatar_url: 'https://avatars.githubusercontent.com/u/50228201?v=4',
      name: 'Fyle Technologies Pvt Ltd',
      location: 'India',
      bio: 'Bio',
      html_url: 'https://github.com/fylein',
      twitter_username: 'exampleuser',
      public_repos: 79,
      blog: '"https://www.fylehq.com"',
    };
    const repos: Repo[] = [
      {
        name: 'angular-test-gen',
        description: 'test description',
        topics: null as any,
      },
    ];

    const cachedRepos = [
      {
        name: 'angular-test-gen',
        description: 'test description',
        topics: null as any,
      },
    ];

    apiService.getUser.and.returnValue(of(userDetails));
    apiService.getRepos.and.returnValue(of(repos));
    component.User = 'validUser';
    component.UserDetailsAndRepos();

    expect(apiService.getUser).toHaveBeenCalledWith('validUser');
    expect(apiService.getRepos).toHaveBeenCalledWith('validUser',component.currentPage,component.reposPerPage);
    
    component.isLoading = false;

    setTimeout(() => {
      expect(component.userAvatarUrl).toEqual(userDetails.avatar_url);
      expect(component.name).toEqual(userDetails.name);
      expect(component.location).toEqual(userDetails.location);
      expect(component.bio).toEqual(userDetails.bio);
      expect(component.htmlUrl).toEqual(userDetails.html_url);
      expect(component.twitter).toEqual(userDetails.twitter_username);
      expect(component.noOfRepos).toEqual(userDetails.public_repos);
      expect(component.blog).toEqual(userDetails.blog);
      done();
    });
  });






  it('should show alert and return when User is not provided', () => {
    component.User = '';
    spyOn(window, 'alert');

    component.UserDetailsAndRepos();

    expect(window.alert).toHaveBeenCalledWith(
      'Please enter a GitHub username to search for repositories.'
    );
  });





  it('should show alert and return when User is not provided', () => {
    component.User = '';
    spyOn(window, 'alert');

    component.findRepositories();
    expect(window.alert).toHaveBeenCalledWith(
      'Please enter a GitHub username to search for repositories.'
    );
  });






  it('should initialize component properties on ngOnInit', () => {
    component.ngOnInit();
    expect(component.currentPage).toEqual(1);
    expect(component.reposPerPage).toEqual(10);
  });



  it('should handle API errors for user details and repositories when UserDetailsAndRepos called', (done: DoneFn) => {
    apiService.getUser.and.returnValue(throwError(() => new Error('User Not Found')));
    apiService.getRepos.and.returnValue(throwError(() => new Error('Repository fetch failed'))); 

    component.User = 'invalidUser';
    component.UserDetailsAndRepos();

    expect(apiService.getUser).toHaveBeenCalledWith('invalidUser');
    expect(apiService.getRepos).toHaveBeenCalledWith(
      'invalidUser',
      component.currentPage,
      component.reposPerPage
    );

    component.isLoading = false;

    setTimeout(() => {
      expect(component.isLoading).toBe(false);
      expect(component.userAvatarUrl).toEqual('');

      done();
    });
  });



  it('should fetch repositories when findRepositories called successfully', (done: DoneFn) => {
    const repos: Repo[] = [
      {
        name: 'angular-test-gen',
        description: 'test description',
        topics: ['topic', 'Topic2'],
      },
    ];

    apiService.getRepos.and.returnValue(of(repos));

    component.User = 'validUser';
    component.findRepositories();

    expect(apiService.getRepos).toHaveBeenCalledWith(
      'validUser',
      component.currentPage,
      component.reposPerPage
    );

    component.isLoadingRepo = false;

    setTimeout(() => {
      expect(component.repos).toEqual(repos);
      done();
    });
  });




  it('should handle API errors for Repositories when findRepositories called', (done: DoneFn) => {
    apiService.getRepos.and.returnValue(throwError('Repository fetch failed'));

    component.User = 'invalidUser';
    component.findRepositories();

    expect(apiService.getRepos).toHaveBeenCalledWith(
      'invalidUser',
      component.currentPage,
      component.reposPerPage
    );

    component.isLoadingRepo = false;
    setTimeout(() => {
      expect(component.isLoadingRepo).toBe(false);

      done();
    });
  });


  it('should handle repositories with falsy topics', (done: DoneFn) => {
    const repos: Repo[] = [
      {
        name: 'angular-test-gen',
        description: 'test description',
        topics: null as any
      },
    ];

    apiService.getRepos.and.returnValue(of(repos));

    component.User = 'validUser';
    component.findRepositories();

    expect(apiService.getRepos).toHaveBeenCalledWith(
      'validUser',
      component.currentPage,
      component.reposPerPage
    );

    setTimeout(() => {
      expect(component.repos).toEqual([
        {
          name: 'angular-test-gen',
          description: 'test description',
          topics: []
        },
      ]);
      done();
    });
  });
});
