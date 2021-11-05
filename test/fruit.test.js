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
        await pool.query("delete from fruit_basket");
    });

    it('should add a new fruit basket', async function () {
        await fruitTest.addingNewBasket("Peaches", 5, 3)
        await fruitTest.findingBasketOfFruit("Peaches")

        assert.equal(["Peaches", 5, 3], await fruitTest.findingBasketOfFruit("Peaches"));

    });

    after(function () {
        pool.end();
    })
});