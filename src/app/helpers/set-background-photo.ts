
export const setBackgroundPhoto = (backgroundPhoto: any) => {
    if(!backgroundPhoto){
        return "background-color: #333639; " 
      }else{
        return 'background-image: url(' + backgroundPhoto + '); cursor: pointer;' 
      }
};