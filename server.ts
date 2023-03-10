import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import toml from 'toml';
import fs from 'fs';

interface Config {
    host: string;
    user: string;
    password: string;
    database: string;
}
interface Outdata {
    [key: string]: any;
}

const loadTomlSettings = (path: string) => {
    return JSON.parse(
        JSON.stringify(toml.parse(fs.readFileSync(path).toString()))
    ) as Config;
};

// express server configuration
const app: express.Express = express();
const portNum = 3001;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const config: Config = loadTomlSettings('config.toml');
app.listen(portNum, () => {
    console.log(app.name);
    console.log(
        'Server is started',
        `http://localhost:${portNum}`,
        '\n https://bbs.buntin.tech'
    );
});
app.use('/', express.static('./public'));
app.get('/api', (_req: Request, res: Response) => {
    console.log('取得');
    let c = mysql.createConnection(config);
    c.connect();
    c.query('select * from log', (error, results: mysql.RowDataPacket[]) => {
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
app.post('/api', (req: Request, res: Response) => {
    console.log('書き込み');
    const b = req.body;
    let writerName = b.name !== '' ? b.name : '名無しさん';
    if (b.body === '') {
        return;
    }
    let c = mysql.createConnection(config);
    c.query(
        'select count(*) as c from log',
        (error, results: mysql.RowDataPacket[]) => {
            if (error) throw error;
            const id: number = results[0].c;
            let d = new Date();
            let date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}(${['日', '月', '火', '水', '木', '金', '土'][d.getDay()]
                })${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`.replace(
                    /\n|\r/g,
                    ''
                );
            c.query(
                'INSERT INTO log VALUES (?, ?, ?, ?)',
                [id, writerName, b.body, date],
                (error, _results) => {
                    if (error) {
                        console.error(error);
                        sendJSON(res, false, { msg: error });
                        c.end();
                    }
                    sendJSON(res, true, {});
                    c.end();
                    console.log('書き込み完了');
                }
            );
        }
    );
});

app.use((_req, res) => {
    res.status(404);
    express.static('./public/404');
});
const sendJSON = (res: express.Response, result: boolean, obj: Outdata) => {
    obj['result'] = result;
    res.json(obj);
};

export type { Config };
