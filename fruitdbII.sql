drop table if exists fruit_basket_item;
drop table if exists multi_fruit_basket;
create table multi_fruit_basket(
    id SERIAL  NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
);
insert into multi_fruit_basket(id, name) values(1,'granny_smith');
insert into multi_fruit_basket(id, name) values(2,'golden_deliscious');
insert into multi_fruit_basket(id, name) values(3,'fuji');
insert into multi_fruit_basket(id, name) values(4,'top_red');


create table fruit_basket_item (
    fruit_type TEXT NOT NULL,
    fruit_qty int NOT NULL,
    fruit_price NUMERIC(5,2) NOT NULL,
    multi_fruit_basket_id SERIAL  NOT NULL PRIMARY KEY,
    unique(fruit_type)

);