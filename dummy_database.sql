/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 10.4.22-MariaDB : Database - dummy_database
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`dummy_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `dummy_database`;

/*Table structure for table `data` */

DROP TABLE IF EXISTS `data`;

CREATE TABLE `data` (
  `data_id` varchar(255) NOT NULL,
  `task_id` varchar(255) DEFAULT NULL,
  `data_text` text DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  PRIMARY KEY (`data_id`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `data_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `data` */

insert  into `data`(`data_id`,`task_id`,`data_text`,`price`) values 
('D20234221600001','BOAB202308250001','Gabimaru the Hollow  was set up by his fellow ninja and is now on death row. Tired of killing and betrayal, he wants to die. However, no method of execution works on him because as much as the seemingly apathetic Gabimaru refuses to admit it, he does have a reason to live. He wants to return to his wife, who was the reason why he softened up and failed to be an effective assassin. Thus, he refuses to die.\n\n Summary : Gabimaru the Hollow is a ninja who was set up by his fellow',204),
('D202342432000001','TRQU202305300001','Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',113),
('D202342432000002','TRQU202305300001','Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',255),
('D202342432000003','TRQU202305300001','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',245),
('D20234331500001','SUAN202309220001','With the ambitious Ryuusui Nanami on board, Senkuu Ishigami and his team are almost ready to sail the seas and reach the other side of the world—where the bizarre green light that petrified humanity originated. Thanks to the revival of a skillful chef, enough food is being prepared for the entire crew, and the incredible reinvention of the GPS promises to ensure safety on the open sea.',388),
('D20234441400001','SUAN202309220001','With the ambitious Ryuusui Nanami on board, Senkuu Ishigami and his team are almost ready to sail the seas and reach the other side of the world—where the bizarre green light that petrified humanity originated. Thanks to the revival of a skillful chef, enough food is being prepared for the entire crew, and the incredible reinvention of the GPS promises to ensure safety on the open sea.',388),
('D20234441400002','SUAN202309220001','With the ambitious Ryuusui Nanami on board, Senkuu Ishigami and his team are almost ready to sail the seas and reach the other side of the world—where the bizarre green light that petrified humanity originated. Thanks to the revival of a skillful chef, enough food is being prepared for the entire crew, and the incredible reinvention of the GPS promises to ensure safety on the open sea.',388),
('D20234441400003','SUAN202309220001','With the ambitious Ryuusui Nanami on board, Senkuu Ishigami and his team are almost ready to sail the seas and reach the other side of the world—where the bizarre green light that petrified humanity originated. Thanks to the revival of a skillful chef, enough food is being prepared for the entire crew, and the incredible reinvention of the GPS promises to ensure safety on the open sea.',388),
('D20234441400004','SUAN202309220001','With the ambitious Ryuusui Nanami on board, Senkuu Ishigami and his team are almost ready to sail the seas and reach the other side of the world—where the bizarre green light that petrified humanity originated. Thanks to the revival of a skillful chef, enough food is being prepared for the entire crew, and the incredible reinvention of the GPS promises to ensure safety on the open sea.',388),
('D20234441400005','SUAN202309220001','With the ambitious Ryuusui Nanami on board, Senkuu Ishigami and his team are almost ready to sail the seas and reach the other side of the world—where the bizarre green light that petrified humanity originated. Thanks to the revival of a skillful chef, enough food is being prepared for the entire crew, and the incredible reinvention of the GPS promises to ensure safety on the open sea.',388),
('D20234441400006','SUAN202309220001','With the ambitious Ryuusui Nanami on board, Senkuu Ishigami and his team are almost ready to sail the seas and reach the other side of the world—where the bizarre green light that petrified humanity originated. Thanks to the revival of a skillful chef, enough food is being prepared for the entire crew, and the incredible reinvention of the GPS promises to ensure safety on the open sea.',388),
('D20234441400007','SUAN202309220001','With the ambitious Ryuusui Nanami on board, Senkuu Ishigami and his team are almost ready to sail the seas and reach the other side of the world—where the bizarre green light that petrified humanity originated. Thanks to the revival of a skillful chef, enough food is being prepared for the entire crew, and the incredible reinvention of the GPS promises to ensure safety on the open sea.',388),
('D20234441400008','CLAB202308250001','are you yes man?',28),
('D20234441400009','CLAB202308250001','do you like playing game?',33),
('D20234701600001','CLAB202308250001','do you like watching anime?',34);

/*Table structure for table `histories` */

DROP TABLE IF EXISTS `histories`;

