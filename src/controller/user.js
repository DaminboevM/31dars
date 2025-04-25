import db from "../database/user.js"


const GetAllUsers = async (req, res) => {
    const users = await db.query('select * from users')
    res.send(users.rows)
}


const GetOneUser = async (req, res) => {
    const users = await db.query('select * from users where id = $1', [req.params.id])
    res.send(users.rows[0])
}


const Post = async (req, res) => {
    const {name, age, username, gender} = req.body
    await db.query('insert into users (name, age, username, gender) values ($1, $2, $3, $4)', [name, age, username, gender])
    res.send({
        status: 200,
        message: "user sucsses created"
    })
}



const Put = async (req, res) => {
    try {
        const { id, name, age, username, gender } = req.body
        const result = await db.query('UPDATE users SET name = $1, age = $2, username = $3, gender = $4 WHERE id = $5',[name, age, username, gender, id])
        
        if (result.rowCount === 0) throw Error("User not found !")

        res.status(200).send({
            status: 200,
            message: "User successfully updated"
        })
    } catch (error) {
        res.status(404).send({
            status: 404,
            error: error.message
        })
    }
}


const DELETE = async (req, res) => {
    const user = await db.query('delete from users where id = $1',[req.params.id])
    res.status(200).send({
        status: 200,
        message: "User sucsses deleted"
    })
}


export default {
    GetAllUsers,
    GetOneUser,
    Post,
    Put,
    DELETE
}