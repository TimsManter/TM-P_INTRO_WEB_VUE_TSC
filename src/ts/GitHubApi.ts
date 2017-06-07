import Axios from "axios";
import Repository from "./Repository";

export default class GitHubApi {
  private _repos: Repository[] = null;
  get Repos(): Repository[] {
    return this._repos;
  }

  private _currentRepo: Repository = null;
  get CurrentRepo(): Repository {
    return this._currentRepo;
  }
  set CurrentRepo(repo: Repository) {
    this._currentRepo = repo;
  }

  get RepoName(): string {
    return this._currentRepo.name === undefined ? null : this._currentRepo.name;
  }

  constructor(user: string) {
    Axios.get(`/users/${user}/repos`).then(response => {
      this._repos = response.data;
    }).catch(error => {
      throw new Error("Cannot acquire projects from GitHub: " +
        error.response.data.message);
    });
  }
}