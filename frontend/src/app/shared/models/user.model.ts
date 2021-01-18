export interface UserAddress {
  streetAndHouseNumber: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface UserName {
  firstName: string;
  lastName: string;
}

export class User {
  constructor(
    public id: string,
    public email: string,
    public name: UserName,
    public role: string,
    public address: UserAddress,
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
