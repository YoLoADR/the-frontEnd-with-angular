export class User {
  constructor(public email: string,
              public password: string,
              // ? => optionnel
              public firstName?: string,
              public lastName?: string){}
}