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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test@test.com','john2','$2b$10$D5aOuAeCpto/9BOQt4AoI.nRRKOMjz10PA2qaGpaflO/VV.Jpm8ce','hello 22',0,'2020-07-01 16:57:30','2020-07-20 06:37:05'),(2,'test1@test.com','johny','$2b$10$dZJGKu6tFcE1yc4A5s7Q9ebvEzNtkcZqZXinwK8QP8uZeE406g0Qi','hello 4',0,'2020-07-03 14:35:55','2020-07-20 19:17:28'),(3,'imastoridis@gmail.com','imastoridis','$2b$10$pvG3z8RENTfCfbVTc/d8..D/Vi1304NWoP62HMaqc2YbGLTqGkXLi',NULL,0,'2020-07-03 18:30:25','2020-07-03 18:30:25'),(4,'test2@test.com','test2','$2b$10$iqFukFg6qpPMC0zoyPvi4e//oOIAK4sY2T.aUMO8FxSoY5H/nvu7m',NULL,0,'2020-07-05 11:22:49','2020-07-05 11:22:49'),(5,'test3@test.com','john','$2b$10$5YRomp1d4enlrVhV2WhNluPupIRn8pVo.ALaXqOq2w2H6EwGC76QC',NULL,0,'2020-07-05 14:46:39','2020-07-05 14:46:39'),(6,'test4@test.com','john','$2b$10$TozowLEXzf..EioAKQn2ouyFCT9X2U/P42Whlh.CiFeYbhfJrfC3O',NULL,0,'2020-07-05 14:47:17','2020-07-05 14:47:17'),(7,'test5@test.com','john','$2b$10$k3m2zQZz5VErp/czhsA41.FuJmNgZzZtMMKBtQSXYJsX2aS0pDRpy',NULL,0,'2020-07-05 15:03:28','2020-07-05 15:03:28'),(8,'test6@test.com','john','$2b$10$XxiN02cuNoJaU3nuo/AnXO7JzrdNI9eY4yAaKurKx8RPAZB6GAkYC',NULL,0,'2020-07-05 15:05:15','2020-07-05 15:05:15'),(9,'test7@test.com','john','$2b$10$8sFIr0zL1XIRJBm2/2EyOOYDnruS9X1HlbWn6ksj7ak1JBuiiWlpm',NULL,0,'2020-07-05 15:06:55','2020-07-05 15:06:55'),(10,'test8@test.com','john','$2b$10$pvtNHwMPnkWUKIYoy1Wz1uHCsAFjD5O6WsBjc0GxrSCe/HZbPCIQG',NULL,0,'2020-07-05 15:07:40','2020-07-05 15:07:40'),(11,'test10@test.com','john','$2b$10$qX7RLhJTv.0AbYCgCR9drOrwaAOSFMomktaXf7y50Zzuj4MIc1lZK',NULL,0,'2020-07-05 16:23:34','2020-07-05 16:23:34'),(12,'test11@test.com','john','$2b$10$HxjZqOym9pJYoaPHVtt4Xe6DpU/acNApgXlz8IYltW.Rpff0AGrLe',NULL,0,'2020-07-11 13:35:22','2020-07-11 13:35:22'),(13,'test12@test.com','john','$2b$10$S1WOvLUvWB.q2YevZisWKeWhHSKvm40dGUwkY4AiXpyEM4d6pCjrK',NULL,0,'2020-07-11 13:38:03','2020-07-11 13:38:03'),(14,'test111@test.com','Mark','$2b$10$N4SBXXUSMCELM1wxo7G67ujKXSjQ40zUpwIOcQz4nbugM0U1eRdjm',NULL,0,'2020-07-18 17:17:43','2020-07-18 17:17:43');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
