export class User {

  constructor(public email: string,
              public id: string,
              private token: string,
              private tokenExpiryDate: Date
  ) {
  }

  getToken(): string {
    if (!this.tokenExpiryDate || new Date(Date.now()) > this.tokenExpiryDate) { // if token doesn't exist or expired
      return null;
    }
    return this.token; // return token then
  }

  getTokenExpiryDate(): Date {
    return this.tokenExpiryDate;
  }

}
