import { Component, ViewChild, ElementRef, ComponentRef, Input } from '@angular/core';
import { GithubService, GithubRepository } from '../app/services/GithubService';
import { InputComponent } from './ui/input/input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GithubService],
})
export class AppComponent {

  user: string;
  repos?: GithubRepository[];

  isLoading: boolean;
  message?: {
    type: 'info' | 'error';
    content: string;
  };

  github: GithubService;

  @ViewChild(InputComponent) input: InputComponent;

  constructor(github: GithubService) {
    this.github = github;
  }

  handleChange(user: string) {
    this.user = user;
  }

  handleLoad() {

    // loading state
    this.isLoading = true;
    this.repos = undefined;
    this.message = undefined;

    this.github.getReposByUser(this.user).then(
      repos => {
        // loaded state
        this.isLoading = false;

        if (repos.length === 0) {
          this.message = {
            type: 'error',
            content: 'Unable to fetch stars 😢'
          };
        } else {
          this.repos = repos;
        }

        this.input.focus();
        this.input.select();

      },
      error => {
        // errored state
        this.isLoading = false;
        this.message = {
          type: 'error',
          content: 'Unable to fetch stars 😢'
        };
      }
    );
  }

  handleOpen(repo: GithubRepository) {
    window.open(`https://www.github.com/${repo.owner}/${repo.name}`);
  }

}
