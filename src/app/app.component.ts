import { Component, OnInit} from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApiService } from './services/api.service';
import { CacheService } from './services/cache.service';
import { Repo } from './interfaces/repo.interface';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fyle-frontend-challenge';
  currentPage: number = 1;
  reposPerPage: number = 10;
  noOfRepos : number = 0;
  User: string = '';
  isLoading: boolean = false;
  isEmptyState : boolean = false;
  userAvatarUrl: string = '';
  bio: string | null = '';
  name: string = '';
  location: string = '';
  htmlUrl: string = '';
  twitter: string = '';
  repos: Repo[] = [];
  isLoadingRepo: boolean = false;
  blog : string ='';
  pages : number[] = [];
  maxVisiblePages: number = 8;
  totalNumberOfPages : number = 0;

  constructor(private apiService: ApiService, private catcheService:CacheService) { }

  ngOnInit(): void { this.isEmptyState = false}



   // function to fetch repositories and User details

  UserDetailsAndRepos(): void {
        
    if (!this.User) {
      alert('Please enter a GitHub username to search for repositories.');  // Exit the function if the username is not provided
      return;
    }

    this.isLoading = true;  //loader starts 
    this.isEmptyState = false;
    // Created observables for getUser and getRepos
    const userObservable = this.apiService.getUser(this.User);
    const reposObservable = this.apiService.getRepos(this.User, this.currentPage, this.reposPerPage);

    // Used forkJoin to make both requests at same time
    forkJoin([userObservable, reposObservable]).subscribe(
       {next: ([userDetails, repos]: [User, Repo[]]) => {
        this.userAvatarUrl = userDetails.avatar_url;
        this.name = userDetails.name;
        this.location = userDetails.location;
        this.bio = userDetails.bio;
        this.htmlUrl = userDetails.html_url;
        this.twitter = userDetails.twitter_username;
        this.noOfRepos = userDetails.public_repos;
        this.blog = userDetails.blog;

        //update visible page range
        this.pageUpdate();


        // Process repos
        this.repos = repos.map(repo => {
          return {
            name: repo.name,
            description: repo.description,
            topics: repo.topics || [] 
          };
        });

        this.isLoading = false;
      },
      error: error => {
        this.isEmptyState = true;
        this.isLoading = false;
      }}
    );
  }


  // function only to fetch repositories

  findRepositories(): void {
    if (!this.User) {
      alert('Please enter a GitHub username to search for repositories.'); // Exit the function if the username is not provided
      return; 
    }
    this.isLoadingRepo = true;
    //update visible page range
    this.pageUpdate();
    this.apiService.getRepos(this.User, this.currentPage, this.reposPerPage).subscribe({ 
      next:  (repos: Repo[]) => {
        this.repos = repos.map(repo => {
          return {
            name: repo.name,
            description: repo.description,
            topics: repo.topics || [] // Assuming topics exist as an array in the response
          };

        });
        this.isLoadingRepo = false;
      },
      error: error  => {
        this.isLoadingRepo = false;
        this.isEmptyState = true
      }}
    );
  }

//function to update visible page range
  pageUpdate(): void{
    this.totalNumberOfPages = Math.ceil(this.noOfRepos / this.reposPerPage);
    // Calculate the start and end indices of the visible page range
    const start = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
    const end = Math.min(this.totalNumberOfPages, start + this.maxVisiblePages - 1);
    // Create an array of visible pages based on the calculated range
    this.pages = Array.from({ length: this.totalNumberOfPages }, (_, i) => i + 1).slice(start - 1, end);
  }
}
