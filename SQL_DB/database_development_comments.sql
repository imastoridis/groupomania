-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: database_development
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `attachment` varchar(255) NOT NULL DEFAULT '0',
  `likes` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `messageId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comments_messages2` (`messageId`),
  KEY `fk_comments_users2` (`userId`),
  CONSTRAINT `fk_comments_messages2` FOREIGN KEY (`messageId`) REFERENCES `messages` (`id`),
  CONSTRAINT `fk_comments_users2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (118,'FINNALYYYYY','0',0,'2020-07-19 11:45:44','2020-07-19 11:45:44',4,1),(119,'VICTORY','0',0,'2020-07-19 11:47:13','2020-07-19 11:47:13',4,1),(120,'VICTORY','0',0,'2020-07-19 11:48:37','2020-07-19 11:48:37',4,1),(121,'VICTORYs','0',0,'2020-07-19 11:50:17','2020-07-19 11:50:17',4,1),(138,'qsfg','0',0,'2020-07-22 13:48:10','2020-07-22 13:48:10',15,1),(139,'dhfh','0',0,'2020-07-22 13:48:21','2020-07-22 13:48:21',15,1),(140,'ghf','0',0,'2020-07-22 13:48:31','2020-07-22 13:48:31',15,1),(157,'fsqfqs','0',0,'2020-07-22 19:27:04','2020-07-22 19:27:04',48,1),(159,'gdsdgs','0',0,'2020-07-22 19:27:52','2020-07-22 19:27:52',49,14),(161,'dsght','0',0,'2020-07-22 19:29:11','2020-07-22 19:29:11',31,14),(163,'qsfg','0',0,'2020-07-22 19:40:03','2020-07-22 19:40:03',31,1);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-22 23:53:35
