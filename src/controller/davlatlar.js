import db from "../database/user.js"

const GetAllDavlatlar = async (req, res) => {
    const davlatlar = await db.query('select * from davlatlar')
    res.send(davlatlar.rows)
}

const GetOneDavlat = async (req, res) => {
    const davlat = await db.query('select * from davlatlar where id = $1', [req.params.id])
    res.send(davlat.rows[0])
}

const Post = async (req, res) => {
    const {name, population, continent} = req.body
    await db.query('insert into davlatlar (name, population, continent) values ($1, $2, $3)', [name, population, continent])
    res.send({
        status: 200,
        message: "Davlat successfully created"
    })
}

const Put = async (req, res) => {
    try {
        const { id, name, population, continent } = req.body
        const result = await db.query('UPDATE davlatlar SET name = $1, population = $2, continent = $3 WHERE id = $4', [name, population, continent, id])
        
        if (result.rowCount === 0) throw Error("Davlat not found!")

        res.status(200).send({
            status: 200,
            message: "Davlat successfully updated"
        })
    } catch (error) {
        res.status(404).send({
            status: 404,
            error: error.message
        })
    }
}

const DELETE = async (req, res) => {
    const davlat = await db.query('delete from davlatlar where id = $1', [req.params.id])
    res.status(200).send({
        status: 200,
        message: "Davlat successfully deleted"
    })
}

export default {
    GetAllDavlatlar,
    GetOneDavlat,
    Post,
    Put,
    DELETE
}