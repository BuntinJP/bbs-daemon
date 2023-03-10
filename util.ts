import toml from 'toml';
import fs from 'fs';
import { Config } from './server';

export const loadTomlSettings = (path: string) => {
    return JSON.parse(
        JSON.stringify(toml.parse(fs.readFileSync(path).toString()))
    ) as Config;
};
