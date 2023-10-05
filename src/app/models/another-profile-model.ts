export class AnotherProfileModel {
    userIdentifier: string;
    firstName: string; 
    username: string; 
    following: number;
    followers: number; 
    biography: string; 
    location: string; 
    site: string;
    registrationTime: Date;
    privateAccount: boolean; 
    isBlockedByMe: boolean; 
    hasBlockedMe:  boolean;
    isFollowedByMe: boolean; 
    isPendingFollowedByMe: boolean; 
    isFollowingMe: boolean;
    isSilencedByMe: boolean; 
    isNotificationsAlertedByMe: boolean;
    tweetsCount: number; 
    followersInCommon: any[]
    profilePhotoUrl: string;
    backgroundPhotoUrl: string; 
    isVerified: boolean;
}