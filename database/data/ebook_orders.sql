-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: ebook
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `orders` (
  `user_id` int(11) NOT NULL,
  `books` varchar(20000) NOT NULL,
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` varchar(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=552 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'[{\"num\": 3, \"bookname\": \"HelloWorld\"}]',527,'2019-03-09 16:00:00','57.35'),(1,'[{\"num\": 3, \"ISBN\": 9, \"bookname\": \"HelloWorld\"}, {\"num\": 4, \"ISBN\": 2, \"bookname\": \"Hate me\"}]',529,'2019-03-13 06:41:30','586.31'),(1,'[{\"num\": 3, \"ISBN\": 5, \"bookname\": \"Robot\"}, {\"num\": 4, \"ISBN\": 2, \"bookname\": \"Hate me\"}]',530,'2019-03-13 13:11:25','586.31'),(7,'[{\"num\": \"2\", \"ISBN\": 4, \"bookname\": \"Love\"}]',533,'2019-03-14 05:51:21','176.6'),(1,'[{\"num\": \"1\", \"ISBN\": 2, \"bookname\": \"Hate me\"}]',534,'2019-03-14 09:48:38','520.13'),(1,'[{\"num\": \"2\", \"ISBN\": 2, \"bookname\": \"Hate me\"}]',535,'2019-03-14 10:02:40','520.13'),(1,'[{\"num\": 9, \"ISBN\": 2, \"bookname\": \"Hate me\"}, {\"num\": 11, \"ISBN\": 4, \"bookname\": \"Love\"}]',536,'2019-03-14 10:05:17','608.43'),(1,'[{\"num\": \"5\", \"ISBN\": 2, \"bookname\": \"Hate me\"}]',537,'2019-03-14 10:42:05','520.13'),(1,'[{\"num\": 4, \"ISBN\": 4, \"bookname\": \"Love\"}]',538,'2019-03-14 10:42:44','88.3'),(7,'[{\"num\": \"123\", \"ISBN\": 2, \"bookname\": \"Hate me\"}]',539,'2019-03-18 05:54:41','520.13'),(4,'[{\"num\": \"1\", \"ISBN\": 5, \"bookname\": \"Robot\"}]',540,'2019-03-18 05:56:02','15.05'),(4,'[{\"num\": 2000, \"ISBN\": 6, \"bookname\": \"tbclj\"}, {\"num\": 23, \"ISBN\": 4, \"bookname\": \"Love\"}, {\"num\": 230, \"ISBN\": 2, \"bookname\": \"Hate me\"}, {\"num\": 333, \"ISBN\": 7, \"bookname\": \"tbcnb\"}]',541,'2019-03-18 05:58:41','763.82996'),(9,'[{\"num\": \"2\", \"ISBN\": 3, \"bookname\": \"Irromantic\"}]',542,'2019-03-30 09:17:55','80.14'),(9,'[{\"num\": 12, \"ISBN\": 3, \"bookname\": \"Irromantic\"}]',543,'2019-03-30 09:31:53','80.14'),(10,'[{\"num\": \"2\", \"ISBN\": 2, \"bookname\": \"Hate me\"}]',544,'2019-03-30 09:42:48','520.13'),(9,'[{\"num\": \"60\", \"ISBN\": 40, \"bookname\": \"I Love Web\"}]',545,'2019-03-30 11:46:51','520.0'),(11,'[{\"num\": \"250\", \"ISBN\": 40, \"bookname\": \"I Love Web\"}]',546,'2019-04-01 11:31:20','520.0'),(13,'[{\"num\": 3, \"ISBN\": 2, \"bookname\": \"Hate\"}, {\"num\": 1, \"ISBN\": 3, \"bookname\": \"Hate\"}]',547,'2019-04-22 11:52:57','1640.53'),(13,'[{\"num\": 3, \"ISBN\": 2, \"bookname\": \"Hate\"}, {\"num\": 1, \"ISBN\": 11, \"bookname\": \"Hate\"}]',548,'2019-04-22 11:54:34','1562.3899999999999'),(7,'[{\"num\": 1, \"ISBN\": 5, \"bookname\": \"Robot\"}, {\"num\": 333, \"ISBN\": 7, \"bookname\": \"tbcnb\"}]',549,'2019-04-22 11:57:15','22192.85'),(4,'[{\"num\":4,\"isbn\":8,\"bookname\":\"Computer\"}]',550,'2019-04-25 02:49:10','358.16'),(4,'[{\"num\":\"21\",\"isbn\":39,\"bookname\":\"ngf\"}]',551,'2019-04-25 04:20:20','69804.0');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-26 20:43:49
