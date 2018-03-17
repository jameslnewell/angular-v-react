import * as parse from 'parse-link-header';

export interface GithubRepository {
  href: string;
  name: string;
  owner: string;
  stars: number;
}

function convert(data: any): GithubRepository {
  return {
    href: data.html_url,
    name: data.name,
    owner: data.owner.login,
    stars: data.stargazers_count
  };
}

export default class Github {

  private baseURL: string;

  constructor(baseURL: string = 'https://api.github.com') {
    this.baseURL = baseURL;
  }

  async getReposByUser(user: string): Promise<GithubRepository[]> {
    let repos: GithubRepository[] = [];
    let nextURL: string | undefined = `${this.baseURL}/users/${user}/repos`;
    while (nextURL) {
      const res = await fetch(nextURL);
      if (res.status === 403) {
        throw new Error('Access denied.');
      } else if (res.status === 404) {
        throw new Error('User does not exist.');
      } else if (res.status !== 200) {
        throw new Error('Request failed.');
      }
      const json = await res.json();
      repos = repos.concat(json.map(convert));
      const links = parse(res.headers.get('link') || '');
      if (links && links.next) {
        nextURL = links.next.url;
      } else {
        nextURL = undefined;
      }
    }
    return repos.sort((a, b) => {
      if (a.stars > b.stars) {
        return -1;
      } else if (a.stars < b.stars) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
