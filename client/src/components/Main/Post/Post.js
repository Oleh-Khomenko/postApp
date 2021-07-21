import classes from "./Post.module.css";
import {Component} from "react";


export default class Post extends Component {
    render() {
        return (
            <div className={classes.post_wrapper} key={`post${this.props.id}`}>
                <div className={classes.post}>
                    {this.props.message ?? 'POST!'}
                </div>
                <button className={classes.delete_post_btn} onClick={this.props.handle}>X</button>
            </div>
        );
    }

}