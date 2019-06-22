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
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `book` (
  `isbn` int(13) NOT NULL AUTO_INCREMENT,
  `price` float NOT NULL,
  `bookname` varchar(255) NOT NULL,
  `stock_num` int(11) NOT NULL,
  `summary` varchar(255) NOT NULL,
  `picture_url` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`isbn`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (2,520.13,'do u love me',102,'i love u, i hate u. what do u think is love?','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552402553/udfwzzntf8f7tvbbiopc.jpg','web',0),(3,80.14,'Irromantic',0,'This book is about oh shit!','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552385967/gt7qrj1tx3nldxfj1h0w.jpg','kty',0),(4,88.3,'Love',8007,'It is a love story. Baby just say yes.','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552401189/qgns3eplde15qvtsipij.jpg','zzh',0),(5,15.05,'Robot',0,'This book is about robot.','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552373704/sw9lr0sgtdryg5tue4e1.jpg','yjy',0),(6,88.8,'tbclj',8000,'Tbc is a trash','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552373663/azdxqemgyqqkfzbvlf2s.jpg','yjy',0),(7,66.6,'tbcnbs',0,'Tbc is nbest.','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552381105/oiuz7qlqrkk8iskuvhqa.jpg','tbc',0),(8,89.54,'Computer',95,'this book is deeply about computer sys. If u read it, u will be very smart~','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552907199/pvbllinixosdl0s0pps9.jpg','QiZhengWei',0),(9,234,'Crazy',359,'i am so crazy~~~~~~~~~~~~~~~~~~~~~~~','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552907862/mg85lk2mrdngphlsimbn.jpg','Cc',0),(10,33,'Beautiful',9478,'baby u are so beeeeeeeeeautiful~!','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552907973/e8kzd9uws3sea92cz36d.jpg','lyx',0),(17,88,'KTY Oracle',20,'this book is very beautiful~','https://res.cloudinary.com/dbqbt0cli/image/upload/v1553938432/jhfy2oumzsgptmutlsz0.jpg','ä»¥ä½å°',0),(23,3,'KTY Oracle',3,'3','https://res.cloudinary.com/dbqbt0cli/image/upload/v1553939472/uvfjrga7lqa9t3myh1vs.jpg','3',0),(34,2,'KTY Oracle',12,'321','https://res.cloudinary.com/dbqbt0cli/image/upload/v1553940567/if0faw3kr2lz9whqo8ne.jpg','ä»¥ä½å°',1),(39,3324,'ngf',321,'htrhtr','https://res.cloudinary.com/dbqbt0cli/image/upload/v1553942112/yglmiybyq0rvjihpawvy.jpg','htr',0),(40,520,'I Love Web',1004,'I love web very much. So I do the ebook...','https://res.cloudinary.com/dbqbt0cli/image/upload/v1553946331/wb6t6ufsa4ganrccu98l.jpg','二狗子',0),(41,80,'Web',29,'Web is so cool, and my teacher and TAs are so handsome!','https://res.cloudinary.com/dbqbt0cli/image/upload/v1554118395/bd15ja5gldgtahuwrbua.jpg','CHP',1);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cart` (
  `user_id` int(11) NOT NULL,
  `books` varchar(20000) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (4,'[{\"num\":57,\"isbn\":40,\"bookname\":\"I Love Web\"}]'),(8,'[{\"num\":5,\"isbn\":4,\"bookname\":\"Love\"}]'),(10,'[{\"ISBN\":2,\"num\":4,\"bookname\":\"Hate me\"}]'),(11,'[{\"bookname\":\"Love\",\"num\":80,\"ISBN\":4}]'),(22,'[{\"ISBN\":4,\"num\":3,\"bookname\":\"Love\"}]');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=553 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'[{\"num\": 3, \"bookname\": \"HelloWorld\"}]',527,'2019-03-09 16:00:00','57.35'),(1,'[{\"num\": 3, \"ISBN\": 9, \"bookname\": \"HelloWorld\"}, {\"num\": 4, \"ISBN\": 2, \"bookname\": \"Hate me\"}]',529,'2019-03-13 06:41:30','586.31'),(1,'[{\"num\": 3, \"ISBN\": 5, \"bookname\": \"Robot\"}, {\"num\": 4, \"ISBN\": 2, \"bookname\": \"Hate me\"}]',530,'2019-03-13 13:11:25','586.31'),(7,'[{\"num\": \"2\", \"ISBN\": 4, \"bookname\": \"Love\"}]',533,'2019-03-14 05:51:21','176.6'),(1,'[{\"num\": \"1\", \"ISBN\": 2, \"bookname\": \"Hate me\"}]',534,'2019-03-14 09:48:38','520.13'),(1,'[{\"num\": \"2\", \"ISBN\": 2, \"bookname\": \"Hate me\"}]',535,'2019-03-14 10:02:40','520.13'),(1,'[{\"num\": 9, \"ISBN\": 2, \"bookname\": \"Hate me\"}, {\"num\": 11, \"ISBN\": 4, \"bookname\": \"Love\"}]',536,'2019-03-14 10:05:17','608.43'),(1,'[{\"num\": \"5\", \"ISBN\": 2, \"bookname\": \"Hate me\"}]',537,'2019-03-14 10:42:05','520.13'),(1,'[{\"num\": 4, \"ISBN\": 4, \"bookname\": \"Love\"}]',538,'2019-03-14 10:42:44','88.3'),(7,'[{\"num\": \"123\", \"ISBN\": 2, \"bookname\": \"Hate me\"}]',539,'2019-03-18 05:54:41','520.13'),(4,'[{\"num\": \"1\", \"ISBN\": 5, \"bookname\": \"Robot\"}]',540,'2019-03-18 05:56:02','15.05'),(4,'[{\"num\": 2000, \"ISBN\": 6, \"bookname\": \"tbclj\"}, {\"num\": 23, \"ISBN\": 4, \"bookname\": \"Love\"}, {\"num\": 230, \"ISBN\": 2, \"bookname\": \"Hate me\"}, {\"num\": 333, \"ISBN\": 7, \"bookname\": \"tbcnb\"}]',541,'2019-03-18 05:58:41','763.82996'),(9,'[{\"num\": \"2\", \"ISBN\": 3, \"bookname\": \"Irromantic\"}]',542,'2019-03-30 09:17:55','80.14'),(9,'[{\"num\": 12, \"ISBN\": 3, \"bookname\": \"Irromantic\"}]',543,'2019-03-30 09:31:53','80.14'),(10,'[{\"num\": \"2\", \"ISBN\": 2, \"bookname\": \"Hate me\"}]',544,'2019-03-30 09:42:48','520.13'),(9,'[{\"num\": \"60\", \"ISBN\": 40, \"bookname\": \"I Love Web\"}]',545,'2019-03-30 11:46:51','520.0'),(11,'[{\"num\": \"250\", \"ISBN\": 40, \"bookname\": \"I Love Web\"}]',546,'2019-04-01 11:31:20','520.0'),(13,'[{\"num\": 3, \"ISBN\": 2, \"bookname\": \"Hate\"}, {\"num\": 1, \"ISBN\": 3, \"bookname\": \"Hate\"}]',547,'2019-04-22 11:52:57','1640.53'),(13,'[{\"num\": 3, \"ISBN\": 2, \"bookname\": \"Hate\"}, {\"num\": 1, \"ISBN\": 11, \"bookname\": \"Hate\"}]',548,'2019-04-22 11:54:34','1562.3899999999999'),(7,'[{\"num\": 1, \"ISBN\": 5, \"bookname\": \"Robot\"}, {\"num\": 333, \"ISBN\": 7, \"bookname\": \"tbcnb\"}]',549,'2019-04-22 11:57:15','22192.85'),(4,'[{\"num\":4,\"isbn\":8,\"bookname\":\"Computer\"}]',550,'2019-04-25 02:49:10','358.16'),(4,'[{\"num\":\"21\",\"isbn\":39,\"bookname\":\"ngf\"}]',551,'2019-04-25 04:20:20','69804.0'),(8,'[{\"num\":\"20\",\"isbn\":2,\"bookname\":\"do u love me\"}]',552,'2019-06-22 03:08:54','10402.6');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `is_manager` tinyint(1) NOT NULL DEFAULT '0',
  `is_banned` tinyint(1) NOT NULL DEFAULT '0',
  `code` varchar(45) NOT NULL DEFAULT '',
  `state` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'yjy','123','123@qq.com',1,0,'',1),(2,'lyx','123','222@qq.com',1,0,'',1),(3,'ldt','123','111@qq.com',0,0,'',1),(4,'jyjy','123','2123@qq.com',0,1,'',0),(7,'xfc','123','123@qq.com',0,1,'',1),(8,'hello','123','bbb',0,0,'',1),(9,'yjy2','123','22@22',0,0,'',1),(10,'yjy3','123','22@22',0,0,'',1),(12,'yjy4','111111','are u sb',0,0,'',1),(13,'yjy5','111111','are u sb',0,0,'',1),(14,'yjy6','111111','are u sb',0,0,'',1),(15,'jyjy9','123','1332372004@qq.com',0,0,'64759581446760845902',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-22 11:15:15
