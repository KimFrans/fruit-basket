const assert = require('assert');
const fruits = require('../fruit-factory');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/fruitbasket-test';

const pool = new Pool({
    connectionString
});

const fruitTest = fruits(pool)


describe('The fruit basket web app', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from fruit_basket;");
    
    });

    it('should add a new fruit basket and find the fruit', async function () {
        await fruitTest.addingNewBasket("Peaches", 5, 3)

        assert.deepEqual([{fruit_name: "Peaches", quantity: 5, price: 3}], await fruitTest.findingBasketOfFruit("Peaches"));

    });
    it('should update the fruit count', async function () {
        await fruitTest.addingNewBasket("Strawberries", 5, 3)
        await fruitTest.addingNewBasket("Apples", 10, 5)
        
        await fruitTest.updateFruitCount(5, "Strawberries")

        assert.deepEqual([{fruit_name: "Strawberries", price: '3.00', quantity: 10}], await fruitTest.findingBasketOfFruit("Strawberries"));

    });
    it('should get the sum of a single fruit basket', async function () {
        await fruitTest.addingNewBasket("Peaches", 5, 3)
        

        assert.deepEqual([{quantity: 5}], await fruitTest.totalFruitCount('Peaches'));

    });
    it('should show the sum of the total of the fruit baskets for a given fruit type', async function () {
        await fruitTest.addingNewBasket("Grapes", 10, 5)
        // await fruitTest.addingNewBasket("Grapes", 6, 8)

        assert.deepEqual([{total: 50.00}], await fruitTest.totalFruitBaskets('Grapes'));

    });

    after(function () {
        pool.end();
    })
});