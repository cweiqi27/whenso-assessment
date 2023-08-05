import type { UserCredential } from "firebase/auth";

export type ResponseReturnType = {
  code?: string | number;
  message?: string;
};

export type UserReturnType = ResponseReturnType & {
  user?: UserCredential["user"];
};
