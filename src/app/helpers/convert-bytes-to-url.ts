export const convertBytesToURL = (profilePictureBytes: string) => {
    return `data:image/jpeg;base64,${profilePictureBytes}`;
};