import Axios from "axios";
import Marked from "marked";

export default class Repository {
  public name: string = null;
  private _readmeMd: string = null;
  private _readmeHtml: string = null;

  get ReadmeHtml() {
    if (this._readmeHtml === null) {
      this._readmeHtml = this.prefixLinks(Marked(this.ReadmeMd));
    }
    return this._readmeHtml;
  }

  get ReadmeMd(): string {
    if (this._readmeMd === null) {
      this._readmeMd = this.downloadReadme(this.name);
    }
    return this._readmeMd;
  }

  private downloadReadme(repoName: string): string {
    let readme: string = null;
    Axios.get("/repos/TimsManter/" + this.name + "/readme", {
      headers: {
        "Accept": "application/vnd.github.v3.text+json"
      }
    }).then(response => {
      readme = atob(response.data.content);
    }).catch(error => {
      console.log(error.response);
      throw Error("README for " +
        this.name +
        ": " + error.response.data.message);
    });
    return readme;
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
}