-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: requestdb:3306
-- Generation Time: May 07, 2024 at 08:42 PM
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
-- Database: `requestdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `ID` int NOT NULL,
  `SID` int NOT NULL,
  `WID` int NOT NULL,
  `PID` int NOT NULL,
  `Quantity` int NOT NULL,
  `State` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`ID`, `SID`, `WID`, `PID`, `Quantity`, `State`) VALUES
(35, 37, 16, 47, 5, 'Declined'),
(36, 37, 16, 47, -3, 'Accepted'),
(37, 37, 16, 47, 5, 'Declined'),
(38, 37, 16, 47, 3, 'Declined'),
(39, 37, 16, 47, 4, 'Declined'),
(40, 37, 16, 47, 1, 'Declined'),
(41, 37, 16, 47, -1, 'Declined'),
(42, 37, 16, 58, 2, 'Accepted'),
(43, 37, 16, 58, 4, 'Accepted'),
(44, 37, 16, 58, 5, 'Pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `pr` (`PID`),
  ADD KEY `sr` (`SID`),
  ADD KEY `wr` (`WID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
