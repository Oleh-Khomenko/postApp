import classes from "./Main.module.css";
import PostList from "./PostList/PostList";
import {Component} from "react";

const style = {
    marginTop: '80px',
    marginBottom: '40px',
    color: 'whitesmoke',
    textShadow: '#bf0a0a 1px 0 10px',
}

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {signs: 0}
    }

    componentDidMount() {
        this.textCounterEvent()
        this.textTabulationEvent()
    }

    textCounterEvent() {
        const textArea = document.getElementById('postArea')
        addEventListenerMulti(textArea, 'keyup keydown', () => {
            if (textArea.value.length > 255) {
                textArea.value = textArea.value.slice(0, 255)
            }
            this.setState({signs: textArea.value.length})
        })
    }

    textTabulationEvent() {
        document.getElementById('postArea').addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;

                // set textarea value to: text before caret + tab + text after caret
                this.value = this.value.substring(0, start) +
                    '    ' + this.value.substring(end);

                // put caret at right position again
                this.selectionStart =
                    this.selectionEnd = start + 4;
            }
        });
    }

    render() {
        return (
            <main className={classes.main_wrapper}>

                {/*content wrapper begin*/}
                <div className={classes.content_wrapper}>
                    <h1 style={style}>Add new post!</h1>
                    {/*post form begin*/}
                    <div className={classes.post_form}>
                        <textarea className={classes.post_text} id={'postArea'}/>
                        <div className={classes.post_control}>
                            <button className={classes.post_submit} id={'postSubmit'}
                                    onClick={() => this.setState({signs: 0})}>
                                Send
                            </button>
                            <div className={classes.signs_counter}>
                                {this.state.signs} \ 255
                            </div>
                        </div>
                    </div>
                    {/*post form end*/}

                    {/*posts wrapper begin*/}
                    <PostList posts={this.state.posts}/>
                    {/*posts wrapper end*/}

                </div>
                {/*content wrapper end*/}
            </main>
        );
    }
}

function addEventListenerMulti(o, events, callback) {
    for (const el of events.split(' ')) {
        o.addEventListener(el, callback)
    }
}