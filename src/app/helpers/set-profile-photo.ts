import { noProfilePicture } from "./no-profile-picture";

export const setProfilePhoto = (profilePhoto: any) => {
    if(!profilePhoto){
        return 'background-image: url(' + noProfilePicture() + ')' 
      }else{
        return 'background-image: url(' + profilePhoto + ')' 
      }
};