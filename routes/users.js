const express = require("express");
const router = express.Router();
const Repository = require("../repository/inMemoryRepository");
const repository = new Repository();
const User = require("../models/user");
const HTTP_STATUSES = require("../models/httpStatuses");
const HTTP_MESSAGES = require("../models/httpStatusMessages");

router.get("/:id", (req, res) => {
    try {

        if (!req.params) return res.status(HTTP_STATUSES.BAD_REQUEST).send(HTTP_MESSAGES.BAD_REQUEST_MSG);

        const userId = req.params.id;
        if (!userId) return res.status(HTTP_STATUSES.BAD_REQUEST).send(HTTP_MESSAGES.BAD_REQUEST_MSG);

        const user = repository.getUser(userId);

        return res.json(user);
        
    } catch (error) {
        return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).send(HTTP_MESSAGES.INTERNAL_SERVER_ERROR_MSG);
    }
});

module.exports = router;