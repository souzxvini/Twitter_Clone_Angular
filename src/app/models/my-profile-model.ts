export class MyProfileModel {
    firstName: string;
    username: string;
    following: number;
    followers: number;
    biography: string;
    location: string;
    site: string;
    registrationTime: Date;
    privateAccount: boolean;
    languagePreference: string;
    profilePhoto: {
        photo: any;
        xposition: number;
        yposition: number;
    }
}