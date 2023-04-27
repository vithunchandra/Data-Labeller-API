/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 10.4.22-MariaDB : Database - proyek_ws
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`proyek_ws` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `proyek_ws`;

/*Table structure for table `data` */

DROP TABLE IF EXISTS `data`;

CREATE TABLE `data` (
  `data_id` varchar(15) NOT NULL,
  `data_text` text NOT NULL,
  `price` int(11) NOT NULL,
  `closeDate` date NOT NULL,
  `task_id` varchar(15) NOT NULL,
  PRIMARY KEY (`data_id`),
  KEY `fk_taks` (`task_id`),
  CONSTRAINT `fk_taks` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `data` */

/*Table structure for table `labels` */

DROP TABLE IF EXISTS `labels`;

CREATE TABLE `labels` (
  `label_id` varchar(15) NOT NULL,
  `label_result` text NOT NULL,
  `username` varchar(255) NOT NULL,
  `data_id` varchar(15) NOT NULL,
  PRIMARY KEY (`label_id`),
  KEY `fk_labeller` (`username`),
  KEY `fk_data` (`data_id`),
  CONSTRAINT `fk_data` FOREIGN KEY (`data_id`) REFERENCES `data` (`data_id`),
  CONSTRAINT `fk_labeller` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `labels` */

/*Table structure for table `possible_classification` */

DROP TABLE IF EXISTS `possible_classification`;

CREATE TABLE `possible_classification` (
  `posible_id` varchar(15) NOT NULL,
  `posible_name` varchar(255) NOT NULL,
  `taks_id` varchar(15) NOT NULL,
  PRIMARY KEY (`posible_id`),
  KEY `fk_taks_classify` (`taks_id`),
  CONSTRAINT `fk_taks_classify` FOREIGN KEY (`taks_id`) REFERENCES `tasks` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `possible_classification` */

/*Table structure for table `taks_types` */

DROP TABLE IF EXISTS `taks_types`;

CREATE TABLE `taks_types` (
  `type_id` varchar(15) NOT NULL,
  `type_name` varchar(255) NOT NULL,
  `price_char` int(11) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `taks_types` */

/*Table structure for table `tasks` */

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `task_id` varchar(15) NOT NULL,
  `minimal_credibility` int(11) NOT NULL,
  `max_labeller` int(11) NOT NULL,
  `status` varchar(10) NOT NULL,
  `type_id` varchar(15) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`task_id`),
  KEY `fk_type` (`type_id`),
  KEY `fk_owner` (`username`),
  CONSTRAINT `fk_owner` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  CONSTRAINT `fk_type` FOREIGN KEY (`type_id`) REFERENCES `taks_types` (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `tasks` */

/*Table structure for table `user_blacklists` */

DROP TABLE IF EXISTS `user_blacklists`;

CREATE TABLE `user_blacklists` (
  `ban_id` varchar(15) NOT NULL,
  `username` varchar(255) NOT NULL,
  `task_id` varchar(15) NOT NULL,
  PRIMARY KEY (`ban_id`),
  KEY `prohibited_person` (`username`),
  KEY `reason_prohibited` (`task_id`),
  CONSTRAINT `prohibited_person` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  CONSTRAINT `reason_prohibited` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `user_blacklists` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL,
  `saldo` bigint(20) NOT NULL,
  `credibility` int(11) NOT NULL DEFAULT 50,
  PRIMARY KEY (`username`),
  UNIQUE KEY `UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
