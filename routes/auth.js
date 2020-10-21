const express = require("express");
const router = express.Router();
const Repository = require("../repository/inMemoryRepository");
const repository = new Repository();
const User = require("../models/user");
const HTTP_STATUSES = require("../models/httpStatuses");
const HTTP_STATUS_MSG = require("../models/httpStatusMessages");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded();
const jsonParser = express.json();

router.post("/", urlencodedParser, (req, res) => {
    try {

        if (!req.body) return res.status(HTTP_STATUSES.NOT_AUTHORIZED).send(HTTP_STATUS_MSG.NOT_AUTHORIZED_MSG);

        const login = req.body.login;
        const password = req.body.password;

        if (!login) return res.status(HTTP_STATUSES.NOT_AUTHORIZED).send(HTTP_STATUS_MSG.NOT_AUTHORIZED_MSG);
        if (!password) return res.status(HTTP_STATUSES.NOT_AUTHORIZED).send(HTTP_STATUS_MSG.NOT_AUTHORIZED_MSG);

        const user = new User(login, password);
        repository.saveUser(user);

        const records = repository.getRecords();
        return res.redirect("/records");

    } catch (error) {
        return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).send(HTTP_STATUS_MSG.INTERNAL_SERVER_ERROR_MSG);
    }
});

module.exports = router;