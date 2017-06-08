import Axios from "axios";
import Marked from "marked";
import RepoName from "./RepoName";

export default class Repository {
  public id: number;
  public description: string;
  public language: string;
  public forksCount: string;
  public stargazersCount: string;
  public watchersCount: string;
  public htmlUrl: string;

  private _readmeMd: string = "";
  private _readmeHtml: string = "";
  private _name: RepoName;

  get name(): RepoName {
    return this._name;
  }

  get readmeHtml(): string {
    if (this._readmeHtml === "") {
      this._readmeHtml = this.prefixLinks(Marked(this.readmeMd));
    }
    return this._readmeHtml;
  }

  get readmeMd(): string {
    if (this._readmeMd === "") {
      this.downloadReadme();
    }
    return this._readmeMd;
  }

  constructor(data: any) {
    this.id = data.id;
    this.description = data.description;
    this.language = data.language;
    this.forksCount = data.forks_count;
    this.stargazersCount = data.stargazers_count;
    this.watchersCount = data.watchers_count;
    this.htmlUrl = data.html_url;

    this._name = new RepoName(data.name);
  }

  private downloadReadme(): void {
    Axios.get(`/repos/TimsManter/${this.name.fullName}/readme`, {
      headers: {
        "Accept": "application/vnd.github.v3.text+json"
      }
    }).then(response => {
      this._readmeMd = atob(response.data.content);
    }).catch(error => {
      console.log(error.response);
      throw Error("README for " +
        this.name.fullName +
        ": " + error.response.data.message);
    });
  }

  private prefixImgSrc(html: string): string {
    let imgPos: number;
    do {
      imgPos = html.indexOf("<img", imgPos + 4);
      if (imgPos > -1) {
        let srcPos: number = html.indexOf("src=\"", imgPos);
        let slices: string[] = [
          html.slice(0, srcPos + 5),
          "https://raw.githubusercontent.com/TimsManter/",
          this.name.fullName,
          "/master/",
          html.slice(srcPos + 5)
        ];
        html = slices.join("");
      }
    }
    while (imgPos > -1);
    return html;
  }

  private prefixLinkHref(html: string): string {
    let aPos: number;
    do {
      aPos = html.indexOf("<a", aPos + 2);
      if (aPos > -1) {
        let hrefPos: number = html.indexOf("href=\"", aPos);
        if (html.charAt(hrefPos + 6) === "#") { continue; }
        if (html.substr(hrefPos + 6, 4) === "http") {
          let slices: string[] = [
            html.slice(0, hrefPos),
            "target=\"_blank\" ",
            html.slice(hrefPos)
          ];
          html = slices.join("");
        }
        else {
          let slices: string[] = [
            html.slice(0, hrefPos),
            "target=\"_blank\" ",
            html.slice(hrefPos, hrefPos + 6),
            "https://github.com/TimsManter/",
            this.name.fullName,
            "/blob/master/",
            html.slice(hrefPos + 6)
          ];
          html = slices.join("");
        }
      }
    }
    while (aPos > -1);
    return html;
  }

  private prefixLinks(html: string): string {
    return this.prefixLinkHref(this.prefixImgSrc(html));
  }

}