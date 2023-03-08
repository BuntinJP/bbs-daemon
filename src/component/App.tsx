import React, { Component } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
interface log {
    id: number;
    name: string;
    body: string;
    data: string;
}
interface chatProps {
    length: number;
    items?: log[];
}
type getlog = () => any[];
const loadLogs: getlog = () => {
    let logs: any = [];
    axios.get('/api/getLog').then((data: any) => {
        logs = data.data.logs;
        return logs;
    });
    return logs;
};
const chats = (length: number, items = []) => {
    if (length === 0) {
        return (
            <>
                <p> まだコメントはありません。</p>
            </>
        );
    }
    let chats =
        length !== 0
            ? Array.from(
                  items.map((e: any) => (
                      <div key={e.id}>
                          {e.name}
                          <div className="panel panel-default">
                              <div className="panel-body">{e.body}</div>
                              <div className="panel-footer">{e.date}</div>
                          </div>
                      </div>
                  ))
              )
            : 'まだコメントはありません';
    return chats;
};

const App: React.FC = () => {
    const { items, setItems } = useState<log[]>([]);
    useEffect(() => {
        setItems(loadLogs());
    });
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
                    <FormComp onPost={(e: any) => loadlogs()} />
                </div>
            </div>
        </div>
    );
};

class FormComp extends Component {
    dialog: any;
    props: any;
    setState: any;
    state: any;
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            body: '',
        };
    }
    nameChanged(e: any) {
        this.setState({ name: e.target.value });
    }
    bodyChanged(e: any) {
        this.setState({ body: e.target.value });
    }
    post(e: any) {
        if (this.state.body == '') {
            this.dialog.showAlert('コメントを入力してください！');
            return;
        }
        axios.get('/api/post').then((data: any) => {
            if (data.data.status == 'ok') {
                this.setState({ body: '' });
                if (this.props.onPost) {
                    this.props.onPost();
                }
            } else {
                this.dialog.showAlert('投稿に失敗しました。');
            }
        });
    }
    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="name">名前：</label>
                    <input
                        id="name"
                        className="form-control"
                        style={styles.inputName}
                        type="text"
                        placeholder="名無しさん"
                        value={this.state.name}
                        onChange={(e: any) => this.nameChanged(e)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="comment">コメント：</label>

                    <textarea
                        id="comment"
                        className="form-control"
                        style={styles.textarea}
                        placeholder="コメントを入力してください"
                        value={this.state.body}
                        onChange={(e: any) => this.bodyChanged(e)}
                    ></textarea>
                </div>

                <div className="form-group">
                    <div className="control-label">
                        <p style={styles.right}>
                            <Button onClick={(e: any) => this.post()}>
                                投稿する
                            </Button>
                        </p>
                    </div>
                </div>
                <Dialog
                    ref={(el: any) => {
                        this.dialog = el;
                    }}
                />
            </form>
        );
    }
}

const FormComp2: React.FC = () => {
    const [name, setName] = useState('');
    const [body, setBody] = useState('');
    const nameChanged = (e: any) => {
        setName(e.target.value);
    };
    const bodyChanged = (e: any) => {
        setBody(e.target.value);
    };
    const post = (e: any) => {
        if (body == '') {
            dialog.showAlert('コメントを入力してください！');
            return;
        }
        axios.get('/api/post').then((data: any) => {
            if (data.data.status == 'ok') {
                setBody('');
                if (this.props.onPost) {
                    this.props.onPost();
                }
            } else {
                this.dialog.showAlert('投稿に失敗しました。');
            }
        });
    };
    return (
        <>
            <form>
                <div className="form-group">
                    <label htmlFor="name">名前：</label>
                    <input
                        id="name"
                        className="form-control"
                        style={styles.inputName}
                        type="text"
                        placeholder="名無しさん"
                        value={name}
                        onChange={(e: any) => nameChanged(e)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="comment">コメント：</label>
                    <textarea
                        id="comment"
                        className="form-control"
                        style={styles.textarea}
                        placeholder="コメントを入力してください"
                        value={body}
                        onChange={(e: any) => bodyChanged(e)}
                    ></textarea>
                </div>
            </form>
            <Dialog
                ref={(el) => {
                    this.dialog = el;
                }}
            ></Dialog>
        </>
    );
};

export default App;
