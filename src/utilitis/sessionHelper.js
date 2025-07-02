class sessionHelper{
    setToken(token){
        localStorage.setItem('token', token);
    }

    getToken(){
        return localStorage.getItem('token');
    }

    removeToken(){
        localStorage.clear();
        window.location.href = '/login';
    }
}

export const {setToken,getToken,removeToken}=new sessionHelper();