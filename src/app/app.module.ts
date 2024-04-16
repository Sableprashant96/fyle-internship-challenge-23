import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule } from '@angular/forms';
import { LoaderRepoComponent } from './components/loader-repo/loader-repo.component';
import { LoaderUserComponent } from './components/loader-user/loader-user.component';
import { BioComponent } from './components/bio/bio.component';
import { ReposComponent } from './components/repos/repos.component';
import { EmptyZeroComponent } from './components/empty-zero/empty-zero.component';
import { CacheService } from './services/cache.service';

@NgModule({
  declarations: [
    AppComponent,
    LoaderRepoComponent,
    LoaderUserComponent,
    BioComponent,
    ReposComponent,
    EmptyZeroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse' })
  ],
  providers: [CacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
