import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent {
  @Input() noOfRepos : number = 0;
  @Input() isLoading: boolean = false;
  @Input() userAvatarUrl: string = '';
  @Input() bio: string | null = '';
  @Input() name: string = '';
  @Input() location: string = '';
  @Input() htmlUrl: string = '';
  @Input() twitter: string = '';
  @Input() blog: string = '';
}
