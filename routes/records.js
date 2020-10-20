const express = require("express");
const router = express.Router();
const Repository = require("../repository/inMemoryRepository");
const repository = new Repository();
const Record = require("../models/record");
const HTTP_STATUSES = require("../routes/httpStauses");

router.get("/records", (req, res) => {
    try {
        return res.json(repository.getRecords());
    } catch (error) {
        return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    }
});

router.get("/records/:id", (req, res) => {
    try {

        return res.json(repository.getRecord(req.params.id));

    } catch (error) {
        return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    }
});

router.post("/records", (req, res) => {
    try {

        const lastRecordId = repository.getLastRecordId();
        const title = req.body?.title;
        const description = req.body?.description;

        if (!title) return res.status(HTTP_STATUSES.BAD_REQUEST);
        if (!description) return res.status(HTTP_STATUSES.BAD_REQUEST);

        const record = new Record(lastRecordId + 1, title, description);
        repository.addRecord(record);

        return res.json(record);

    } catch (error) {
        return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    }
});

router.put("/records/:id", (req, res) => {
    try {
        const id = req.params.id;
        const title = req.body?.title;
        const description = req.body?.description;

        if (!id) return res.status(HTTP_STATUSES.BAD_REQUEST);
        if (!title) return res.status(HTTP_STATUSES.BAD_REQUEST);
        if (!description) return res.status(HTTP_STATUSES.BAD_REQUEST);

        const existingRecord = repository.getRecord(id);
        if (!existingRecord) return res.status(HTTP_STATUSES.BAD_REQUEST);

        const record = new Record(id, title, description);
        repository.updateRecord(id, record);

        return res.json(record);

    } catch (error) {
        return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    }
});

router.delete("/records/:id", (req, res) => {
    try {

        const id = req.params.id;
        if (!id) return res.status(HTTP_STATUSES.BAD_REQUEST);

        repository.deleteRecord(id);

        return res.status(HTTP_STATUSES.NO_CONTENT);
        
    } catch (error) {
        return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    }
});
