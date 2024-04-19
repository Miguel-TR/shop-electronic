DROP DATABASE IF EXISTS `shop_electronic`;

CREATE DATABASE `shop_electronic`;

USE `shop_electronic`;

CREATE TABLE categorys (id INT PRIMARY KEY AUTO_INCREMENT,
                        nombre VARCHAR(50) UNIQUE);

INSERT INTO categorys (nombre) VALUES ('PC DE ESCRITORIO');
INSERT INTO categorys (nombre) VALUES ('PC PORTATIL');
INSERT INTO categorys (nombre) VALUES ('CONSOLA');
INSERT INTO categorys (nombre) VALUES ('PERIFERICO');


CREATE TABLE brands (id INT PRIMARY KEY AUTO_INCREMENT,
                    nombre VARCHAR(50) UNIQUE);

INSERT INTO brands (nombre) VALUES ('SAMSUNG');
INSERT INTO brands (nombre) VALUES ('LG');
INSERT INTO brands (nombre) VALUES ('HYPERX');
INSERT INTO brands (nombre) VALUES ('AMD');
INSERT INTO brands (nombre) VALUES ('INTEL');
INSERT INTO brands (nombre) VALUES ('GIGABYTE');
INSERT INTO brands (nombre) VALUES ('ASUS');
INSERT INTO brands (nombre) VALUES ('LENOVO');
INSERT INTO brands (nombre) VALUES ('ACER');
INSERT INTO brands (nombre) VALUES ('REDRAGON');
INSERT INTO brands (nombre) VALUES ('LOGITECH');

                    
CREATE TABLE users (id INT PRIMARY KEY AUTO_INCREMENT,
                    firstname VARCHAR(50) NOT NULL,
                    lastname VARCHAR(50) NOT NULL,
                    phone INT,
                    email VARCHAR(50) UNIQUE NOT NULL,
                    password_user VARCHAR(50) NOT NULL,
                    rol VARCHAR(30),
                    avatar VARCHAR(100) UNIQUE);

CREATE TABLE products (id INT PRIMARY KEY AUTO_INCREMENT,
                        title VARCHAR(50) UNIQUE NOT NULL,
                        image VARCHAR(100) UNIQUE NOT NULL,
                        description VARCHAR(200) NOT NULL,
                        price INT NOT NULL,
                        discount INT,
                        warranty INT,
                        stock INT,
                        specifications TEXT,
                        id_brand INT,
                        id_category INT,
                        FOREIGN KEY (id_brand) REFERENCES brands(id),
                        FOREIGN KEY (id_category) REFERENCES categorys(id)
                        );

CREATE TABLE shopping_carts (id INT AUTO_INCREMENT PRIMARY KEY,
                            id_user INT,
                            FOREIGN KEY (id_user) REFERENCES users(id)
                            );
                             
CREATE TABLE selections (id INT AUTO_INCREMENT PRIMARY KEY,
                        id_product INT,
                        id_shopping_cart INT,
                        units INT NOT NULL,
                        FOREIGN KEY (id_product) REFERENCES products(id),
                        FOREIGN KEY (id_shopping_cart) REFERENCES shopping_carts(id));

