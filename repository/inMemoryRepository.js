class InMemoryRepository {
    __user = {};
    __records = [
        { id: 1, title: "Новость", description: "У Клары украли коллары!!!" },
        { id: 2, title: "Погода", description: "Погодка сегодня отпад!" }
    ];

    addRecord(record) {
        if (!record)
            throw "Input parameter record couldn't be null or undefined!";

        this.__records.push(record);
    }

    getRecords() {
        return this.__records;
    }

    getRecord(recordId) {
        if (!recordId)
            throw "Input parameter recordId couldn't be null or undefined!";

        return this.__records.find(r => r.id === recordId);
    }

    getLastRecordId() {
        if (!this.__records || this.__records.length === 0)
            return 0;

        return this.__records[this.__records.length - 1].id;
    }

    updateRecord(id, record) {

        if (!id)
            throw "Input parameter id not set";

        if (!record)
            throw "Input parameter record couldn't be null or undefined!";

        const index = this.__records.findIndex(r => r.id === id);
        this.__records[index] = record;

        return record;
    }

    deleteRecord(recordId) {
        if (!recordId)
            throw "Input parameter recordId couldn't be null or undefined!";

        this.__records = this.__records.filter(r => r.id !== recordId);
    }

    saveUser(user) {
        if (!user)
            throw "Input parameter user couldn't be null or undefined!";

        this.__user = user;
    }

    getUser(id) {
        return this.__user;
    }
}

module.exports = InMemoryRepository;