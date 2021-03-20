export class User {

  constructor(public email: string,
              public id: string,
              private _token: string,
              private _tokenExpiryDate: Date
  ) {
  }

  getToken(): string {
    if (!this._tokenExpiryDate || new Date() < this._tokenExpiryDate) { // if token doesn't exist or expired
      return null;
    }
    return this._token; // return token then
  }

}
