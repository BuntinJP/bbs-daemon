import React, { useState, useEffect } from 'react';
import './Bootstrap3.css';
import Form from './Form';
import { log, load, voidPromise } from './type';

const Posts: React.FC = () => {
    const [items, setItems] = useState<log[]>([]);
    const reload: voidPromise = async () => {
        setItems(await load());
    };
    useEffect(() => {
        reload();
    }, []);
    return (
        <>
            {/* 以下チャットログ表示部*/}
            <div>
                {items.map((item) => (
                    <div key={`${item.id}`}>
                        {item.name}
                        <div className="panel panel-default">
                            <div className="panel-body">{item.body}</div>
                            <div className="panel-footer">{item.date}</div>
                        </div>
                    </div>
                ))}
            </div>
            {/* 以下フォーム部分*/}
            <div className="page-header">
                <h4>コメントを入力</h4>
                <Form set={reload} />
            </div>
        </>
    );
};

export default Posts;
