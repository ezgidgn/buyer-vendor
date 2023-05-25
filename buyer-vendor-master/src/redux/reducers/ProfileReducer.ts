import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Constants from "../../../common/Constants";
import { ProfileState } from "../../../models/profiles/ProfileState";
import { ProfileModel } from "../../../models/profiles/ProfileModel";
import { GetProfilesRequestModel } from "../../../models/profiles/GetProfilesRequestModal";

import { PostProfilesRequestModel } from "../../../models/profiles/PostProfilesRequestModel";

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxMjAyMTA0LCJleHAiOjE2ODM3OTQxMDR9.vjeFr8SlLUYY1lvsBV_2n-klPH6K-hKuCHcQC3XEMhk";

const initialState: ProfileState = {};

const slice = createSlice({
  name: "profileReducer",
  initialState,
  reducers: {
    setProfileReducer: (state: ProfileState, action) => {
      state.profile = action.payload;
    },
  },
});

const { setProfileReducer } = slice.actions;

const getProfiles =
  (request: GetProfilesRequestModel) => async (dispatch: any) => {
    const url = Constants.apiUrl + "vendors/" + request.vendor_id;
    axios
      .get(url)
      .then((response) => {
        const profilesModel: ProfileModel = response.data;
        dispatch(setProfileReducer(profilesModel));
      })
      .catch((error) => {
        console.log(error);
      });
  };

const putProfiles =
  (data: PostProfilesRequestModel, vendor_id: number) => async (dispatch: any) => {
    axios
      .put(Constants.apiUrl + "vendors/"+vendor_id, {data} )
      .then((response) => {
        const profilesModel: ProfileModel = response.data;
        console.log(profilesModel)
        dispatch(setProfileReducer(profilesModel));
      })
      .catch((error) => {
        console.log(error);
      });
  };

export default {
  reducer: slice.reducer,
  getProfiles,
  putProfiles,
};
