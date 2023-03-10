import React from 'react';
import './Bootstrap3.css';
import './App.css';
import Posts from './Posts';

const App: React.FC = () => {
    return (
        <div className="App">
            <div className="container">
                <h2>掲示板</h2>
                <div className="page-header">
                    <h4>投稿</h4>
                </div>
                <Posts />
            </div>
            <footer className="footer">
                <div className="container">
                    <p className="text-muted">
                        All right reserved by{' '}
                        <a href="https://buntin.tech">buntin</a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default App;
