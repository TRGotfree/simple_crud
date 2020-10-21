const express = require("express");
const router = express.Router();
const Repository = require("../repository/inMemoryRepository");
const repository = new Repository();
const Record = require("../models/record");
const HTTP_STATUSES = require("../models/httpStatuses");
const HTTP_STATUS_MSG = require("../models/httpStatusMessages");
const bodyParser = require("body-parser");
const urlencoded = bodyParser.urlencoded();
const jsonParser = express.json();

router.get("/", (req, res) => {
    try {
        return res.render("index.hbs", {records: repository.getRecords()});
    } catch (error) {
        return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).send(HTTP_STATUS_MSG.INTERNAL_SERVER_ERROR_MSG);
    }
});

router.get("/:id", (req, res) => {
    try {

        if (!req.params) return res.status(HTTP_STATUSES.BAD_REQUEST).send(HTTP_STATUS_MSG.BAD_REQUEST_MSG);
        if (!req.params.id) return res.status(HTTP_STATUSES.BAD_REQUEST).send(HTTP_STATUS_MSG.BAD_REQUEST_MSG);

        const id = +req.params.id;
        if (!id || id <= 0) return res.status(HTTP_STATUSES.BAD_REQUEST).send(HTTP_STATUS_MSG.BAD_REQUEST_MSG);

        return res.json(repository.getRecord(req.params.id));

    } catch (error) {
        return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).send(HTTP_STATUS_MSG.INTERNAL_SERVER_ERROR_MSG);
    }
});

router.post("/", urlencoded, (req, res) => {
    try {

        if (!req.body) return res.status(HTTP_STATUSES.BAD_REQUEST).send(HTTP_STATUS_MSG.BAD_REQUEST_MSG);

        const lastRecordId = repository.getLastRecordId();
        const title = req.body.title;
        const description = req.body.description;

        if (!title) return res.status(HTTP_STATUSES.BAD_REQUEST).send(HTTP_STATUS_MSG.BAD_REQUEST_MSG);
        if (!description) return res.status(HTTP_STATUSES.BAD_REQUEST).send(HTTP_STATUS_MSG.BAD_REQUEST_MSG);;

        const record = new Record(lastRecordId + 1, title, description);
        repository.addRecord(record);

        return res.render("index.hbs", {records: repository.getRecords()});

    } catch (error) {
        return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).send(HTTP_STATUS_MSG.INTERNAL_SERVER_ERROR_MSG);
    }
});

router.put("/:id", urlencoded, (req, res) => {
    try {

        if (!req.params || !req.params.id) return res.status(HTTP_STATUSES.BAD_REQUEST).send(HTTP_STATUS_MSG.BAD_REQUEST_MSG);
        if (!req.body) return res.status(HTTP_STATUSES.BAD_REQUEST).send(HTTP_STATUS_MSG.BAD_REQUEST_MSG);

        const id = +req.params.id;
        const title = req.body.title;
        const description = req.body.description;

        if (!id || id <= 0) return res.status(HTTP_STATUSES.BAD_REQUEST).send(HTTP_STATUS_MSG.BAD_REQUEST_MSG);
        if (!title) return res.status(HTTP_STATUSES.BAD_REQUEST).send(HTTP_STATUS_MSG.BAD_REQUEST_MSG);
        if (!description) return res.status(HTTP_STATUSES.BAD_REQUEST).send(HTTP_STATUS_MSG.BAD_REQUEST_MSG);

        const existingRecord = repository.getRecord(id);
        if (!existingRecord) return res.status(HTTP_STATUSES.BAD_REQUEST).send(HTTP_STATUS_MSG.BAD_REQUEST_MSG);

        const record = new Record(id, title, description);
        repository.updateRecord(id, record);

        return res.render("index.hbs", {records: repository.getRecords()});

    } catch (error) {
        return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).send(HTTP_STATUS_MSG.INTERNAL_SERVER_ERROR_MSG);
    }
});

router.delete("/:id", (req, res) => {
    try {

        if (!req.params) return res.status(HTTP_STATUSES.BAD_REQUEST).send(HTTP_STATUS_MSG.BAD_REQUEST_MSG);

        const id = +req.params.id;
        if (!id || id <= 0) return res.status(HTTP_STATUSES.BAD_REQUEST).send(HTTP_STATUS_MSG.BAD_REQUEST_MSG);

        repository.deleteRecord(id);

        return res.render("index.hbs", {records: repository.getRecords()});
        
    } catch (error) {
        return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).send(HTTP_STATUS_MSG.INTERNAL_SERVER_ERROR_MSG);
    }
});

module.exports = router;