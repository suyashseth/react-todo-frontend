class AuthenticationService{
    registerSuccessfulLogin(username, password){
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem('authenticatedUser',username)
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null){
            return false
        }
        return true
    }

    getLoggedInUsername(){
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null){
            return null;
        }
        return user;
    }

}

export default new AuthenticationService()