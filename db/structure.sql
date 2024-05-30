-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-05-2024 a las 05:53:52
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `shop_electronic`
--
CREATE DATABASE IF NOT EXISTS `shop_electronic` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `shop_electronic`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

CREATE TABLE IF NOT EXISTS `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
(9, 'ACER'),
(4, 'AMD'),
(7, 'ASUS'),
(6, 'GIGABYTE'),
(3, 'HYPERX'),
(5, 'INTEL'),
(8, 'LENOVO'),
(2, 'LG'),
(11, 'LOGITECH'),
(13, 'MICROSOFT'),
(14, 'NINTENDO'),
(10, 'REDRAGON'),
(1, 'SAMSUNG'),
(12, 'SONY');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(3, 'CONSOLA'),
(1, 'PC DE ESCRITORIO'),
(2, 'PC PORTATIL'),
(4, 'PERIFERICO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `warranty` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `specifications` text DEFAULT NULL,
  `id_brand` int(11) DEFAULT NULL,
  `id_category` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  UNIQUE KEY `image` (`image`),
  KEY `id_brand` (`id_brand`),
  KEY `id_category` (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `title`, `image`, `description`, `price`, `discount`, `warranty`, `stock`, `specifications`, `id_brand`, `id_category`) VALUES
(27, 'monitor gamer', 'monitorGamer-3.jpg', 'el mejor monitor para jugar en alta resolucion', 800000, 15, 6, 20, '22 pulgadas\r\nfull hd\r\nled', 2, 4),
(28, 'notebook lenovo', 'NotebookLenovo-1.jpg', 'alta notebook para jugar y hacer otras cositas. xD', 1500000, 5, 12, 20, 'micro core i5\r\nalmacenamiento 1 tb\r\nram 16gb\r\ngrafica gtx 1650', 8, 2),
(31, 'auriculares Hiperx', 'auricularesHyperX-1.jpg', 'auriculares con el mejor sonido', 35000, 10, 6, 15, 'cable 2 metros\r\npeso 150 gramos\r\nUSB', 3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `selections`
--

CREATE TABLE IF NOT EXISTS `selections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) DEFAULT NULL,
  `id_shopping_cart` int(11) DEFAULT NULL,
  `units` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_product` (`id_product`),
  KEY `id_shopping_cart` (`id_shopping_cart`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shopping_carts`
--

CREATE TABLE IF NOT EXISTS `shopping_carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password_user` varchar(70) NOT NULL,
  `rol` varchar(30) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `phone`, `email`, `password_user`, `rol`, `avatar`) VALUES
(1, 'mario64', 'nintendo', '123456789', 'mario@64.com', '$2a$10$JXpvheuHhpJu6u.Es1VLnu0LbYCtAQ.O2YJqLZobZx/rS/5AnYQru', '2', 'user-1714058895807.jpg'),
(2, 'luigi', 'nintendo', '987654321', 'luigi@64.com', '$2a$10$NLIVctJvyjoJjYTEZr3./uDn2RzOYChS3mQqLyseqHuzxsZHiyK6q', '1', 'default-image.png');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_brand`) REFERENCES `brands` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`);

--
-- Filtros para la tabla `selections`
--
ALTER TABLE `selections`
  ADD CONSTRAINT `selections_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `selections_ibfk_2` FOREIGN KEY (`id_shopping_cart`) REFERENCES `shopping_carts` (`id`);

--
-- Filtros para la tabla `shopping_carts`
--
ALTER TABLE `shopping_carts`
  ADD CONSTRAINT `shopping_carts_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
