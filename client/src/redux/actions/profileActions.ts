import { LOADING, SUCCESS, ERROR } from "../constant";
import { GET_PROFILES, ADD_PROFILE, UPDATE_PROFILE, DELETE_PROFILES } from "../constant";
import axios from "axios";
import { TypedDispatch } from "../store";
// import { UserInterface, UserPayload } from "../../types";

const createAction = (type: string, payload: any) => ({ type, payload });
const { REACT_APP_SERVER_URL: SERVER_URL } = process.env;
// do: onclick for conditionally rendered error messages to reset the message to indicate the user has seen it
// do: add try/catch handlers for each await

const dispatchAfterRequest = (res: object & any, dispatch: TypedDispatch, actionType: string, dispatchData: any, customErrorMsg: string): void => {
  const { success, message, data, error } = res.data;
  if (success) {
    console.log(data, message);
    dispatch(createAction(SUCCESS, message));
    dispatch(createAction(actionType, dispatchData ? dispatchData : data));
  } else {
    dispatch(createAction(ERROR, customErrorMsg));
    console.error(error);
  }
};

export const getProfiles = () => async (dispatch: TypedDispatch) => {
  dispatch(createAction(LOADING, "Loading all user profiles."));

  const res: object & any = await axios.get(`${SERVER_URL}/user/profiles`);
  dispatchAfterRequest(res, dispatch, GET_PROFILES, null, "We encountered an issue while loading all user profiles.");
};

export const addProfile = (payload: FormData) => async (dispatch: TypedDispatch) => {
  dispatch(createAction(LOADING, "Adding user profile."));
  Array.from(payload.values()).forEach((val) => console.log(val));

  const res: object & any = await axios.post(`${SERVER_URL}/user/profiles`, payload);
  dispatchAfterRequest(res, dispatch, ADD_PROFILE, null, "We encountered an issue while adding the user profile.");
};

export const updateProfile = (payload: FormData) => async (dispatch: TypedDispatch) => {
  dispatch(createAction(LOADING, "Updating user profile."));

  const res: object & any = await axios.put(`${SERVER_URL}/user/profiles`, payload);
  dispatchAfterRequest(res, dispatch, UPDATE_PROFILE, null, "We encountered an issue while updating the user profile.");
};

export const deleteProfiles = (payload: string[]) => async (dispatch: TypedDispatch) => {
  dispatch(createAction(LOADING, "Deleting user profile."));

  const res: object & any = await axios.delete(`${SERVER_URL}/user/profiles`, { data: payload });
  dispatchAfterRequest(res, dispatch, DELETE_PROFILES, payload, "We encountered an issue while deleting the user profile.");
};