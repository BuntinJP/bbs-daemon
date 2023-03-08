import React, { useState } from 'react';
import './Bootstrap3.css';

/* type formprops = {
    onPost: (e: React.FormEvent<HTMLFormElement>) => void;
}; */

//const Form: React.FC<formprops> = ({ onPost }) => {
const Form: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [showDialog, setShowDialog] = useState<boolean>(false);
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
                    <button className="btn btn-primary">投稿</button>
                </div>
            </div>
        </form>
    );
};

const post = () => {
    console.log('post');
    return;
};

export default Form;
