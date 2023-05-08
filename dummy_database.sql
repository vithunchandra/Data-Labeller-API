-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2023 at 08:13 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dummy_database`
--
CREATE DATABASE IF NOT EXISTS `dummy_database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `dummy_database`;

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `data_id` varchar(255) NOT NULL,
  `task_id` varchar(255) DEFAULT NULL,
  `data_text` text DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`data_id`, `task_id`, `data_text`, `price`) VALUES
('D20234221600001', 'BOAB202308250001', 'Gabimaru the Hollow  was set up by his fellow ninja and is now on death row. Tired of killing and betrayal, he wants to die. However, no method of execution works on him because as much as the seemingly apathetic Gabimaru refuses to admit it, he does have a reason to live. He wants to return to his wife, who was the reason why he softened up and failed to be an effective assassin. Thus, he refuses to die.\n\n Summary : Gabimaru the Hollow is a ninja who was set up by his fellow', 204),
('D20234331500001', 'SUAN202309220001', 'With the ambitious Ryuusui Nanami on board, Senkuu Ishigami and his team are almost ready to sail the seas and reach the other side of the world—where the bizarre green light that petrified humanity originated. Thanks to the revival of a skillful chef, enough food is being prepared for the entire crew, and the incredible reinvention of the GPS promises to ensure safety on the open sea.', 388),
('D20234441400001', 'SUAN202309220001', 'With the ambitious Ryuusui Nanami on board, Senkuu Ishigami and his team are almost ready to sail the seas and reach the other side of the world—where the bizarre green light that petrified humanity originated. Thanks to the revival of a skillful chef, enough food is being prepared for the entire crew, and the incredible reinvention of the GPS promises to ensure safety on the open sea.', 388),
('D20234441400002', 'SUAN202309220001', 'With the ambitious Ryuusui Nanami on board, Senkuu Ishigami and his team are almost ready to sail the seas and reach the other side of the world—where the bizarre green light that petrified humanity originated. Thanks to the revival of a skillful chef, enough food is being prepared for the entire crew, and the incredible reinvention of the GPS promises to ensure safety on the open sea.', 388),
('D20234441400003', 'SUAN202309220001', 'With the ambitious Ryuusui Nanami on board, Senkuu Ishigami and his team are almost ready to sail the seas and reach the other side of the world—where the bizarre green light that petrified humanity originated. Thanks to the revival of a skillful chef, enough food is being prepared for the entire crew, and the incredible reinvention of the GPS promises to ensure safety on the open sea.', 388),
('D20234441400004', 'SUAN202309220001', 'With the ambitious Ryuusui Nanami on board, Senkuu Ishigami and his team are almost ready to sail the seas and reach the other side of the world—where the bizarre green light that petrified humanity originated. Thanks to the revival of a skillful chef, enough food is being prepared for the entire crew, and the incredible reinvention of the GPS promises to ensure safety on the open sea.', 388),
('D20234441400005', 'SUAN202309220001', 'With the ambitious Ryuusui Nanami on board, Senkuu Ishigami and his team are almost ready to sail the seas and reach the other side of the world—where the bizarre green light that petrified humanity originated. Thanks to the revival of a skillful chef, enough food is being prepared for the entire crew, and the incredible reinvention of the GPS promises to ensure safety on the open sea.', 388),
('D20234441400006', 'SUAN202309220001', 'With the ambitious Ryuusui Nanami on board, Senkuu Ishigami and his team are almost ready to sail the seas and reach the other side of the world—where the bizarre green light that petrified humanity originated. Thanks to the revival of a skillful chef, enough food is being prepared for the entire crew, and the incredible reinvention of the GPS promises to ensure safety on the open sea.', 388),
('D20234441400007', 'SUAN202309220001', 'With the ambitious Ryuusui Nanami on board, Senkuu Ishigami and his team are almost ready to sail the seas and reach the other side of the world—where the bizarre green light that petrified humanity originated. Thanks to the revival of a skillful chef, enough food is being prepared for the entire crew, and the incredible reinvention of the GPS promises to ensure safety on the open sea.', 388),
('D20234441400008', 'CLAB202308250001', 'are you yes man?', 28),
('D20234441400009', 'CLAB202308250001', 'do you like playing game?', 33),
('D20234701600001', 'CLAB202308250001', 'do you like watching anime?', 34);

