export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    private _token: string,
    // private _expiresIn: Date
  ) { }

  get token() {
    return this._token;
  }

  // get expiresIn() {
  //   return this._expiresIn;
  // }
}
