const express = require("express");
const router = express.Router();
const Repository = require("../repository/inMemoryRepository");
const repository = new Repository();
const User = require("../models/user");
const HTTP_STATUSES = require("../models/httpStatuses");
const HTTP_STATUS_MSG = require("../models/httpStatusMessages");
const jsonParser = express.json();

router.post("/", jsonParser, (req, res) => {
    try {

        const login = req.body?.login;
        const password = req.body?.password;

        if (!login) return res.status(HTTP_STATUSES.NOT_AUTHORIZED).send(HTTP_STATUS_MSG.NOT_AUTHORIZED_MSG);
        if (!password) return res.status(HTTP_STATUSES.NOT_AUTHORIZED).send(HTTP_STATUS_MSG.NOT_AUTHORIZED_MSG);

        const user = new User(login, password);
        repository.saveUser(user);

        return res.sendStatus(HTTP_STATUSES.OK);

    } catch (error) {
        return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).send(HTTP_STATUS_MSG.INTERNAL_SERVER_ERROR_MSG);
    }
}); 