import Axios from "axios";
import Repository from "./Repository";

export default class GitHubApi {
  private _repos: Repository[] = [];
  get repos(): Repository[] {
    return this._repos;
  }

  private _currentRepo: Repository = null;
  get currentRepo(): Repository {
    return this._currentRepo;
  }
  set currentRepo(repo: Repository) {
    this._currentRepo = repo;
  }

  get repoName(): string {
    return this._currentRepo.name === undefined ? null : this._currentRepo.name.name;
  }

  constructor(user: string) {
    Axios.get(`/users/${user}/repos`).then(response => {
      for (let i in response.data) {
        this._repos.push(new Repository(response.data[i]));
      }
    }).catch(error => {
      throw new Error("Cannot acquire projects from GitHub: " +
        error.response.data.message);
    });
  }
}