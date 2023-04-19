export interface Author {
    id: number;
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
  