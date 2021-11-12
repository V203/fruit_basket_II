const assert = require('assert');
const ServicesFactory = require('../servicesFactory');
const pg = require('pg');
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/fruitdbii';
const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

describe("Fruits basket v.II",async ()=>{

    var counter = 1
    beforeEach(async ()=>{
        console.log(`******** test No ${counter++} ***********`)
        await pool.query('delete  from fruit_basket_item')
    })

    it("We should be able to add to the basket and retrieve A number of fruuits",async ()=>{

        let serve = ServicesFactory(pool);
        await serve.addToBakset('pear',2.00);
        await serve.addToBakset('pear',2.00);
        await serve.addToBakset('orange',1.50);

        let actual = await serve.getAllFromBasket();
        let expected = [{fruit_price: '2.00',fruit_qty: 2,fruit_type: 'pear'},{ fruit_price: "1.50",fruit_qty: 1,fruit_type: "orange"}];
        assert.deepStrictEqual(expected,actual);

    })

    it(`We should add following fruits in the basket 
        A orange,grapes and A pear in the basket 
        and then remove the pear and the grapes 
        return an orange`,
        async ()=>{

            let serve = ServicesFactory(pool);

            await serve.addToBakset("grapes",5.99);
            await serve.addToBakset("pear",2.00);
            await serve.addToBakset("orange",1.50);

            await serve.removeFruitFromBaset("grapes");
            await serve.removeFruitFromBaset("pear");

            let expected = [{fruit_price: '1.50',fruit_qty: 1,fruit_type: 'orange'}]
            let actual = await serve.getAllFromBasket();

            assert.deepStrictEqual(expected,actual);
        })


})