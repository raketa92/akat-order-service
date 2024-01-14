export {};

export type UserData = {
    userId?: string; 
    roleId?: number;
    permissions?: string[];
    roles?: string[];
}

declare global {
    namespace Express {
      export interface Request {
        userData?: UserData;
      }
    }
  }