export class Message {
  constructor(public content: string,
              public user: string,
              // ? => optionnel, tous le monde peuvent ecrire des messages mais si tu es connecter, on peut retracer tes messages 
              public messageId?: string,
              public userId?: string){}
}