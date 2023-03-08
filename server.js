// mysql
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const mysql = require('mysql2');
const connection = mysql.createConnection(config);

// サーバー
const express = require('express');
const app = express();
const portNum = 3001;
app.listen(portNum, () => {
    console.log('Server is started', `http://localhost:${portNum}`);
});

app.use('/', express.static('./public'));
app.get('/data', (req, res) => {
    let c = mysql.createConnection(config);
    c.connect();
    c.query('select * from log', (error, results) => {
        if (error) throw error;
        console.log(results);
        res.json(results);
    });
    c.end();
});

/* --------------------------------------------------------
API
-------------------------------------------------------- */
// 取得
app.get('/api/getLog', (req, res) => {
    console.log('取得');
    let c = mysql.createConnection(config);
    c.connect();
    c.query('select * from log', (error, results) => {
        if (error) {
            sendJSON(res, false, { logs: [], msg: error });
            return;
        }
        sendJSON(res, true, { logs: results });
<<<<<<< HEAD
=======
        c.end();
        console.log(results);
>>>>>>> 7e6db13 (とりま)
    });
    c.end();
});

// 書き込み
app.get('/api/post', (req, res) => {
    console.log('書き込み');
    const q = req.query;
    //name
    let writerName = q.name !== '' ? q.name : '名無しさん';
    let id = null;
    let c = mysql.createConnection(config);
    c.query('select count(*) as c from log', (error, results) => {
        if (error) throw error;
        id = results[0].c;
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
            [id, writerName, q.body, date],
            (error, results) => {
                if (error) {
                    console.error(error);
                    sendJSON(res, false, { msg: err });
                    return;
                }
                sendJSON(res, true, {});
            }
        );
    });
    c.end();
});

app.use((req, res) => {
    res.status(404);
    express.static('./public/404.html');
});
function sendJSON(res, result, obj) {
    obj['result'] = result;
    res.json(obj);
}
