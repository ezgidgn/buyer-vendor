import { ProfileModel } from "./ProfileModel";
import { BaseResponseModel } from "../common/BaseResponseModel";

export interface ProfileState {
    profile?:BaseResponseModel<ProfileModel>;

    
  }
  