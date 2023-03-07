// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import ReactDOM from 'react-dom';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'supe... Remove this comment to see the full error message
import request from 'superagent';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Button } from 'react-bootstrap';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import Dialog from 'react-bootstrap-dialog';

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
        request
            .get('/api/post')
            .query({
                name: this.state.name,
                body: this.state.body,
            })
            .end((err: any, data: any) => {
                if (err) {
                    console.error(err);
                }
                this.setState({ body: '' });
                if (this.props.onPost) {
                    this.props.onPost();
                }
            });
    }
    render() {
        return (
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <form>
                // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                <div className="form-group">
                    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                    <label htmlFor="name">名前：</label>
                    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                    <input
                        id="name"
                        className="form-control"
                        style={styles.inputName}
                        type="text"
                        placeholder="名無しさん"
                        value={this.state.name}
                        onChange={(e: any) => this.nameChanged(e)}
                    />
                // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                </div>
                // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                <div className="form-group">
                    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                    <label htmlFor="comment">コメント：</label>
                    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                    <textarea
                        id="comment"
                        className="form-control"
                        style={styles.textarea}
                        maxLength="10000"
                        placeholder="コメントを入力してください"
                        value={this.state.body}
                        onChange={(e: any) => this.bodyChanged(e)}
                    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                    ></textarea>
                // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                </div>
                // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                <div className="form-group">
                    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                    <div className="control-label">
                        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                        <p style={styles.right}>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <Button onClick={(e: any) => this.post()}>
                                投稿する
                            </Button>
                        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                        </p>
                    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                    </div>
                // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                </div>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Dialog
                    ref={(el: any) => {
                        this.dialog = el;
                    }}
                />
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            </form>
        );
    }
}

// スタイルを定義
const styles = {
    right: {
        textAlign: 'right',
    },
    inputName: {
        width: 200,
    },
    textarea: {
        minHeight: 100,
        maxHeight: 350,
        height: 100,
        width: '100%',
        padding: 10,
    },
};

export default FormComp;
