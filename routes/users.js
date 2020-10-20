const express = require("express");
const router = express.Router();
const Repository = require("../repository/inMemoryRepository");
const repository = new Repository();
const User = require("../models/user");
const HTTP_STATUSES = require("../routes/httpStauses");

router.get("/users/:id", (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) return res.status(HTTP_STATUSES.BAD_REQUEST);

        const user = repository.getUser(userId);

        return res.json(user);
        
    } catch (error) {
        return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    }
});