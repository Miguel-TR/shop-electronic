-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-08-2024 a las 15:04:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `warranty` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `specifications` text DEFAULT NULL,
  `id_brand` int(11) DEFAULT NULL,
  `id_category` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `title`, `image`, `description`, `price`, `discount`, `warranty`, `stock`, `specifications`, `id_brand`, `id_category`) VALUES
(27, 'Monitor Gamer de 22\"', 'monitorGamer-3.jpg', 'el mejor monitor para jugar en alta resolucion', 800000, 15, 6, 20, '22 pulgadas\r\nfull hd\r\nled', 2, 4),
(28, 'Notebook Lenovo 14\"', 'NotebookLenovo-1.jpg', 'alta notebook para jugar y hacer otras cositas. xD', 1500000, 5, 12, 20, 'micro core i5\r\nalmacenamiento 1 tb\r\nram 16gb\r\ngrafica gtx 1650', 8, 2),
(31, 'Auriculares Hiperx.', 'auricularesHyperX-1.jpg', 'Auriculares con el mejor sonido', 45000, 10, 6, 15, 'cable 2 metros\r\npeso 150 gramos\r\nUSB', 3, 4),
(44, 'Gabinete Kolink Inspire K3 RGB M-ATX Vidrio Templa', 'GabineteKolinkInspireK3-1.jpg', 'Gabinete con un de gran diseño y con colores RGB , ademas de un hermoso vidrio para poder ver su interior.', 100000, 5, 3, 11, '\"Factor Mother ITX, M-ATX\",\r\n\"Fuente en Posición Superior No\",\r\n\"Con Ventana Sí\",\r\n\"Tipo de Ventana Vidrio Templado\",\r\n\"Colores Negro\"', 12, 1),
(45, 'Placa de Video GeForce RTX 3070 Ti 8GB GDDR6X Trin', 'PlacaDeVideoZotacGeForceRTX-3.jpg', 'Una tarjeta gráfica o tarjeta de video es una tarjeta de expansión de la placa base de la computadora que se encarga de procesar los datos provenientes del procesador y transformarlos en información c', 990000, 10, 9, 5, '\"Tipo PCIe\",\r\n\"Chipset GPU RTX 3070 Ti\",\r\n\"Entrada de video No\",\r\n\"Doble puente No\",\r\n\"Características especiales Ray Tracing + DLSS\"', 4, 1),
(46, 'Fuente Be Quiet! 600W 80 Plus Bronze U9', 'fuenteBeQuiet-1.jpg', 'Feunte de potencia de 600W con un sistema de cableado fijo y se refrigera por aire.', 250000, 20, 12, 9, ' \"Potencia de salida de 600W\",\r\n\"Sistema de cableado fijo\",\r\n\"Fuente de tipo ATX\",\r\n\"Con certificación de eficiencia 80 Plus Bronze\",\r\n\"Diámetro del ventilador de 140mm\",\r\n\"Refrigeración por aire\",\r\n\"Transforma la energía\",\r\n\"De uso imprescindible para el buen funcionamiento de la PC\"\r\n        ', 12, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `total` decimal(10,0) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `selections`
--

CREATE TABLE `selections` (
  `id` int(11) NOT NULL,
  `id_product` int(11) DEFAULT NULL,
  `id_shopping_cart` int(11) DEFAULT NULL,
  `units` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shopping_carts`
--

CREATE TABLE `shopping_carts` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password_user` varchar(70) NOT NULL,
  `rol` varchar(30) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `phone`, `email`, `password_user`, `rol`, `avatar`) VALUES
(1, 'mario64', 'nintendo', '123456789', 'mario@64.com', '$2a$10$Wt9k5c1Qn6TWhnPfcT0EhO3hkez.LfKS/pGGyVGOnJqoWF9LQvCqW', '2', 'user-1714058895807.jpg'),
(2, 'luigii', 'nintendo', '987654321', 'luigi@64.com', '$2a$10$NLIVctJvyjoJjYTEZr3./uDn2RzOYChS3mQqLyseqHuzxsZHiyK6q', '1', 'default-image.png'),
(3, 'MA', 'TR', '12345678', 'mt@64.com', '$2a$10$EvdO8G2m4KRBQw1DLt6N7uItRrQGiGHxtPlHThB/2uN58tHI5Qtkm', '2', 'default-image.png'),
(4, 'Miguel Angel', 'tito Rodriguez', '388500011', 'mti@64.com', '$2a$10$/VZ7O63GS2KCpxvdxJLepubX82Z/XxDKKwIJi4MeFtvem5I6ZuFca', '1', 'user-1717628298816.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`name`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`name`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`),
  ADD UNIQUE KEY `image` (`image`),
  ADD KEY `id_brand` (`id_brand`),
  ADD KEY `id_category` (`id_category`);

--
-- Indices de la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_user_2` (`id_user`),
  ADD KEY `id_user_3` (`id_user`);

--
-- Indices de la tabla `selections`
--
ALTER TABLE `selections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_shopping_cart` (`id_shopping_cart`);

--
-- Indices de la tabla `shopping_carts`
--
ALTER TABLE `shopping_carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `selections`
--
ALTER TABLE `selections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `shopping_carts`
--
ALTER TABLE `shopping_carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- Filtros para la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

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
