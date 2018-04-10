declare module noteBirdObjs {
  interface userDbObj {
    id: number;
    firstName: string;
    lastName: string;
    facebookID: string;
    profPicLink: string
  }

  interface user {
    id: number;
    firstName: string;
    lastName: string;
    facebookID: string;
    profPicLink: string
  }

  type GetUserResult = user[];
}
