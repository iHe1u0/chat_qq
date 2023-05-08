const jsonfile = require('jsonfile');
const path = require('path');
const fs = require("fs");

function save(uid, data) {
    jsonfile.writeFile(getHistoryPath(uid), data, (err) => {
        if (err) {
            console.error(err);
        }
    })
}

function read(uid) {
    jsonfile.readFile(getHistoryPath(uid), (err, data) => {
        if (err != null) {
            console.error(err);
            return '{ "role": "", content: "" }'
        }
        else {
            return data;
        }
    });
}

function clear(uid) {
    jsonfile.unlink(getHistoryPath(uid))
}

function getHistoryPath(uid) {
    const path = require('path');
    const root = path.resolve(__dirname, '..');
    const chat = path.join(root, "data", "chat");
    if (!fs.existsSync(chat)) {
        fs.mkdir(chat);
    }
    const filePath = path.join(chat, uid + ".json");
    return filePath;
}

module.exports = { read, save, clear, getHistoryPath }