CREATE TABLE `histories` (
  `history_id` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`history_id`),
  KEY `username` (`username`),
  CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `histories` */

insert  into `histories`(`history_id`,`username`,`amount`,`date`) values 
('T1684915999164','Abe69',10000,'5/24/2007 15:13:19'),
('T1684916172164','Abe69',100000,'6/10/2007 15:16:12'),
('T1684916317484','Lorenza1',100000,'6/21/2007 15:18:37'),
('T1684916367649','Enid85',75000,'7/26/2007 15:19:27'),
('T1684916438181','Abe69',200000,'8/16/2007 15:20:38'),
('T1684916460166','Abe69',1000000,'9/12/2007 15:21:00'),
('T1684916466990','Abe69',500000,'10/31/2007 15:21:06'),
('T1684916474866','Abe69',650000,'11/8/2007 15:21:14'),
('T1684916484806','Abe69',19000,'12/31/2007 15:21:24'),
('T1684916490930','Abe69',67000,'1/16/2008 15:21:30'),
('W1684917113258','Winona70',50000,'5/23/2007 15:31:53'),
('W1684917165053','Winona70',50000,'8/20/2007 15:32:45'),
('W1684917172951','Winona70',100000,'10/25/2007 15:32:52'),
('W1684917177373','Winona70',25000,'1/5/2008 15:32:57'),
('W1684917182979','Winona70',200000,'2/7/2008 15:33:02'),
('W1684917191922','Winona70',300000,'7/23/2008 15:33:11'),
('W1684917225517','Winona70',250000,'12/16/2008 15:33:45');

/*Table structure for table `labels` */

DROP TABLE IF EXISTS `labels`;

