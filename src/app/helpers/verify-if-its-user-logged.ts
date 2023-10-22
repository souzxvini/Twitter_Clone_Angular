export const verifyIfItsLoggedUser = (activatedRoute: any) => {
    return activatedRoute.includes(localStorage.getItem('userName'));
};