import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getProfiles, addProfile, updateProfile, deleteProfiles } from "./profileThunk";
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ProfileState {
  request: { loading: boolean, success: boolean, responseMsg: string; };
  profileList: any;
}

// Define the initial state using that type
const initialState: ProfileState = {
  request: { loading: false, success: false, responseMsg: "" },
  profileList: {}
};

const setFulfilledState = (state: ProfileState): void => { state.request = { loading: false, success: true, responseMsg: "" }; };

// auto-generate the action types and action creators for you, based on the names of the reducer functions
// action type = sliceName/reducerFunctionName

export const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfiles.fulfilled, (state, action: PayloadAction<any>): void => {
      state.profileList = action.payload.reduce((map: any, profile: any) => {
        map[profile._id] = profile;
        return map;
      }, {});
      setFulfilledState(state);
    })
      .addCase(addProfile.fulfilled, (state, action: PayloadAction<any>): void => {
        const { payload } = action;
        state.profileList[payload._id] = payload;
        setFulfilledState(state);
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<any>): void => {
        const { payload } = action;
        state.profileList[payload._id] = payload;
        setFulfilledState(state);
      })
      .addCase(deleteProfiles.fulfilled, (state, action: PayloadAction<any>): void => {
        action.payload.forEach((id: string) => delete state.profileList[id]);
        setFulfilledState(state);
      });

    builder.addMatcher(isAnyOf(getProfiles.pending, addProfile.pending, updateProfile.pending, deleteProfiles.pending),
      (state, action): void => {
        console.log(action);
        state.request = { loading: true, success: false, responseMsg: action.meta.arg.pendingMsg };
      })
      .addMatcher(isAnyOf(getProfiles.rejected, addProfile.rejected, updateProfile.rejected, deleteProfiles.rejected),
        (state, action: PayloadAction<any>): void => {
          state.request = { loading: false, success: false, responseMsg: action.payload };
        });
  },
});

// for these action creators, just pass in the payload
// export const { setPendingState } = profileSlice.actions;

export default profileSlice.reducer;
