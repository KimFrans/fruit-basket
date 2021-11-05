CREATE TABLE fruit_basket( 
  id serial not null primary key,
  fruit_name text, 
  quantity int not null, 
  price decimal (10,2)
);