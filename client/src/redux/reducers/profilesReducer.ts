import { ReduxAction } from "../../types";
import { LOADING, SUCCESS, ERROR } from "../constant";
import { GET_PROFILES, ADD_PROFILE, UPDATE_PROFILE, DELETE_PROFILES } from "../constant";

const defaultRequest = {
  loading: false,
  success: false,
  responseMsg: ""
};
export default function profiles(preState: any = { request: defaultRequest, profileList: {} }, action: ReduxAction<any>) {
  const { type, payload } = action;
  Object.freeze(preState);

  switch (type) {
    case LOADING: return {
      ...preState,
      request: { loading: true, success: false, responseMsg: payload }
    };
    case SUCCESS: return {
      ...preState,
      request: { loading: false, success: true, responseMsg: payload }
    };
    case ERROR: return {
      ...preState,
      request: { loading: false, success: false, responseMsg: payload }
    };
    case GET_PROFILES: {
      const profileMap = payload.reduce((map: any, profile: any) => {
        map[profile._id] = profile;
        return map;
      }, {});
      return { ...preState, profileList: profileMap };
    }
    case ADD_PROFILE: {
      const newState = { ...preState };
      newState.profileList[payload._id] = payload;
      return newState;
    }
    case UPDATE_PROFILE: {
      const newState = { ...preState };
      newState.profileList[payload._id] = payload;
      return newState;
    }
    case DELETE_PROFILES: {
      const newState = { ...preState };
      payload.forEach((id: string) => delete newState.profileList[id]);
      return newState;
    }
    default:
      return preState;
  }
}