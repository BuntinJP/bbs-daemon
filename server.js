// mysql
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'buntin',
    root: '3306',
    password: 'bububuntin2687',
    database: 'bbs',
});
connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('success');
});

// サーバー
const express = require('express');
const app = express();
const portNum = 3001;
app.listen(portNum, () => {
    console.log('Server is started', `http://localhost:${portNum}`);
});

app.use('/', express.static('./public'));
app.get('/data', (req, res) => {
    connection.query('select * from log', (error, results) => {
        if (error) throw error;
        console.log(results);
        res.json(results);
    });
});

/* --------------------------------------------------------
API
-------------------------------------------------------- */
// 取得
app.get('/api/getLog', (req, res) => {
    console.log('取得');
    connection.query('select * from log', (error, results) => {
        if (error) {
            sendJSON(res, false, { logs: [], msg: err });
            return;
        }
        sendJSON(res, true, { logs: results });
    });
});

// 書き込み
app.get('/api/post', (req, res) => {
    console.log('書き込み');
    const q = req.query;
    //name
    let writerName = q.name !== '' ? q.name : '名無しさん';

    let id = null;

    connection.query('select count(*) as c from log', (error, results) => {
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
        connection.query(
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
});

app.use((req, res) => {
    res.status(404);
    express.static('./public/404.html');
});
function sendJSON(res, result, obj) {
    obj['result'] = result;
    res.json(obj);
}
