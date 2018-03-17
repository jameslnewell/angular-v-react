import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import { expand } from 'rxjs/operators';
import * as parse from 'parse-link-header';

export interface GithubRepository {
  href: string;
  name: string;
  owner: string;
  stars: number;
}

function convert(res: HttpResponse<any[]>): GithubRepository[] {
  return res.body.map(repo => ({
    href: repo.html_url,
    name: repo.name,
    owner: repo.owner.login,
    stars: repo.stargazers_count
  }));
}

@Injectable()
export class GithubService {

  static baseURL: string = 'https://api.github.com';

  constructor(private http: HttpClient) {
  }

  getReposByUser(user: string): Promise<GithubRepository[]> {
    return this.http.get<any[]>(`${GithubService.baseURL}/users/${user}/repos`, { observe: 'response' })
      .pipe(expand(res => {
        const links = parse(res.headers.get('link'));
        if (links.next) {
          return this.http.get<any[]>(links.next.url, { observe: 'response' });
        } else {
          return Observable.empty();
        }
      }))
      .map(convert)
      .concatMap(repos => Observable.from(repos))
      .toArray()
      .map(repos => repos.sort((a, b) => {
        if (a.stars > b.stars) {
          return -1;
        } else if (a.stars < b.stars) {
          return 1;
        } else {
          return 0;
        }
      }))
      .toPromise()
      ;
  }

}
