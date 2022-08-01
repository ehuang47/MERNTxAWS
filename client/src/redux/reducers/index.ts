import profiles from "./profilesReducer";
import { combineReducers } from "redux";
import { DELETE_SESSION } from "redux/constant";
import { ReduxAction } from "types";

const reducers = combineReducers({ profiles });

const rootReducer = (state: any, action: ReduxAction<any>) => {
  // Clear all data in redux store to initial.
  if (action.type === DELETE_SESSION) state = undefined;
  return reducers(state, action);
};

export default rootReducer;