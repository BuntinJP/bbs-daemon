import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import { Button } from 'react-bootstrap';
import FormComp from './FormComp.js';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }
    componentWillMount() {
        this.loadLogs();
    }
    loadLogs() {
        request.get('/api/getLog').end((err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            this.setState({ items: data.body.logs });
        });
    }
    render() {
        console.log(this.state.items.length);
        let chats =
            this.state.items.length !== 0
                ? this.state.items.map((e) => (
                      <div key={e.id}>
                          {e.name}
                          <div className="panel panel-default">
                              <div className="panel-body">{e.body}</div>
                              <div className="panel-footer">{e.date}</div>
                          </div>
                      </div>
                  ))
                : 'まだコメントはありません';
        return (
            <div className="container">
                <h2>掲示板</h2>
                <div className="page-header">
                    <h4>投稿</h4>
                </div>
                {chats}
                <div className="panel panel-default">
                    <div className="panel-heading">コメントを入力する</div>
                    <div className="panel-body">
                        <FormComp onPost={(e) => this.loadLogs()} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
