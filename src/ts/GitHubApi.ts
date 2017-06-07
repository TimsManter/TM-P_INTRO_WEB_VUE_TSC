import Axios from "axios";
import Repository from "./Repository";

export default class GitHubApi {
  private _repos: Repository[] = [];
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
      for (let i in response.data) {
        this._repos.push(new Repository(
          response.data[i].name,
          response.data[i].id
        ));
      }
    }).catch(error => {
      throw new Error("Cannot acquire projects from GitHub: " +
        error.response.data.message);
    });
  }
}