import classes from "./PostList.module.css";
import {Component} from "react";
import Post from "../Post/Post";
import {deleteRequest, getRequest, postRequest} from '../../../utils/Requests'

export default class PostList extends Component {
    constructor(props) {
        super(props)
        this.state = {posts: []}
    }

    componentDidMount() {
        const btn = document.getElementById('postSubmit')
        btn.addEventListener('click', () => this.handleNewPost())

        getRequest('http://localhost:5000/posts').then(
            data => {
                const posts = data.posts.map((el) =>
                    <Post message={el.message} id={el.id} key={el.id}
                          handle={this.handleDelPost.bind(this, el.id)}/>
                )
                this.setState({posts})
            }
        )
    }

    handleNewPost() {
        const newPost = document.getElementById('postArea')
        if (newPost.value.length === 0) {
            alert('Write some text before sending!')
            return
        }

        const posts = this.state.posts
        posts.unshift(<Post message={newPost.value.slice(0, 255)} id={posts.length} key={posts.length}
                            handle={this.handleDelPost.bind(this, posts.length)}/>)

        postRequest('http://localhost:5000/posts',
            {
                post: newPost.value.slice(0, 255),
                id: posts.length - 1
            }).then(r => console.log(`postRequest status -> ok: ${r.ok}`))
        console.log(`post data on server id: ${posts.length}`)
        console.log(posts)

        const newState = {posts}
        this.setState(newState)
        newPost.value = null
    }

    handleDelPost(index) {
        deleteRequest('http://localhost:5000/posts',
            {
                id: index
            }).then(r => console.log(`deleteRequest status -> ok: ${r.ok}`))

        const posts = this.state.posts.filter(el => Number(el.key) !== index)
        this.setState({posts})
    }

    render() {
        return (
            <div className={classes.posts_wrapper}>
                {this.state.posts}
            </div>
        );
    }
}