module.exports = function ServicesFactory(pool){

    let addToBakset = async (f_type,f_price)=>{
        await pool.query(`insert into fruit_basket_item(fruit_type,fruit_qty,fruit_price) values('${f_type}',1,${f_price}) ON CONFLICT(fruit_type) DO UPDATE SET fruit_qty = fruit_basket_item.fruit_qty + 1`);
    }

    let getAllFromBasket = async ()=>{
       return (await pool.query(`SELECT fruit_type,fruit_qty,fruit_price from fruit_basket_item`))['rows'];
    }

    let removeFruitFromBaset = async (fruit_type)=>{
        await pool.query(`DELETE  from fruit_basket_item where '${fruit_type}' = fruit_type`);
    }

    return{
        addToBakset,
        removeFruitFromBaset,
        getAllFromBasket

    }
}