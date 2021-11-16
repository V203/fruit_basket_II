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
        await serve.addToBakset('fuji',2.00);
        await serve.addToBakset('golden_delicious',2.00);
        await serve.addToBakset('top_red',1.50);

        let actual = await serve.getAllFromBasket();
        let expected = [{fruit_type: 'fuji', fruit_qty: 1, fruit_price: '2.00',multi_fruit_basket_id:3},{ fruit_price: "2.00",fruit_qty: 1,fruit_type: "golden_delicious",multi_fruit_basket_id:2},{ fruit_price: "1.50",fruit_qty: 1,fruit_type: "top_red",multi_fruit_basket_id:4}];
        
        assert.deepStrictEqual(expected,actual);

    })

    it(`We should add following fruits in the basket 
        A orange,grapes and A pear in the basket 
        and then remove the pear and the grapes 
        return an orange`,
        async ()=>{

            let serve = ServicesFactory(pool);

            await serve.addToBakset("fuji",2.00);
            await serve.addToBakset("top_red",2.00);
            await serve.addToBakset("fuji",2.00);

            await serve.removeFruitFromBaset("fuji");
            await serve.removeFruitFromBaset("fuji");

            let expected = [{fruit_price: '2.00',fruit_qty: 1,fruit_type: 'top_red',multi_fruit_basket_id:4}]
            let actual = await serve.getAllFromBasket();

            assert.deepStrictEqual(expected,actual);
        })

        it(`testig`,async ()=>{
            let serve =ServicesFactory(pool);

            await serve.addToBakset("fuji",2.00);
            await serve.addToBakset("top_red",2.00);
            await serve.addToBakset("top_red",2.00);
            await serve.addToBakset("top_red",2.00);
            await serve.addToBakset("fuji",2.00);
            await serve.addToBakset("fuji",2.00);

       let actual =  await serve.getBasketNameIdFruits(4)
       
        })

        it("",async ()=>{
            let serve =ServicesFactory(pool);

            await serve.addToBakset('golden_delicious',2.00);
            await serve.addToBakset('golden_delicious',2.00);
            await serve.addToBakset("top_red",2.00);
            await serve.addToBakset("top_red",2.00);
            await serve.addToBakset("fuji",2.00);

            let actual = await serve.getBasketTotalCost(4);
            let expected = 4.00;
            

            assert.equal(actual,expected)

        })

   


})