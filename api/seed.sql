-- MySQL dump 10.13  Distrib 5.7.23, for Linux (x86_64)
--
-- Host: localhost    Database: choochoo
-- ------------------------------------------------------
-- Server version	5.7.23-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `migration_versions`
--

DROP TABLE IF EXISTS `migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migration_versions` (
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `train_line`
--

DROP TABLE IF EXISTS `train_line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `train_line` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetimetz_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetimetz_immutable)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `train_line_route`
--

DROP TABLE IF EXISTS `train_line_route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `train_line_route` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `train_line_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetimetz_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetimetz_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_E56D9867C95038D9` (`train_line_id`),
  CONSTRAINT `FK_E56D986798ED2649` FOREIGN KEY (`train_line_id`) REFERENCES `train_line` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `train_line_run`
--

DROP TABLE IF EXISTS `train_line_run`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `train_line_run` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `train_line_id` int(11) NOT NULL,
  `operator_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetimetz_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetimetz_immutable)',
  `train_line_route_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_C464F61BC95038D9` (`train_line_id`),
  KEY `IDX_C464F61B584598A3` (`operator_id`),
  KEY `IDX_C464F61BA1420587` (`train_line_route_id`),
  CONSTRAINT `FK_C464F61B251935C` FOREIGN KEY (`operator_id`) REFERENCES `train_operator` (`id`),
  CONSTRAINT `FK_C464F61B98ED2649` FOREIGN KEY (`train_line_id`) REFERENCES `train_line` (`id`),
  CONSTRAINT `FK_C464F61BA1420587` FOREIGN KEY (`train_line_route_id`) REFERENCES `train_line_route` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `train_operator`
--

DROP TABLE IF EXISTS `train_operator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `train_operator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `train_line_id` int(11) NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetimetz_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetimetz_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_B0FFC600C95038D9` (`train_line_id`),
  CONSTRAINT `FK_B0FFC60098ED2649` FOREIGN KEY (`train_line_id`) REFERENCES `train_line` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-26  3:24:15
