DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);
SELECT * FROM products;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Butter", "Dairy", 4.99, 23),
  ("Sugar", "Baking", 2.35, 12),
  ("Eggs", "Refrigerated", 4.35, 7),
  ("Flour", "Baking", 1.99, 12),
  ("Chocolate Chips", "Candy", 3.99, 14),
  ("Cabbage", "Produce", 2.59, 11),
  ("Salmon", "Fish", 15.99, 6),
  ("Tomato Paste", "Canned Goods", 0.99, 4),
  ("Diet Coke", "Soda", 5.25, 15),
  ("Tofu", "Organic", 5.02, 5);