-- --------------------------------------------------------

--
-- Table structure for table `labels`
--

CREATE TABLE `labels` (
  `label_id` varchar(255) NOT NULL,
  `data_id` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `label_result` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `labels`
--

INSERT INTO `labels` (`label_id`, `data_id`, `username`, `label_result`) VALUES
('L001', 'D20234441400008', 'Ray7', 'yes'),
('L002', 'D20234441400008', 'Akeem4', 'yes'),
('L003', 'D20234441400008', 'Frida58', 'no'),
('LAB004', 'D20234441400002', 'Ricky9', 'Dr.Stone 2');

-- --------------------------------------------------------

--
-- Table structure for table `possible_classifications`
--

CREATE TABLE `possible_classifications` (
  `possible_id` varchar(255) NOT NULL,
  `task_id` varchar(255) DEFAULT NULL,
  `possible_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `possible_classifications`
--

INSERT INTO `possible_classifications` (`possible_id`, `task_id`, `possible_name`) VALUES
('CLABNO0001', 'CLAB202308250001', 'no'),
('CLABYS0001', 'CLAB202308250001', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('1-create-user.js'),
('2-create-task-type.js'),
('3-create-task.js'),
('4-create-data.js'),
('5-create-possible-classification.js'),
('6-create-label.js'),
('7-create-user-blacklist.js');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `task_id` varchar(255) NOT NULL,
  `type_id` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `max_labeller` int(11) DEFAULT NULL,
  `close_date` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `minimal_credibility` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`task_id`, `type_id`, `username`, `max_labeller`, `close_date`, `status`, `minimal_credibility`) VALUES
('BOAB202308250001', 'TT004', 'Abe69', 5, '2023-08-25', 'active', 40),
('CLAB202308250001', 'TT001', 'Abe69', 5, '2023-08-25', 'active', 45),
('SUAN202309220001', 'TT002', 'Antoinette43', 3, '2023-09-22', 'active', 55);

-- --------------------------------------------------------

--
-- Table structure for table `task_types`
--

CREATE TABLE `task_types` (
  `type_id` varchar(255) NOT NULL,
  `type_name` varchar(255) DEFAULT NULL,
  `price_char` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `task_types`
--

INSERT INTO `task_types` (`type_id`, `type_name`, `price_char`) VALUES
('TT001', 'Classification', 5),
('TT002', 'Summarization', 10),
('TT003', 'Translation', 15),
('TT004', 'Bot Summarization', 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `saldo` bigint(20) UNSIGNED DEFAULT NULL,
  `credibility` int(11) DEFAULT 50
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `name`, `email`, `role`, `saldo`, `credibility`) VALUES
('Abe69', 'gMB3Q', 'Abe', 'Abe69@gmail.com', 'requester', 30, 50),
('Abigail93', 'xDVUh', 'Abigail', 'Abigail93@gmail.com', 'requester', 0, 50),
('Akeem4', 'ts7pB', 'Akeem', 'Akeem4@gmail.com', 'labeller', 0, 50),
('Alberto59', 'aBIXr', 'Alberto', 'Alberto59@gmail.com', 'labeller', 0, 50),
('Alberto94', '5XLG8', 'Alberto', 'Alberto94@gmail.com', 'requester', 0, 50),
('Alvah47', 'XPlkE', 'Alvah', 'Alvah47@gmail.com', 'requester', 0, 50),
('Alyson37', 'RJnqJ', 'Alyson', 'Alyson37@gmail.com', 'labeller', 0, 50),
('Amira25', 'QQbpt', 'Amira', 'Amira25@gmail.com', 'labeller', 0, 50),
('Antoinette43', 'C9Jmx', 'Antoinette', 'Antoinette43@gmail.com', 'requester', 0, 50),
('Arianna87', 'phrgE', 'Arianna', 'Arianna87@gmail.com', 'labeller', 0, 50),
('Ashleigh34', 'PDvS1', 'Ashleigh', 'Ashleigh34@gmail.com', 'requester', 0, 50),
('Bennie49', 'EZZra', 'Bennie', 'Bennie49@gmail.com', 'labeller', 0, 50),
('Bobbie83', '7nhD2', 'Bobbie', 'Bobbie83@gmail.com', 'labeller', 0, 50),
('Brenda99', 'EABTy', 'Brenda', 'Brenda99@gmail.com', 'requester', 0, 50),
('Candelario80', '3FtxY', 'Candelario', 'Candelario80@gmail.com', 'labeller', 0, 50),
('Candice92', 'rgpAY', 'Candice', 'Candice92@gmail.com', 'requester', 0, 50),
('Chanelle19', 'ub7sA', 'Chanelle', 'Chanelle19@gmail.com', 'labeller', 0, 50),
('Chester29', 'sGJ53', 'Chester', 'Chester29@gmail.com', 'labeller', 0, 50),
('Clinton98', 'Q0bA4', 'Clinton', 'Clinton98@gmail.com', 'labeller', 0, 50),
('Danial38', 'A1aIh', 'Danial', 'Danial38@gmail.com', 'labeller', 0, 50),
('Dejon65', 'b7vMi', 'Dejon', 'Dejon65@gmail.com', 'requester', 0, 50),
('Demetris68', 'ALQrS', 'Demetris', 'Demetris68@gmail.com', 'requester', 0, 50),
('Dennis66', 'aV1tj', 'Dennis', 'Dennis66@gmail.com', 'labeller', 0, 50),
('Deron33', 'HpXaZ', 'Deron', 'Deron33@gmail.com', 'requester', 0, 50),
('Diego8', 'ltbTp', 'Diego', 'Diego8@gmail.com', 'labeller', 0, 50),
('Donnie6', 'epDky', 'Donnie', 'Donnie6@gmail.com', 'labeller', 0, 50),
('Edythe10', 'HTtlp', 'Edythe', 'Edythe10@gmail.com', 'labeller', 0, 50),
('Emilio48', 'ixg78', 'Emilio', 'Emilio48@gmail.com', 'labeller', 0, 50),
('Enid85', 'uD1Ln', 'Enid', 'Enid85@gmail.com', 'requester', 0, 50),
('Eugene90', 'QH1GO', 'Eugene', 'Eugene90@gmail.com', 'requester', 0, 50),
('Eulalia15', 'mWUvG', 'Eulalia', 'Eulalia15@gmail.com', 'requester', 0, 50),
('Ezekiel97', 'WUwIk', 'Ezekiel', 'Ezekiel97@gmail.com', 'labeller', 0, 50),
('Frida58', '0HPCH', 'Frida', 'Frida58@gmail.com', 'labeller', 0, 50),
('Gardner26', 'D45SI', 'Gardner', 'Gardner26@gmail.com', 'labeller', 0, 50),
('Golden11', '3uMs7', 'Golden', 'Golden11@gmail.com', 'labeller', 0, 50),
('Hector89', '5yQDp', 'Hector', 'Hector89@gmail.com', 'labeller', 0, 50),
('Holly78', 'wRGRk', 'Holly', 'Holly78@gmail.com', 'requester', 0, 50),
('Jammie17', 'PIk4Z', 'Jammie', 'Jammie17@gmail.com', 'requester', 0, 50),
('Jaylon23', 'mrpHX', 'Jaylon', 'Jaylon23@gmail.com', 'requester', 0, 50),
('Jenifer45', 'YK9QT', 'Jenifer', 'Jenifer45@gmail.com', 'labeller', 0, 50),
('Jerry88', 'wE24e', 'Jerry', 'Jerry88@gmail.com', 'labeller', 0, 50),
('Joanny86', 'zId53', 'Joanny', 'Joanny86@gmail.com', 'requester', 0, 50),
('Johnathon14', '0DvCY', 'Johnathon', 'Johnathon14@gmail.com', 'requester', 0, 50),
('Jordane50', 'wix0Y', 'Jordane', 'Jordane50@gmail.com', 'labeller', 0, 50),
('Julius31', '6JM4e', 'Julius', 'Julius31@gmail.com', 'labeller', 0, 50),
('Kelvin42', '6gLcj', 'Kelvin', 'Kelvin42@gmail.com', 'requester', 0, 50),
('Keon32', '7bQY5', 'Keon', 'Keon32@gmail.com', 'labeller', 0, 50),
('King13', 'C2FlK', 'King', 'King13@gmail.com', 'labeller', 0, 50),
('Krystel62', 'CZyEW', 'Krystel', 'Krystel62@gmail.com', 'labeller', 0, 50),
('Leo39', 'ACaKa', 'Leo', 'Leo39@gmail.com', 'requester', 0, 50),
('Lester52', 'GihFv', 'Lester', 'Lester52@gmail.com', 'labeller', 0, 50),
('Lew81', 'Is3ba', 'Lew', 'Lew81@gmail.com', 'requester', 0, 50),
('Linnea95', 'mF2CX', 'Linnea', 'Linnea95@gmail.com', 'requester', 0, 50),
('Lonzo71', 'DDDWP', 'Lonzo', 'Lonzo71@gmail.com', 'labeller', 0, 50),
('Lorenza1', 'egR5t', 'Lorenza', 'Lorenza1@gmail.com', 'requester', 0, 50),
('Loyce74', 'hGDgI', 'Loyce', 'Loyce74@gmail.com', 'labeller', 0, 50),
('Margaretta77', 'YcMdv', 'Margaretta', 'Margaretta77@gmail.com', 'requester', 0, 50),
('Margarette46', 'N18XT', 'Margarette', 'Margarette46@gmail.com', 'labeller', 0, 50),
('Marisa64', 'datDq', 'Marisa', 'Marisa64@gmail.com', 'requester', 0, 50),
('Marques2', 'QYBk4', 'Marques', 'Marques2@gmail.com', 'requester', 0, 50),
('Melissa21', 'Dop8n', 'Melissa', 'Melissa21@gmail.com', 'requester', 0, 50),
('Mikayla35', 'yxy9X', 'Mikayla', 'Mikayla35@gmail.com', 'requester', 0, 50),
('Miller16', '917nG', 'Miller', 'Miller16@gmail.com', 'requester', 0, 50),
('Mina54', 'z5fWB', 'Mina', 'Mina54@gmail.com', 'labeller', 0, 50),
('Mireille96', '2xfPx', 'Mireille', 'Mireille96@gmail.com', 'requester', 0, 50),
('Misael73', 'Gik7a', 'Misael', 'Misael73@gmail.com', 'requester', 0, 50),
('Nelle67', 'PA20P', 'Nelle', 'Nelle67@gmail.com', 'requester', 0, 50),
('Nicolette5', 'gRfvG', 'Nicolette', 'Nicolette5@gmail.com', 'labeller', 0, 50),
('Noah12', 'tjpTu', 'Noah', 'Noah12@gmail.com', 'labeller', 0, 50),
('Nora61', 'eimzc', 'Nora', 'Nora61@gmail.com', 'labeller', 0, 50),
('Norberto27', 'tJFMC', 'Norberto', 'Norberto27@gmail.com', 'labeller', 0, 50),
('Ofelia55', 'fNhEj', 'Ofelia', 'Ofelia55@gmail.com', 'requester', 0, 50),
('Oral30', '273pm', 'Oral', 'Oral30@gmail.com', 'labeller', 0, 50),
('Oren41', '4p7RH', 'Oren', 'Oren41@gmail.com', 'labeller', 0, 50),
('Oswaldo79', 'oXZZ9', 'Oswaldo', 'Oswaldo79@gmail.com', 'labeller', 0, 50),
('Otha63', 'CIecN', 'Otha', 'Otha63@gmail.com', 'labeller', 0, 50),
('Palma3', '76FTp', 'Palma', 'Palma3@gmail.com', 'requester', 0, 50),
('Pattie20', '7scrP', 'Pattie', 'Pattie20@gmail.com', 'labeller', 0, 50),
('Quentin44', '51qNK', 'Quentin', 'Quentin44@gmail.com', 'requester', 0, 50),
('Rasheed76', 'KCvrQ', 'Rasheed', 'Rasheed76@gmail.com', 'labeller', 0, 50),
('Raven36', '23Scx', 'Raven', 'Raven36@gmail.com', 'requester', 0, 50),
('Ray7', 'A7I55', 'Ray', 'Ray7@gmail.com', 'labeller', 0, 80),
('Rebeka72', 'AbnOG', 'Rebeka', 'Rebeka72@gmail.com', 'labeller', 0, 50),
('Reyna56', '36mdp', 'Reyna', 'Reyna56@gmail.com', 'labeller', 0, 50),
('Rhianna18', 'S8EPc', 'Rhianna', 'Rhianna18@gmail.com', 'labeller', 0, 50),
('Richard0', 'PFa3S', 'Richard', 'Richard0@gmail.com', 'labeller', 0, 50),
('Richard75', 'N15o7', 'Richard', 'Richard75@gmail.com', 'labeller', 0, 50),
('Ricky9', 'XdsnW', 'Ricky', 'Ricky9@gmail.com', 'labeller', 0, 50),
('Robert84', 'kKEtG', 'Robert', 'Robert84@gmail.com', 'requester', 0, 50),
('Ruthie57', 'VtGAe', 'Ruthie', 'Ruthie57@gmail.com', 'labeller', 0, 50),
('Savannah60', 'tWPuS', 'Savannah', 'Savannah60@gmail.com', 'labeller', 0, 50),
('Shyann91', 'bJRZU', 'Shyann', 'Shyann91@gmail.com', 'requester', 0, 50),
('Tatyana82', 'e6REp', 'Tatyana', 'Tatyana82@gmail.com', 'labeller', 0, 50),
('Terence40', 'JAZXi', 'Terence', 'Terence40@gmail.com', 'requester', 0, 50),
('Tillman28', '7stFM', 'Tillman', 'Tillman28@gmail.com', 'labeller', 0, 50),
('Una53', 'icXu0', 'Una', 'Una53@gmail.com', 'requester', 0, 50),
('Wilmer24', 'XoX47', 'Wilmer', 'Wilmer24@gmail.com', 'labeller', 0, 50),
('Winfield51', 'MszLy', 'Winfield', 'Winfield51@gmail.com', 'labeller', 0, 50),
('Winona70', 'bZIy4', 'Winona', 'Winona70@gmail.com', 'labeller', 0, 50),
('Zachery22', '8KGjZ', 'Zachery', 'Zachery22@gmail.com', 'requester', 0, 50);

-- --------------------------------------------------------

--
-- Table structure for table `user_blacklists`
--

CREATE TABLE `user_blacklists` (
  `ban_id` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `task_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`data_id`),
  ADD KEY `task_id` (`task_id`);

--
-- Indexes for table `labels`
--
ALTER TABLE `labels`
  ADD PRIMARY KEY (`label_id`),
  ADD KEY `data_id` (`data_id`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `possible_classifications`
--
ALTER TABLE `possible_classifications`
  ADD PRIMARY KEY (`possible_id`),
  ADD KEY `task_id` (`task_id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `type_id` (`type_id`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `task_types`
--
ALTER TABLE `task_types`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_blacklists`
--
ALTER TABLE `user_blacklists`
  ADD PRIMARY KEY (`ban_id`),
  ADD KEY `username` (`username`),
  ADD KEY `task_id` (`task_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `data`
--
ALTER TABLE `data`
  ADD CONSTRAINT `data_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`);

--
-- Constraints for table `labels`
--
ALTER TABLE `labels`
  ADD CONSTRAINT `labels_ibfk_1` FOREIGN KEY (`data_id`) REFERENCES `data` (`data_id`),
  ADD CONSTRAINT `labels_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users` (`username`);

--
-- Constraints for table `possible_classifications`
--
ALTER TABLE `possible_classifications`
  ADD CONSTRAINT `possible_classifications_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `task_types` (`type_id`),
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users` (`username`);

--
-- Constraints for table `user_blacklists`
--
ALTER TABLE `user_blacklists`
  ADD CONSTRAINT `user_blacklists_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `user_blacklists_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
