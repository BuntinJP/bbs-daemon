"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mysql2_1 = __importDefault(require("mysql2"));
const toml_1 = __importDefault(require("toml"));
const fs_1 = __importDefault(require("fs"));
const loadTomlSettings = (path) => {
    return JSON.parse(JSON.stringify(toml_1.default.parse(fs_1.default.readFileSync(path).toString())));
};
// express server configuration
const app = (0, express_1.default)();
const portNum = 3001;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
const config = loadTomlSettings('config.toml');
app.listen(portNum, () => {
    console.log(app.name);
    console.log('Server is started', `http://localhost:${portNum}`, '\n https://bbs.buntin.tech');
});
app.use('/', express_1.default.static('./public'));
app.get('/api', (_req, res) => {
    console.log('取得');
    let c = mysql2_1.default.createConnection(config);
    c.connect();
    c.query('select * from log', (error, results) => {
        if (error) {
            sendJSON(res, false, { logs: [], msg: error });
            return;
        }
        sendJSON(res, true, { logs: results });
        c.end();
        console.log('取得完了');
    });
});
// 書き込み
app.post('/api', (req, res) => {
    console.log('書き込み');
    const b = req.body;
    let writerName = b.name !== '' ? b.name : '名無しさん';
    if (b.body === '') {
        return;
    }
    let c = mysql2_1.default.createConnection(config);
    c.query('select count(*) as c from log', (error, results) => {
        if (error)
            throw error;
        const id = results[0].c;
        let d = new Date();
        let date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}(${['日', '月', '火', '水', '木', '金', '土'][d.getDay()]})${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`.replace(/\n|\r/g, '');
        c.query('INSERT INTO log VALUES (?, ?, ?, ?)', [id, writerName, b.body, date], (error, _results) => {
            if (error) {
                console.error(error);
                sendJSON(res, false, { msg: error });
                c.end();
            }
            sendJSON(res, true, {});
            c.end();
            console.log('書き込み完了');
        });
    });
});
app.use((_req, res) => {
    res.status(404);
    express_1.default.static('./public/404');
});
const sendJSON = (res, result, obj) => {
    obj['result'] = result;
    res.json(obj);
};
