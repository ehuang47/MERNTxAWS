// Type definitions for MERNTxAWS
// Project: MERNTxAWS
// Definitions by: ethan

// /// <reference path="myModules.d.ts" />
// import * as m from "SomeModule";

// only use declare module "moduleName" if the module is 3rd party or already exists
import { Model as mongooseModel, Document as mongooseDoc } from "mongoose";

export interface UserInterface {
  profile: string;
  name: string;
  email: string;
  phone: string;
}

export interface UserModelInterface extends mongooseModel<UserDocInterface> {
  build(user: UserInterface): UserDocInterface;
}

export interface UserDocInterface extends mongooseDoc, UserInterface { }


