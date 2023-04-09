export interface Author {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    affiliation: string;
    role: UserRole;
  }
  
  export enum UserRole {
    AUTHOR = 'AUTHOR',
  }
  