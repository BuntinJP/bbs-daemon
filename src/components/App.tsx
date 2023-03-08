import React from 'react';
import './Bootstrap3.css';
import Posts from './Posts';
import Form from './Form';

const App: React.FC = () => {
    return (
        <div className="App">
            <div className="container">
                <h2>掲示板</h2>
                <div className="page-header">
                    <h4>投稿</h4>
                </div>
                <Posts />
                <div className="page-header">
                    <h4>コメントを入力</h4>
                    {/* <FormComp onPost={(e) => this.loadLogs()} /> */}
                    <Form />
                </div>
            </div>
        </div>
    );
};

export default App;
