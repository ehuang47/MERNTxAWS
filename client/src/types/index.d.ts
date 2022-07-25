// Type definitions for MERNTxAWS
// Project: MERNTxAWS
// Definitions by: ethan

// /// <reference path="myModules.d.ts" />
// import * as m from "SomeModule";

export interface UserInterface {
  profile: string | FormData;
  name: string;
  email: string;
  phone: string;
}

interface UserPayload extends UserInterface {
  _id: string;
}
export interface ReduxAction<Payload> {
  type: string;
  payload: Payload;
}