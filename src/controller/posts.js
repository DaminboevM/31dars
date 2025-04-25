import db from "../database/user.js"

const GetAllPosts = async (req, res) => {
    const posts = await db.query('select * from posts')
    res.send(posts.rows)
}

const GetOnePost = async (req, res) => {
    const post = await db.query('select * from posts where id = $1', [req.params.id])
    res.send(post.rows[0])
}

const Post = async (req, res) => {
    const {title, content} = req.body
    await db.query('insert into posts (title, content) values ($1, $2)', [title, content])
    res.send({
        status: 200,
        message: "Post success created"
    })
}

const Put = async (req, res) => {
    try {
        const { id, title, content } = req.body
        const result = await db.query('UPDATE posts SET title = $1, content = $2 WHERE id = $3',[title, content, id])
        
        if (result.rowCount === 0) throw Error("Post not found!")

        res.status(200).send({
            status: 200,
            message: "Post success updated"
        })
    } catch (error) {
        res.status(404).send({
            status: 404,
            error: error.message
        })
    }
}

const DELETE = async (req, res) => {
    const post = await db.query('delete from posts where id = $1', [req.params.id])
    res.status(200).send({
        status: 200,
        message: "Post success deleted"
    })
}

export default {
    GetAllPosts,
    GetOnePost,
    Post,
    Put,
    DELETE
}