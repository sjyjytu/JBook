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
INSERT INTO `book` VALUES (2,520.13,'do u love me',122,'i love u, i hate u. what do u think is love?','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552402553/udfwzzntf8f7tvbbiopc.jpg','web',0),(3,80.14,'Irromantic',0,'This book is about oh shit!','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552385967/gt7qrj1tx3nldxfj1h0w.jpg','kty',0),(4,88.3,'Love',8007,'It is a love story. Baby just say yes.','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552401189/qgns3eplde15qvtsipij.jpg','zzh',0),(5,15.05,'Robot',0,'This book is about robot.','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552373704/sw9lr0sgtdryg5tue4e1.jpg','yjy',0),(6,88.8,'tbclj',8000,'Tbc is a trash','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552373663/azdxqemgyqqkfzbvlf2s.jpg','yjy',0),(7,66.6,'tbcnbs',0,'Tbc is nbest.','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552381105/oiuz7qlqrkk8iskuvhqa.jpg','tbc',0),(8,89.54,'Computer',95,'this book is deeply about computer sys. If u read it, u will be very smart~','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552907199/pvbllinixosdl0s0pps9.jpg','QiZhengWei',0),(9,234,'Crazy',359,'i am so crazy~~~~~~~~~~~~~~~~~~~~~~~','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552907862/mg85lk2mrdngphlsimbn.jpg','Cc',0),(10,33,'Beautiful',9478,'baby u are so beeeeeeeeeautiful~!','https://res.cloudinary.com/dbqbt0cli/image/upload/v1552907973/e8kzd9uws3sea92cz36d.jpg','lyx',0),(17,88,'KTY Oracle',20,'this book is very beautiful~','https://res.cloudinary.com/dbqbt0cli/image/upload/v1553938432/jhfy2oumzsgptmutlsz0.jpg','ä»¥ä½å°',0),(23,3,'KTY Oracle',3,'3','https://res.cloudinary.com/dbqbt0cli/image/upload/v1553939472/uvfjrga7lqa9t3myh1vs.jpg','3',0),(34,2,'KTY Oracle',12,'321','https://res.cloudinary.com/dbqbt0cli/image/upload/v1553940567/if0faw3kr2lz9whqo8ne.jpg','ä»¥ä½å°',1),(39,3324,'ngf',321,'htrhtr','https://res.cloudinary.com/dbqbt0cli/image/upload/v1553942112/yglmiybyq0rvjihpawvy.jpg','htr',0),(40,520,'I Love Web',1004,'I love web very much. So I do the ebook...','https://res.cloudinary.com/dbqbt0cli/image/upload/v1553946331/wb6t6ufsa4ganrccu98l.jpg','二狗子',0),(41,80,'Web',29,'Web is so cool, and my teacher and TAs are so handsome!','https://res.cloudinary.com/dbqbt0cli/image/upload/v1554118395/bd15ja5gldgtahuwrbua.jpg','CHP',1);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
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
