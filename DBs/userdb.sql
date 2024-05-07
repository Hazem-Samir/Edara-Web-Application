-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: userdb:3306
-- Generation Time: May 07, 2024 at 08:41 PM
-- Server version: 8.4.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `userdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int NOT NULL,
  `Name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Phone` int NOT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Name`, `Email`, `Password`, `Token`, `Type`, `Phone`, `Status`) VALUES
(26, 'hazem', 'hazem@gmail.com', '$2b$10$1QEact7.A4sGveG4/cPwSeaaWOLFrbX0tldsKul1t.uVweI6kpd7O', '67cfd514a39588d9a389696ddc8b7548', 'Admin', 231231, 1),
(33, 'hazsemsam1', 'hazem12@gmail.com', '$2b$10$1QEact7.A4sGveG4/cPwSeaaWOLFrbX0tldsKul1t.uVweI6kpd7O', 'fbb39377f5ead13f985b7d2bba71e55f', 'Supervisor', 2147483647, 1),
(34, 'ddsa', 'dad@gmail.com', '$2b$10$1QEact7.A4sGveG4/cPwSeaaWOLFrbX0tldsKul1t.uVweI6kpd7O', 'a5089fea90ffd46a2af84b1f974675cb', 'Supervisor', 222222, 0),
(37, 'seif', 'seif@gmail.com', '$2b$10$1QEact7.A4sGveG4/cPwSeaaWOLFrbX0tldsKul1t.uVweI6kpd7O', 'dcc98e408314f3f0e675cc58a7c5858f', 'Supervisor', 8888888, 1),
(38, 'salma yasser', 'salma@gmail.com', '$2b$10$1QEact7.A4sGveG4/cPwSeaaWOLFrbX0tldsKul1t.uVweI6kpd7O', '88ac5bffb3e9687f7a665725fcec5bb6', 'Supervisor', 123456789, 0),
(40, 'seif tariq', 'seif1@gmail.com', '$2b$10$1QEact7.A4sGveG4/cPwSeaaWOLFrbX0tldsKul1t.uVweI6kpd7O', 'eaf60f7690aba04066ca86047f0c91df', 'Supervisor', 122222, 1),
(42, 'aaaaa', 'aaa@gmail.com', '$2b$10$r5dD8GD0VFC8/7h7Yl1I6.izYkcJ8sV6ZSf5g37P8ZzbFou3PpGBu', 'd62c0dbfb76dadf45731799398937a2b', 'Supervisor', 22315, 0),
(44, 'aadsaaads', 'dddaaaaa@gmail.com', '$2b$10$Yz5nDNXoV6KZTWij4IcE2.DqhrOR8yNo.tq2mlAmMG8wAY8WtOPFC', '3cbba9e3acea67ca6f9096ee682e98a7', 'Supervisor', 1099845742, 0),
(45, 'hhhhhh', 'hhh@gmail.com', '$2b$10$di6fJ698HxRNUvH4TkPHeuHYzU520buQJu2RP4JP7wDTdIFZkANhK', '0f0f94876e9cf06146e429668375e4cc', 'Supervisor', 1099845742, 0),
(46, 'omnia arfat', 'omnia@gmail.com', '$2b$10$xcexDbQaXQb4.rtf9cLmVunf3WX/W.DjYvINqu/cR2w5uBqYH.TTe', '501a56734981bbd1fc6bde21ed15c025', 'Supervisor', 1144920632, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
