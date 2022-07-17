// Type definitions for MERNTxAWS
// Project: MERNTxAWS
// Definitions by: ethan

// /// <reference path="myModules.d.ts" />
// import * as m from "SomeModule";

export interface UserInterface {
  profile: string;
  name: string;
  email: string;
  phone: string;
}

export interface ReduxAction {
  type: string;
  payload: object;
}