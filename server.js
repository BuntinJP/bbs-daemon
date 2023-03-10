// mysql
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// サーバー
const express = require('express');
const app = express();
const portNum = 3001;
// urlencodedとjsonは別々に初期化する
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());
app.listen(portNum, () => {
    console.log('Server is started', `http://localhost:${portNum}`);
});
app.use('/', express.static('./dist'));
/* --------------------------------------------------------
API
-------------------------------------------------------- */
// 取得
app.get('/api', (req, res) => {
    console.log('取得');
    let c = mysql.createConnection(config);
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
    let c = mysql.createConnection(config);
    c.query('select count(*) as c from log', (error, results) => {
        if (error) throw error;
        const id = results[0].c;
        let d = new Date();
        //[ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek]
        let date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}(${
            ['日', '月', '火', '水', '木', '金', '土'][d.getDay()]
        })${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`.replace(
            /\n|\r/g,
            ''
        );
        c.query(
            'INSERT INTO log VALUES (?, ?, ?, ?)',
            [id, writerName, b.body, date],
            (error, results) => {
                if (error) {
                    console.error(error);
                    sendJSON(res, false, { msg: err });
                    c.end();
                }
                sendJSON(res, true, {});
                c.end();
                console.log('書き込み完了');
            }
        );
    });
});

app.use((req, res) => {
    res.status(404);
    express.static('./public/404.html');
});
const sendJSON = (res, result, obj) => {
    obj['result'] = result;
    res.json(obj);
};
