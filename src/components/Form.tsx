import React, { useState } from 'react';
import './Bootstrap3.css';
import { voidPromise } from './type';

type formprops = {
    set: voidPromise;
};
interface postdata {
    name: string;
    body: string;
}
const Form: React.FC<formprops> = ({ set }) => {
    const [name, setName] = useState<string>('');
    const [body, setBody] = useState<string>('');
    return (
        <form>
            <div className="form-group">
                <label htmlFor="name">名前</label>
                <input
                    id="name"
                    className="form-control"
                    type="text"
                    placeholder="ぶんちんの配下"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="comment">コメント：</label>
                <textarea
                    id="comment"
                    className="form-control"
                    placeholder="コメントを入力してください"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
            </div>
            <div className="form-group">
                <div className="control-label">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            post({ name: name, body: body })
                                .then(() => {
                                    setName(name);
                                    setBody('');
                                    set();
                                })
                                .catch((err) => {});
                        }}
                    >
                        投稿
                    </button>
                </div>
            </div>
        </form>
    );
};

const post = async (data: postdata) => {
    fetch('/api', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return error;
        });
};

export default Form;
