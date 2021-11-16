module.exports = function ServicesFactory(pool) {

    let addToBakset = async (f_type, f_price) => {
        let id = idInsert(f_type)
        await pool.query(`insert into fruit_basket_item(fruit_type,fruit_qty,fruit_price,multi_fruit_basket_id) values('${f_type}',1,${f_price}, ${id})  ON CONFLICT(fruit_type) DO UPDATE SET fruit_qty = fruit_basket_item.fruit_qty + 1`);
    }

    let getAllFromBasket = async () => {
        return (await pool.query(`SELECT * from fruit_basket_item`))['rows'];
    }

    let removeFruitFromBaset = async (fruit_type) => {
        await pool.query(`DELETE  from fruit_basket_item where '${fruit_type}' = fruit_type`);
    }
    let idInsert = (id) => {
        let ourId;
        if (id === 'granny_smith') {
            ourId = 1
        } else if (id === 'golden_delicious') {
            ourId = 2
        } else if (id === 'fuji') {
            ourId = 3
        } else if (id === 'top_red') {
            ourId = 4

        }
        return ourId;

    }

    let getBasketNameIdFruits = async (param) => {
        try {
       return (await pool.query(`Select * from fruit_basket_item inner join  multi_fruit_basket   on multi_fruit_basket.id = fruit_basket_item.multi_fruit_basket_id where multi_fruit_basket.id = ${param}`)).rows;
            
            
        } catch (error) { console.log(error); }

    }

    let getBasketTotalCost = async (param)=>{
        return (await pool.query(`select sum(fruit_price * fruit_qty)  from fruit_basket_item inner join multi_fruit_basket on  multi_fruit_basket.id = fruit_basket_item.multi_fruit_basket_id where multi_fruit_basket.id = ${param}`)).rows[0]['sum']
    }

    return {
        addToBakset,
        removeFruitFromBaset,
        getAllFromBasket,
        idInsert,
        getBasketNameIdFruits,
        getBasketTotalCost

    }
}