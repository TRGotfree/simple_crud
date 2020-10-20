const express = require("express");
const router = express.Router();
const Repository = require("../repository/inMemoryRepository");
const repository = new Repository();
const User = require("../models/user");
const HTTP_STATUSES = require("../routes/httpStauses");

router.post("/auth", (req, res) => {
    try {

        const login = req.body?.login;
        const password = req.body?.password;

        if (!login) return res.status(HTTP_STATUSES.NOT_AUTHORIZED);
        if (!password) return res.status(HTTP_STATUSES.NOT_AUTHORIZED);

        const user = new User(login, password);
        repository.saveUser(user);

        return res.status(HTTP_STATUSES.OK);

    } catch (error) {
        return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    }
}); 