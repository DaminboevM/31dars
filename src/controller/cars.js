import db from "../database/user.js"

const GetAllCars = async (req, res) => {
    const cars = await db.query('select * from cars')
    res.send(cars.rows)
}

const GetOneCar = async (req, res) => {
    const car = await db.query('select * from cars where id = $1', [req.params.id])
    res.send(car.rows[0])
}

const Post = async (req, res) => {
    const {model, brand, year, price} = req.body
    await db.query('insert into cars (model, brand, year, price) values ($1, $2, $3, $4)', [model, brand, year, price])
    res.send({
        status: 200,
        message: "Car success created"
    })
}

const Put = async (req, res) => {
    try {
        const { id, model, brand, year, price } = req.body
        const result = await db.query('UPDATE cars SET model = $1, brand = $2, year = $3, price = $4 WHERE id = $5', [model, brand, year, price, id])
        
        if (result.rowCount === 0) throw Error("Car not found!")

        res.status(200).send({
            status: 200,
            message: "Car success updated"
        })
    } catch (error) {
        res.status(404).send({
            status: 404,
            error: error.message
        })
    }
}

const DELETE = async (req, res) => {
    const car = await db.query('delete from cars where id = $1', [req.params.id])
    res.status(200).send({
        status: 200,
        message: "Car success deleted"
    })
}

export default {
    GetAllCars,
    GetOneCar,
    Post,
    Put,
    DELETE
}