type log = {
    id: number;
    name: string;
    body: string;
    date: string;
};
type loadlog = () => Promise<log[]>;

type voidPromise = () => Promise<void>;

const load: loadlog = async () => {
    const response = await fetch('/api');
    const data = await response.json();
    const logs: log[] = await data.logs;
    return logs;
};
export type { log, loadlog, voidPromise };
export { load };
