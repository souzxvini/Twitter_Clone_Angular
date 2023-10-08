export const verifyIfItsLoggedUser = (activatedRoute: any) => {
    return activatedRoute.includes(sessionStorage.getItem('userName'));
};