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
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `attachment` varchar(255) NOT NULL DEFAULT '0',
  `likes` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (4,1,'zearttr','azrteztg','0',1,'2020-07-01 21:30:35','2020-07-20 20:06:29'),(12,2,'User2','qsffg','0',0,'2020-07-03 17:30:32','2020-07-03 17:30:32'),(15,2,'User4','test message4','0',0,'2020-07-11 09:27:30','2020-07-11 09:27:30'),(16,1,'zearttr','azrteztg','0',0,'2020-07-11 12:50:46','2020-07-11 12:50:46'),(17,1,'zearttr','sqdfs','0',0,'2020-07-11 12:53:23','2020-07-11 12:53:23'),(18,1,'zearttr','azrteztg','0',0,'2020-07-11 12:54:46','2020-07-11 12:54:46'),(19,1,'zearttr','azrteztg','0',0,'2020-07-11 13:02:06','2020-07-11 13:02:06'),(21,1,'zearttrsqd','rhrherh qs d','0',0,'2020-07-11 13:03:48','2020-07-11 13:03:48'),(24,1,'zearttr','azrteztg','0',0,'2020-07-11 13:07:52','2020-07-11 13:07:52'),(25,1,'zearttr','azrteztg','0',0,'2020-07-11 13:08:11','2020-07-11 13:08:11'),(28,1,'zearttr','sqdfh','0',0,'2020-07-11 14:57:16','2020-07-11 14:57:16'),(30,1,'zearttr','BROKEN','0',0,'2020-07-14 16:03:14','2020-07-14 16:03:14'),(31,2,'REALLY WORKING??','rhrherh qs d','0',0,'2020-07-14 16:03:52','2020-07-22 17:22:49'),(32,2,'User4','test message4','0',0,'2020-07-14 16:09:54','2020-07-14 16:09:54'),(34,2,'User4','test message4','0',0,'2020-07-15 17:12:07','2020-07-15 17:12:07'),(35,2,'User4','test message4','0',8,'2020-07-15 17:12:19','2020-07-22 12:51:53'),(36,2,'User4','test message4','0',0,'2020-07-15 19:07:10','2020-07-15 19:07:10'),(37,2,'User4','test message4','0',0,'2020-07-15 19:07:48','2020-07-15 19:07:48'),(38,2,'User4','test message4','0',0,'2020-07-15 19:10:57','2020-07-15 19:10:57'),(39,1,'zearttr','rhrherh qs d','0',0,'2020-07-17 18:57:29','2020-07-17 18:57:29'),(47,1,'TEST USER1','TEST','0',0,'2020-07-22 17:12:50','2020-07-22 17:13:15'),(48,1,'TEST USER 1','test','0',0,'2020-07-22 18:04:41','2020-07-22 18:04:41'),(49,14,'USER 2','USER 2','0',0,'2020-07-22 19:27:43','2020-07-22 19:27:43'),(50,1,'NOW IS IT','VICTORY','0',0,'2020-07-22 20:45:08','2020-07-22 20:45:08');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
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
