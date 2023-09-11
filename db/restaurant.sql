-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2023 at 10:44 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(9) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `Img` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `type`, `Img`, `createdAt`, `updatedAt`) VALUES
(1, 'กุ้งเจ้าพระยาเผา', 'ทะเล', 'https://th.bing.com/th/id/OIP.U4Qbp2ygSf_YgFcnuu5v2QHaEL?w=322&h=182&c=7&r=0&o=5&pid=1.7', '2023-08-28 07:06:06', '2023-08-28 07:06:06'),
(2, 'ต้มยำกุ้งแม่น้ำ', 'ทะเล', 'https://th.bing.com/th/id/OIP.rAn77L-OMDfYYDPtWMbjegHaEK?w=312&h=180&c=7&r=0&o=5&pid=1.7', '2023-08-28 07:07:10', '2023-08-28 07:08:08'),
(3, 'ข้าวผัดปู', 'อาหารหลัก', 'https://th.bing.com/th/id/OIP.HX_xtcDUUUDpOWbew2HscgHaE6?w=256&h=180&c=7&r=0&o=5&pid=1.7', '2023-08-28 07:09:06', '2023-08-28 07:09:06'),
(4, 'เฟรนฟรายทอดกรอบ', 'อาหารทานเล่น', 'https://th.bing.com/th/id/OIP.bPOmJwIuMob11gmcXyaV3wHaE8?w=272&h=181&c=7&r=0&o=5&pid=1.7', '2023-08-28 07:09:42', '2023-08-28 07:09:42'),
(5, 'ทอดมันกุ้ง', 'กับข้าว', 'https://th.bing.com/th/id/OIP.GhnsUZS65AZRcSDjrCZhlwHaC6?w=334&h=137&c=7&r=0&o=5&pid=1.7', '2023-08-28 07:11:05', '2023-08-28 07:11:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
