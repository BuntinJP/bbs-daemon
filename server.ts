import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
// import nedb promises
import Datastore from 'nedb-promises';

interface Outdata {
    [key: string]: any;
}

// express server configuration
const app: Express = express();
const portNum = 3001;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

interface Log {
    id: number;
    name: string;
    body: string;
    date: string;
}
//set db
const datastore = Datastore.create('./db/log.db');

app.listen(portNum, () => {
    console.log(app.name);
    console.log(
        'Server is started',
        `http://localhost:${portNum}`,
        '\n https://bbs.buntin.xyz'
    );
});

// host static files
app.use('/', express.static('./public'));


// GET 
app.get('/api', async (_req: Request, res: Response) => {
    console.log('取得');
    const logs: Log[] = await datastore.find({});
    //sort by logs.id
    logs.sort((a, b) => {
        return a.id - b.id;
    });
    sendJSON(res, true, { logs });
    console.log('取得完了');
});

// POST
app.post('/api', async (req: Request, res: Response) => {
    console.log('書き込み');
    const id = await datastore.count({});
    const b = req.body;
    let writerName = b.name !== '' ? b.name : '名無しさん';
    if (b.body === '') {
        return;
    }
    let d = new Date();
    let date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}(${['日', '月', '火', '水', '木', '金', '土'][d.getDay()]
        })${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`.replace(
            /\n|\r/g,
            ''
        );
    const log = await datastore.insert({
        id: id,
        name: writerName,
        body: b.body,
        date: date,
    });
    sendJSON(res, true, { log });
    console.log('書き込み完了');
});

app.use((_req, res) => {
    res.status(404);
    express.static('./public/404');
});
const sendJSON = (res: express.Response, result: boolean, obj: Outdata) => {
    obj['result'] = result;
    res.json(obj);
};

