export class TweetModel {
    tweetIdentifier: string;
    originalTweetIdentifier: string;
    originalTweetResponse: TweetModel;
    tweetTypeDescription: string;
    userIdentifier: string;
    userUsername: string;
    userFirstName: string;
    tweetMessage: string;
    tweetCommentsCount: number;
    tweetRetweetsCount: number;
    tweetNoValuesRetweetsCount: number;
    tweetLikesCount: number;
    tweetViewsCount: number;
    tweetFavsCount: number;
    userProfilePhotoUrl: string;
    tweetAttachment: string[];
    retweetedByMe: boolean;
    likedByMe: boolean;
    publicationTime: Date;
}