import db from "../database/user.js"

const GetAllMevalar = async (req, res) => {
    const mevalar = await db.query('select * from mevalar')
    res.send(mevalar.rows)
}

const GetOneMeva = async (req, res) => {
    const meva = await db.query('select * from mevalar where id = $1', [req.params.id])
    res.send(meva.rows[0])
}

const Post = async (req, res) => {
    const {name, color, price} = req.body
    await db.query('insert into mevalar (name, color, price) values ($1, $2, $3)', [name, color, price])
    res.send({
        status: 200,
        message: "Meva successfully created"
    })
}

const Put = async (req, res) => {
    try {
        const { id, name, color, price } = req.body
        const result = await db.query('UPDATE mevalar SET name = $1, color = $2, price = $3 WHERE id = $4', [name, color, price, id])
        
        if (result.rowCount === 0) throw Error("Meva not found!")

        res.status(200).send({
            status: 200,
            message: "Meva successfully updated"
        })
    } catch (error) {
        res.status(404).send({
            status: 404,
            error: error.message
        })
    }
}

const DELETE = async (req, res) => {
    const meva = await db.query('delete from mevalar where id = $1', [req.params.id])
    res.status(200).send({
        status: 200,
        message: "Meva successfully deleted"
    })
}

export default {
    GetAllMevalar,
    GetOneMeva,
    Post,
    Put,
    DELETE
}