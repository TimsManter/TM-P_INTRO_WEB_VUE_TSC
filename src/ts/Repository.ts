import Axios from "axios";
import Marked from "marked";

export default class Repository {
  public id: number;
  public name: string;
  public description: string;
  public language: string;
  public forksCount: string;
  public stargazersCount: string;
  public watchersCount: string;

  private _readmeMd: string = "";
  private _readmeHtml: string = "";

  get ReadmeHtml(): string {
    if (this._readmeHtml === "") {
      this._readmeHtml = this.prefixLinks(Marked(this.ReadmeMd));
    }
    return this._readmeHtml;
  }

  get ReadmeMd(): string {
    if (this._readmeMd === "") {
      this.downloadReadme();
    }
    return this._readmeMd;
  }

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.language = data.language;
    this.forksCount = data.forks_count;
    this.stargazersCount = data.stargazers_count;
    this.watchersCount = data.watchers_count;
  }

  repoTypePartName(): string {
    switch (this.repoNameSections()[0].split("-")[1]) {
      case "C":
        return "container";
      case "P":
        return "project";
      case "S":
        return "study";
      case "F":
        return "fork";
      case "T":
        return "template";
      default:
        return "other";
    }
  }

  private downloadReadme(): void {
    Axios.get(`/repos/TimsManter/${this.name}/readme`, {
      headers: {
        "Accept": "application/vnd.github.v3.text+json"
      }
    }).then(response => {
      this._readmeMd = atob(response.data.content);
    }).catch(error => {
      console.log(error.response);
      throw Error("README for " +
        this.name +
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
          this.name,
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
        let slices: string[] = [
          html.slice(0, hrefPos),
          "target=\"_blank\" ",
          html.slice(hrefPos, hrefPos + 6),
          "https://github.com/TimsManter/",
          this.name,
          "/blob/master/",
          html.slice(hrefPos + 6)
        ];
        html = slices.join("");
      }
    }
    while (aPos > -1);
    return html;
  }

  private prefixLinks(html: string): string {
    return this.prefixLinkHref(this.prefixImgSrc(html));
  }

  private repoNameSections(): string[] {
    return this.name.split("_");
  }

  repoNamePart(): string {
    let name: string = this.repoNameSections()[1];
    if (name === "undefined") { return this.repoNameSections()[0]; }
    else { return name; }
  }

}