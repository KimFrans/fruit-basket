const { Pool } = require("pg");

module.exports = function fruitBaskets(pool) {

    async function addingNewBasket(fruitName, fruitQuantity, fruitPrice){
        // await pool.query("INSERT INTO fruit_basket(fruit_name, quantity, price) values($1, $2, $3)", [fruitName, fruitQuantity,fruitPrice])
        // console.log(typeof fruitName, typeof fruitQuantity, typeof fruitPrice);

        const dbFruit = await pool.query('select * from fruit_basket');
        if(dbFruit.rows.length === 0){
            await pool.query("INSERT INTO fruit_basket(fruit_name, quantity, price) values($1, $2, $3)", [fruitName, fruitQuantity,fruitPrice])
        }
        // else{
        //     await updateFruitCount(fruitName)
        // }
      
        // console.log(dbFruit)
    }

    async function findingBasketOfFruit(fruit){
        const findFruit = await pool.query('SELECT fruit_name, quantity, price FROM fruit_basket WHERE fruit_name = $1', [fruit])
                                            
        // console.log(findFruit.rows);
        return findFruit.rows
    }

    async function updateFruitCount(fruitQuantity, fruitName){
        
        const updateCount = await pool.query('UPDATE fruit_basket SET quantity = quantity + $1 WHERE fruit_name = $2', [fruitQuantity, fruitName])
        // console.log(updateCount.rows[0].quantity);
        return updateCount.rows
    }

    async function totalFruitCount(singleFruit){
        const totalCount = await pool.query('SELECT quantity FROM fruit_basket WHERE fruit_name = $1', [singleFruit])
        // console.log(totalCount);
        return totalCount.rows
    }

    async function totalFruitBaskets(totalFruit){
        const totalCount = await pool.query('SELECT (quantity*price) AS total FROM fruit_basket WHERE fruit_name = $1', [totalFruit])
        return totalCount.rows
    }


    return{
        addingNewBasket,
        findingBasketOfFruit,
        updateFruitCount,
        totalFruitCount,
        totalFruitBaskets,
    }


}