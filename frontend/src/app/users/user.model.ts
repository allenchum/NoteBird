export class User {
    email: string
    firstName: string
    lastName: string
    facebookID: string
    profPicLink: string

    constructor(options){
        this.email = options.email;
        this.firstName = options.firstName;
        this.lastName = options.lastName;
        this.facebookID = options.facebookID;
        this.profPicLink = options.profPicLink;
    }
}
