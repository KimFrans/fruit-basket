const { Pool } = require("pg");

module.exports = function fruitBaskets(pool) {

    async function addingNewBasket(fruitName, fruitQuantity, fruitPrice){
        console.log(typeof fruitName, typeof fruitQuantity, typeof fruitPrice);

        const dbFruit = await pool.query('SELECT * FROM fruit_basket WHERE fruit_name = $1', [fruitName]);
        if(dbFruit.rows.length === 0){
            await pool.query("INSERT INTO fruit_basket(fruit_name, quantity, price) values($1, $2, $3)", [fruitName, fruitQuantity,fruitPrice])
        }
      await updateFruitCount(fruitName)
        console.log(dbFruit)
    }

    async function findingBasketOfFruit(fruit){
        const findFruit = await pool.query('SELECT * fruit_basket WHERE fruit_name = $1', [fruit])
        // console.log(findFruit.rows[0]);
        return findFruit.rows
    }

    async function updateFruitCount(fruitName){
        const updateCount = await pool.query('UPDATE fruit_basket SET quantity = quantity + 1 WHERE fruit_name = $1', [fruitName])
    }

    async function totalFruitCount(singleFruit){
        const totalCount = await pool.query('SELECT quantity from fruit_basket WHERE fruit_name = $1', [singleFruit])
    }

    async function totalFruitBaskets(totalFruit){
        const totalCount = await pool.query('SELECT sum(quantity) fruit_basket WHERE fruit_name = $1', [totalFruit])
    }


    return{
        addingNewBasket,
        findingBasketOfFruit,
        updateFruitCount,
        totalFruitCount,
        totalFruitBaskets,
    }


}