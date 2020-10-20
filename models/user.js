class User {
    constructor(login, password) {

        if (!login)
            throw "Input parameter 'login' for User model not set!";

        if (!password)
            throw "Input parameter 'password' for User model not set!";

        this.login = login;
        this.password = password;
    }
}

module.exports = User;