CREATE TABLE `labels` (
  `label_id` varchar(255) NOT NULL,
  `data_id` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `label_result` text DEFAULT NULL,
  PRIMARY KEY (`label_id`),
  KEY `data_id` (`data_id`),
  KEY `username` (`username`),
  CONSTRAINT `labels_ibfk_1` FOREIGN KEY (`data_id`) REFERENCES `data` (`data_id`),
  CONSTRAINT `labels_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `labels` */

insert  into `labels`(`label_id`,`data_id`,`username`,`label_result`) values 
('L001','D20234441400008','Ray7','yes'),
('L002','D20234441400008','Akeem4','yes'),
('L003','D20234441400008','Frida58','no'),
('L004','D202342432000001','Rasheed76','Qwerty U10p!'),
('L005','D202342432000001','Alberto59','Qwerty U10p!'),
('L006','D202342432000001','Danial38','Qwerty U10p!'),
('L007','D202342432000001','Gardner26','Qwerty U10p!'),
('L008','D202342432000001','Tillman28','Qwerty U10p!'),
('L009','D202342432000001','Nicolette5','Qwerty U10p!'),
('L010','D202342432000003','King13','Qwerty U10p!'),
('L011','D202342432000003','Ezekiel97','Qwerty U10p!'),
('L012','D202342432000003','Krystel62','Qwerty U10p!'),
('L013','D202342432000003','Winona70','Qwerty U10p!'),
('L014','D202342432000003','Pattie20','Qwerty U10p!'),
('L015','D202342432000002','Mina54','Qwerty U10p!'),
('L016','D202342432000002','Clinton98','Qwerty U10p!'),
('L017','D202342432000002','Jenifer45','Qwerty U10p!'),
('L018','D202342432000002','Rhianna18','Qwerty U10p!'),
('L019','D20234441400008','Alberto59','Label of dummy data'),
('L020','D20234441400003','Alberto59','Label of dummy data'),
('L021','D20234441400004','Alberto59','Label of dummy data');

/*Table structure for table `possible_classifications` */

DROP TABLE IF EXISTS `possible_classifications`;

CREATE TABLE `possible_classifications` (
  `possible_id` varchar(255) NOT NULL,
  `task_id` varchar(255) DEFAULT NULL,
  `possible_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`possible_id`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `possible_classifications_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `possible_classifications` */

insert  into `possible_classifications`(`possible_id`,`task_id`,`possible_name`) values 
('CLABNO0001','CLAB202308250001','no'),
('CLABYS0001','CLAB202308250001','yes');

/*Table structure for table `sequelizemeta` */

DROP TABLE IF EXISTS `sequelizemeta`;

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `sequelizemeta` */

insert  into `sequelizemeta`(`name`) values 
('1-create-user.js'),
('2-create-task-type.js'),
('3-create-task.js'),
('4-create-data.js'),
('5-create-possible-classification.js'),
('6-create-label.js'),
('7-create-user-blacklist.js'),
('8-create-history.js');

/*Table structure for table `task_types` */

DROP TABLE IF EXISTS `task_types`;

CREATE TABLE `task_types` (
  `type_id` varchar(255) NOT NULL,
  `type_name` varchar(255) DEFAULT NULL,
  `price_char` int(11) DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `task_types` */

insert  into `task_types`(`type_id`,`type_name`,`price_char`) values 
('TT001','Classification',5),
('TT002','Summarization',10),
('TT003','Translation',15),
('TT004','Bot Summarization',5);

/*Table structure for table `tasks` */

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `task_id` varchar(255) NOT NULL,
  `type_id` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `max_labeller` int(11) DEFAULT NULL,
  `close_date` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `minimal_credibility` int(11) DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `type_id` (`type_id`),
  KEY `username` (`username`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `task_types` (`type_id`),
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `tasks` */

insert  into `tasks`(`task_id`,`type_id`,`username`,`max_labeller`,`close_date`,`status`,`minimal_credibility`) values 
('BOAB202308250001','TT004','Abe69',5,'2023-08-25','active',40),
('BOBR202307300001','TT004','Brenda99',25,'2023-07-30','active',50),
('BOOF202312310001','TT004','Ofelia55',2,'2023-12-31','active',95),
('BORO202308010001','TT004','Robert84',5,'2023-08-01','active',70),
('CLAB202308250001','TT001','Abe69',5,'2023-08-25','active',45),
('SUAN202306020001','TT002','Antoinette43',10,'2023-06-02','active',50),
('SUAN202309220001','TT002','Antoinette43',3,'2023-09-22','active',55),
('TRQU202305300001','TT003','Quentin44',50,'2023-05-30','active',20);

/*Table structure for table `user_blacklists` */

DROP TABLE IF EXISTS `user_blacklists`;

CREATE TABLE `user_blacklists` (
  `ban_id` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `task_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ban_id`),
  KEY `username` (`username`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `user_blacklists_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  CONSTRAINT `user_blacklists_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `user_blacklists` */

insert  into `user_blacklists`(`ban_id`,`username`,`task_id`) values 
('BD1','Winona70','TRQU202305300001'),
('BD2','Alberto59','TRQU202305300001'),
('BD3','Clinton98','TRQU202305300001'),
('BD4','King13','TRQU202305300001'),
('BD5','Rasheed76','TRQU202305300001'),
('BD6','Alberto59','CLAB202308250001'),
('BD7','Alberto59','SUAN202309220001');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `saldo` bigint(20) unsigned DEFAULT NULL,
  `credibility` int(11) DEFAULT 50,
  `profile_picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

insert  into `users`(`username`,`password`,`name`,`email`,`role`,`saldo`,`credibility`,`profile_picture`) values 
('Abe69','gMB3Q','Abe','Abe69@gmail.com','labeller',2646030,50,'Abe69.png'),
('Abigail93','xDVUh','Abigail','Abigail93@gmail.com','requester',0,50,NULL),
('Akeem4','ts7pB','Akeem','Akeem4@gmail.com','labeller',0,50,NULL),
('Alberto59','aBIXr','Alberto','Alberto59@gmail.com','labeller',0,35,NULL),
('Alberto94','5XLG8','Alberto','Alberto94@gmail.com','requester',0,50,NULL),
('Alvah47','XPlkE','Alvah','Alvah47@gmail.com','requester',0,50,NULL),
('Alyson37','RJnqJ','Alyson','Alyson37@gmail.com','labeller',0,50,NULL),
('Amira25','QQbpt','Amira','Amira25@gmail.com','labeller',0,50,NULL),
('Antoinette43','C9Jmx','Antoinette','Antoinette43@gmail.com','requester',0,50,NULL),
('Arianna87','phrgE','Arianna','Arianna87@gmail.com','labeller',0,50,NULL),
('Ashleigh34','PDvS1','Ashleigh','Ashleigh34@gmail.com','requester',0,50,NULL),
('Bennie49','EZZra','Bennie','Bennie49@gmail.com','labeller',0,50,NULL),
('Bobbie83','7nhD2','Bobbie','Bobbie83@gmail.com','labeller',0,50,NULL),
('Brenda99','EABTy','Brenda','Brenda99@gmail.com','requester',84725,50,NULL),
('Candelario80','3FtxY','Candelario','Candelario80@gmail.com','labeller',0,50,NULL),
('Candice92','rgpAY','Candice','Candice92@gmail.com','requester',0,50,NULL),
('Chanelle19','ub7sA','Chanelle','Chanelle19@gmail.com','labeller',0,50,NULL),
('Chester29','sGJ53','Chester','Chester29@gmail.com','labeller',0,50,NULL),
('Clinton98','Q0bA4','Clinton','Clinton98@gmail.com','labeller',0,45,NULL),
('Danial38','A1aIh','Danial','Danial38@gmail.com','labeller',0,50,NULL),
('Dejon65','b7vMi','Dejon','Dejon65@gmail.com','requester',0,50,NULL),
('Demetris68','ALQrS','Demetris','Demetris68@gmail.com','requester',0,50,NULL),
('Dennis66','aV1tj','Dennis','Dennis66@gmail.com','labeller',0,50,NULL),
('Deron33','HpXaZ','Deron','Deron33@gmail.com','requester',0,50,NULL),
('Diego8','ltbTp','Diego','Diego8@gmail.com','labeller',0,50,NULL),
('Donnie6','epDky','Donnie','Donnie6@gmail.com','labeller',0,50,NULL),
('Edythe10','HTtlp','Edythe','Edythe10@gmail.com','labeller',0,50,NULL),
('Emilio48','ixg78','Emilio','Emilio48@gmail.com','labeller',0,50,NULL),
('Enid85','uD1Ln','Enid','Enid85@gmail.com','requester',75000,50,NULL),
('Eugene90','QH1GO','Eugene','Eugene90@gmail.com','requester',0,50,NULL),
('Eulalia15','mWUvG','Eulalia','Eulalia15@gmail.com','requester',0,50,NULL),
('Ezekiel97','WUwIk','Ezekiel','Ezekiel97@gmail.com','labeller',0,50,NULL),
('Frida58','0HPCH','Frida','Frida58@gmail.com','labeller',0,50,NULL),
('Gardner26','D45SI','Gardner','Gardner26@gmail.com','labeller',0,50,NULL),
('Golden11','3uMs7','Golden','Golden11@gmail.com','labeller',0,50,NULL),
('Hector89','5yQDp','Hector','Hector89@gmail.com','labeller',0,50,NULL),
('Holly78','wRGRk','Holly','Holly78@gmail.com','requester',0,50,NULL),
('Jammie17','PIk4Z','Jammie','Jammie17@gmail.com','requester',0,50,NULL),
('Jaylon23','mrpHX','Jaylon','Jaylon23@gmail.com','requester',0,50,NULL),
('Jenifer45','YK9QT','Jenifer','Jenifer45@gmail.com','labeller',0,50,NULL),
('Jerry88','wE24e','Jerry','Jerry88@gmail.com','labeller',0,50,NULL),
('Joanny86','zId53','Joanny','Joanny86@gmail.com','requester',0,50,NULL),
('Johnathon14','0DvCY','Johnathon','Johnathon14@gmail.com','requester',0,50,NULL),
('Jordane50','wix0Y','Jordane','Jordane50@gmail.com','labeller',0,50,NULL),
('Julius31','6JM4e','Julius','Julius31@gmail.com','labeller',0,50,NULL),
('Kelvin42','6gLcj','Kelvin','Kelvin42@gmail.com','requester',0,50,NULL),
('Keon32','7bQY5','Keon','Keon32@gmail.com','labeller',0,50,NULL),
('King13','C2FlK','King','King13@gmail.com','labeller',0,45,NULL),
('Krystel62','CZyEW','Krystel','Krystel62@gmail.com','labeller',0,50,NULL),
('Leo39','ACaKa','Leo','Leo39@gmail.com','requester',0,50,NULL),
('Lester52','GihFv','Lester','Lester52@gmail.com','labeller',0,50,NULL),
('Lew81','Is3ba','Lew','Lew81@gmail.com','requester',0,50,NULL),
('Linnea95','mF2CX','Linnea','Linnea95@gmail.com','requester',0,50,NULL),
('Lonzo71','DDDWP','Lonzo','Lonzo71@gmail.com','labeller',0,50,NULL),
('Lorenza1','egR5t','Lorenza','Lorenza1@gmail.com','requester',100000,50,NULL),
('Loyce74','hGDgI','Loyce','Loyce74@gmail.com','labeller',0,50,NULL),
('Margaretta77','YcMdv','Margaretta','Margaretta77@gmail.com','requester',0,50,NULL),
('Margarette46','N18XT','Margarette','Margarette46@gmail.com','labeller',0,50,NULL),
('Marisa64','datDq','Marisa','Marisa64@gmail.com','requester',0,50,NULL),
('Marques2','QYBk4','Marques','Marques2@gmail.com','requester',0,50,NULL),
('Melissa21','Dop8n','Melissa','Melissa21@gmail.com','requester',0,50,NULL),
('Mikayla35','yxy9X','Mikayla','Mikayla35@gmail.com','requester',0,50,NULL),
('Miller16','917nG','Miller','Miller16@gmail.com','requester',0,50,NULL),
('Mina54','z5fWB','Mina','Mina54@gmail.com','labeller',0,50,NULL),
('Mireille96','2xfPx','Mireille','Mireille96@gmail.com','requester',0,50,NULL),
('Misael73','Gik7a','Misael','Misael73@gmail.com','requester',0,50,NULL),
('Nelle67','PA20P','Nelle','Nelle67@gmail.com','requester',0,50,NULL),
('Nicolette5','gRfvG','Nicolette','Nicolette5@gmail.com','labeller',0,50,NULL),
('Noah12','tjpTu','Noah','Noah12@gmail.com','labeller',0,50,NULL),
('Nora61','eimzc','Nora','Nora61@gmail.com','labeller',0,50,NULL),
('Norberto27','tJFMC','Norberto','Norberto27@gmail.com','labeller',0,50,NULL),
('Ofelia55','fNhEj','Ofelia','Ofelia55@gmail.com','requester',0,50,NULL),
('Oral30','273pm','Oral','Oral30@gmail.com','labeller',0,50,NULL),
('Oren41','4p7RH','Oren','Oren41@gmail.com','labeller',0,50,NULL),
('Oswaldo79','oXZZ9','Oswaldo','Oswaldo79@gmail.com','labeller',0,50,NULL),
('Otha63','CIecN','Otha','Otha63@gmail.com','labeller',0,50,NULL),
('Palma3','76FTp','Palma','Palma3@gmail.com','requester',0,50,NULL),
('Pattie20','7scrP','Pattie','Pattie20@gmail.com','labeller',0,50,NULL),
('Quentin44','51qNK','Quentin','Quentin44@gmail.com','requester',96935,50,NULL),
('Rasheed76','KCvrQ','Rasheed','Rasheed76@gmail.com','labeller',0,45,NULL),
('Raven36','23Scx','Raven','Raven36@gmail.com','requester',0,50,NULL),
('Ray7','A7I55','Ray','Ray7@gmail.com','labeller',0,65,NULL),
('Rebeka72','AbnOG','Rebeka','Rebeka72@gmail.com','labeller',0,50,NULL),
('Reyna56','36mdp','Reyna','Reyna56@gmail.com','labeller',0,50,NULL),
('Rhianna18','S8EPc','Rhianna','Rhianna18@gmail.com','labeller',0,50,NULL),
('Richard0','PFa3S','Richard','Richard0@gmail.com','labeller',0,50,NULL),
('Richard75','N15o7','Richard','Richard75@gmail.com','labeller',0,50,NULL),
('Ricky9','XdsnW','Ricky','Ricky9@gmail.com','labeller',0,50,NULL),
('Robert84','kKEtG','Robert','Robert84@gmail.com','requester',0,50,NULL),
('Ruthie57','VtGAe','Ruthie','Ruthie57@gmail.com','labeller',0,50,NULL),
('Savannah60','tWPuS','Savannah','Savannah60@gmail.com','labeller',0,50,NULL),
('Shyann91','bJRZU','Shyann','Shyann91@gmail.com','requester',0,50,NULL),
('Tatyana82','e6REp','Tatyana','Tatyana82@gmail.com','labeller',0,50,NULL),
('Terence40','JAZXi','Terence','Terence40@gmail.com','requester',0,50,NULL),
('Tillman28','7stFM','Tillman','Tillman28@gmail.com','labeller',0,50,NULL),
('Una53','icXu0','Una','Una53@gmail.com','requester',0,50,NULL),
('Wilmer24','XoX47','Wilmer','Wilmer24@gmail.com','labeller',0,50,NULL),
('Winfield51','MszLy','Winfield','Winfield51@gmail.com','labeller',0,50,NULL),
('Winona70','bZIy4','Winona','Winona70@gmail.com','labeller',25000,45,NULL),
('Zachery22','8KGjZ','Zachery','Zachery22@gmail.com','requester',0,50,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
