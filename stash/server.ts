import fs from 'fs';
import mysql2 from 'mysql2';
import express from 'express';
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

const app = express();
app.listen(portNum, () => {
    console.log(`Listening on port ${portNum}`);
});
