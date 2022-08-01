import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_SERVER_URL: SERVER_URL } = process.env;

const handleResponse = async (request: any, originalPayload: any, rejectWithValue: any, customErrorMsg: string): Promise<void> => {
  try {
    const res: object & any = await request;
    const { success, message, data, error } = res.data;
    if (success) {
      console.log(`Success: ${message}`);
      // the reducer only needs originalPayload if deleting profiles
      return originalPayload ? originalPayload : data;
    }
    else {
      console.error("Error:", error);
      return rejectWithValue(customErrorMsg);
    }
  } catch (e) {
    console.error("Error:", e);
    return rejectWithValue(customErrorMsg);
  }
};

const setOptions = (message: string) => ({ getPendingMeta: ({ arg }: { arg: any; }) => { arg["pendingMsg"] = message; } });

export const getProfiles = createAsyncThunk('profiles/getAll', async (payload, { rejectWithValue }) => {
  const request = axios.get(`${SERVER_URL}/user/profiles`);
  return await handleResponse(request, null, rejectWithValue, "We encountered an issue while loading all user profiles.");
}, setOptions("Loading all user profiles."));

export const addProfile = createAsyncThunk('profiles/addOne', async (payload: FormData, { rejectWithValue }) => {
  const request = axios.post(`${SERVER_URL}/user/profiles`, payload);
  return await handleResponse(request, null, rejectWithValue, "We encountered an issue while adding the user profile.");
}, setOptions("Adding user profile."));

export const updateProfile = createAsyncThunk('profiles/updateOne', async (payload: FormData, { rejectWithValue }) => {
  const request = axios.put(`${SERVER_URL}/user/profiles`, payload);
  return await handleResponse(request, null, rejectWithValue, "We encountered an issue while updating the user profile.");
}, setOptions("Updating user profile."));

export const deleteProfiles = createAsyncThunk('profiles/deleteMany', async (payload: string[], { rejectWithValue }) => {
  const request = axios.delete(`${SERVER_URL}/user/profiles`, { data: payload });
  return await handleResponse(request, payload, rejectWithValue, "We encountered an issue while deleting the user profile.");
}, setOptions("Deleting user profile."));
