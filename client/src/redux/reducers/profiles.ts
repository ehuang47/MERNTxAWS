import { ReduxAction, UserPayload } from "../../types";
import { ADD_PROFILE, UPDATE_PROFILE, DELETE_PROFILE, CLEAR_PROFILES } from "../constant";

export default function profiles(preState = {} as any, action: ReduxAction<UserPayload>) {
  const { type, payload } = action;
  Object.freeze(preState);

  switch (type) {
    case ADD_PROFILE: {
      return { ...preState, [payload.id]: payload };
    }
    case UPDATE_PROFILE: {
      return { ...preState, [payload.id]: payload };
    }
    case DELETE_PROFILE: {
      const newState = { ...preState };
      delete newState[payload.id];
      return newState;
    }
    case CLEAR_PROFILES: {
      return {};
    }
    default:
      return preState;
  }
}