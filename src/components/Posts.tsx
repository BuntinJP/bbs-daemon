import React, { useState, useEffect } from 'react';
import './Bootstrap3.css';
type log = {
    id: number;
    name: string;
    body: string;
    date: string;
};
const testData: log[] = [
    {
        id: 0,
        name: 'test',
        body: 'testmassage\n',
        date: '2023-1-27(金)4:40:13',
    },
    { id: 1, name: 'BUNTIN', body: 'やっと完成', date: '2023-1-27(金)7:54:4' },
    { id: 2, name: 'a', body: 'a\n', date: '2023-1-30(月)15:25:21' },
    {
        id: 3,
        name: '渡辺先生',
        body: '力作をありがとう．colabの課題は全部採点できました．メールもします．内山くんのノートが見えないままで，全部6点にしてあるから，あったら権限を変えるように伝えてください．',
        date: '2023-1-30(月)16:1:25',
    },
    {
        id: 4,
        name: 'あなる',
        body: 'おまんこペロペロ～',
        date: '2023-1-30(月)16:46:40',
    },
    {
        id: 5,
        name: 'あなる',
        body: 'ちんぽこぽこぽこ星人',
        date: '2023-1-30(月)16:47:21',
    },
    {
        id: 6,
        name: 'あー',
        body: 'いくいく野獣',
        date: '2023-1-30(月)17:53:36',
    },
];
const Posts: React.FC = () => {
    const [items, setItems] = useState<log[]>([]);
    useEffect(() => {
        /* fetch('/api/logs')
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
                console.log(data);
            }); */
        setItems(testData);
    }, []);
    return (
        <div>
            {items.map((item) => (
                <>
                    <div key={item.id}>
                        {item.name}
                        <div className="panel panel-default">
                            <div className="panel-body">{item.body}</div>
                            <div className="panel-footer">{item.date}</div>
                        </div>
                    </div>
                </>
            ))}
        </div>
    );
};

export default Posts;
