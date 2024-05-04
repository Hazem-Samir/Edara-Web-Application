-- Table structure for table `user`
CREATE TABLE `user` (
  `ID` int NOT NULL,
  `Name` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Token` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Type` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `Phone` int NOT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table `user`
INSERT INTO `user` (`ID`, `Name`, `Email`, `Password`, `Token`, `Type`, `Phone`, `Status`) VALUES
(2, 'sdsssss', 'd@gmail.com', '$2b$10$1QEact7.A4sGveG4/cPwSeaaWOLFrbX0tldsKul1t.uVweI6kpd7O', '08741506796cb268a9d7c97323f554bd', '', 445665, 1),
(26, 'hazem', 'hazem@gmail.com', '$2b$10$1QEact7.A4sGveG4/cPwSeaaWOLFrbX0tldsKul1t.uVweI6kpd7O', '67cfd514a39588d9a389696ddc8b7548', 'Admin', 231231, 1),
(33, 'hazsemsam1', 'hazem12@gmail.com', '$2b$10$1QEact7.A4sGveG4/cPwSeaaWOLFrbX0tldsKul1t.uVweI6kpd7O', 'fbb39377f5ead13f985b7d2bba71e55f', 'Supervisor', 2147483647, 1),
(34, 'dds', 'dd@gmail.com', '$2b$10$1QEact7.A4sGveG4/cPwSeaaWOLFrbX0tldsKul1t.uVweI6kpd7O', 'a5089fea90ffd46a2af84b1f974675cb', 'Supervisor', 222222, 0),
(37, 'seif', 'seif@gmail.com', '$2b$10$1QEact7.A4sGveG4/cPwSeaaWOLFrbX0tldsKul1t.uVweI6kpd7O', 'dcc98e408314f3f0e675cc58a7c5858f', 'Supervisor', 8888888, 1),
(38, 'salma yasser', 'salma@gmail.com', '$2b$10$1QEact7.A4sGveG4/cPwSeaaWOLFrbX0tldsKul1t.uVweI6kpd7O', '88ac5bffb3e9687f7a665725fcec5bb6', 'Supervisor', 123456789, 0),
(40, 'seif tariq', 'seif1@gmail.com', '$2b$10$1QEact7.A4sGveG4/cPwSeaaWOLFrbX0tldsKul1t.uVweI6kpd7O', 'eaf60f7690aba04066ca86047f0c91df', 'Supervisor', 122222, 1);

-- Indexes for table `user`
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);
