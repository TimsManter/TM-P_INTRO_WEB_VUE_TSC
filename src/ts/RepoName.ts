export default class RepoName {
  private _full: string = null;
  private _parts: string[] = null;

  private _name: string = null;
  private _type: string = null;
  private _typeName: string = null;

  get fullName() { return this._full; }
  get name() { return this._name; }
  get type() { return this._type; }
  get typeName() { return this._typeName; }

  constructor(fullName: string) {
    this._full = fullName;
    if (fullName.substr(0, 3) !== "TM-") {
      this._name = fullName;
      this._type = "O";
      this._typeName = "other";
      return;
    }

    this._parts = this._full.split("_");
    let type: string = this._parts[0].split("-")[1];
    if (type !== undefined && type.length === 1) {
      this._type = type;
      this._typeName = this.repoTypePartName();
    }
    else {
      this._type = "O";
      this._typeName = "other";
    }
    let name: string = this._parts[1];
    if (name !== undefined && name !== "") {
      this._name = name;
    }
    else {
      this._name = fullName;
    }
  }

  private repoTypePartName(): string {
    switch (this._parts[0].split("-")[1]) {
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
}