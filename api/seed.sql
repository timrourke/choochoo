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

INSERT INTO train_line VALUE (1, 'El', NOW(), NOW());
INSERT INTO train_line VALUE (2, 'Metra', NOW(), NOW());
INSERT INTO train_line VALUE (3, 'Amtrak', NOW(), NOW());

ALTER TABLE train_line_route AUTO_INCREMENT = 1;
INSERT INTO train_line_route VALUES (default, 1, 'Blue Line', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 1, 'Green Line', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 1, 'Yellow Line', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 1, 'Purple Line', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 1, 'Orange Line', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 1, 'Brown Line', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 1, 'Red Line', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 1, 'Pink Line', NOW(), NOW());

INSERT INTO train_line_route VALUES (default, 2, 'BNSF Railway', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 2, 'Heritage Corridor', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 2, 'Metra Electric District', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 2, 'Milwaukee District / North', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 2, 'Milwaukee District / West', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 2, 'North Central Service', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 2, 'Rock Island District', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 2, 'SouthWest Service', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 2, 'Union Pacific / North', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 2, 'Union Pacific / Northwest', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 2, 'Union Pacific / West', NOW(), NOW());

INSERT INTO train_line_route VALUES (default, 3, 'Auto Train', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Capitol Limited', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'City of New Orleans', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Downeaster', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Ethan Allen Express', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Hoosier State', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Lake Shore Limited', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Missouri River Runner', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Pennsylvanian', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Southwest Chief', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Vermonter', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Adirondack', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'California Zephyr', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Cardinal', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Coast Starlight', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Empire Builder', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Heartland Flyer', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Illinois Service', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Maple Leaf', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Northeast Regional', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'San Joaquins', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Sunset Limited', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Amtrak Cascades', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Capitol Corridor', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Carolinian / Piedmont', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Crescent', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Empire Service', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Hiawatha', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Keystone Service', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Michigan Services', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Pacific Surfliner', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Silver Service/Palmetto', NOW(), NOW());
INSERT INTO train_line_route VALUES (default, 3, 'Texas Eagle', NOW(), NOW());

ALTER TABLE train_operator AUTO_INCREMENT = 1;
INSERT INTO train_operator VALUES (default, 1, 'Michell', 'Tiebe', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Reade', 'Burnyate', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Liv', 'Clayson', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Normand', 'Ashplant', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Shelly', 'Pennini', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Bronnie', 'Kill', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Zaccaria', 'McReynolds', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Willetta', 'Totaro', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Pammi', 'MacCracken', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Ingmar', 'Youson', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Quincey', 'Spaice', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Rube', 'Bolger', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Cortie', 'Carillo', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Boot', 'Danilenko', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Lesley', 'Hatwells', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Jerry', 'Hanner', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Devin', 'Gherarducci', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Buiron', 'Konmann', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Shelbi', 'Ainsbury', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Brooks', 'Gouldstraw', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Elicia', 'Ironmonger', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Glenden', 'Zimmermeister', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Germayne', 'Digges', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Lara', 'Surmon', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Catha', 'Malecky', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 1, 'Alanah', 'Balazs', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Nelle', 'Euston', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Kip', 'Syred', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Cassandra', 'Faulder', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Ursulina', 'Giovanni', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Roxie', 'Flanigan', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Dagmar', 'Calrow', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Moina', 'Claus', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Kristyn', 'Oaker', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Mireille', 'Dulake', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Mathias', 'Jordi', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Jemmy', 'O', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Hilton', 'Feehely', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Ansel', 'Hartin', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Ranee', 'Graybeal', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Mignon', 'Foggo', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Johny', 'Slidders', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Rosemonde', 'Avison', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Boone', 'Keiling', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Berk', 'Hullbrook', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Korry', 'Wyndham', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Timmi', 'Hotson', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Amalee', 'Vaulkhard', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Heloise', 'Ellor', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Stevana', 'Mogg', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Maurene', 'Mayger', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Eddi', 'Vamplew', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Lyell', 'Metham', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Salomone', 'Pray', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Francine', 'Sayse', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Lowell', 'DeCourtney', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Mirilla', 'Nollet', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Torey', 'Clubley', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'York', 'Gledstane', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Robena', 'Falkinder', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Aleda', 'Dripps', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Roslyn', 'Hughman', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Lamond', 'Eady', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Coleen', 'Doylend', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Kaylil', 'Bellino', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Papageno', 'Scad', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Rick', 'Troyes', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Wynny', 'Mesias', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Goober', 'Baxstair', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Abagail', 'Lockner', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Judie', 'Stopher', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Janelle', 'Williment', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Shae', 'Ree', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Rycca', 'Cram', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Birgit', 'Heindrich', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Pierrette', 'Morten', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Mahalia', 'Daudray', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Renaldo', 'Smithend', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Zenia', 'Rany', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Latrina', 'Sherland', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Salem', 'Kaser', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Jessalin', 'Karchowski', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Winfield', 'Ciccerale', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Audy', 'Nestle', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Nap', 'Maletratt', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Donelle', 'Mocher', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Fabiano', 'Epp', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Donny', 'Cumberland', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Fritz', 'Schonfeld', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Petronilla', 'McKomb', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Alvis', 'Sympson', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Sloan', 'Pilmer', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Corny', 'Scrogges', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Sauveur', 'Henighan', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Ambrosio', 'Wyche', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Theadora', 'Craddock', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Arabelle', 'Kidwell', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Giraud', 'Habden', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Shaughn', 'Gorick', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 2, 'Cornie', 'Stockey', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Horatius', 'Ost', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Christye', 'Everett', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Margret', 'Soldan', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Selene', 'Scrafton', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Winonah', 'Pendock', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Joete', 'Satterfitt', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Chloette', 'Redparth', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Ilene', 'Cardus', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Junina', 'Chenery', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Fran', 'Collings', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Efrem', 'Wadelin', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Archibold', 'Ornils', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Ruby', 'Croutear', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Worden', 'Brandli', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Rora', 'Poyner', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Chrystel', 'Bellfield', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Blanch', 'Ickovitz', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Felicity', 'Attac', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Jacquie', 'Duligall', NOW(), NOW());
INSERT INTO train_operator VALUES (default, 3, 'Halette', 'Blackly', NOW(), NOW());

ALTER TABLE train_line_run AUTO_INCREMENT = 1;
INSERT INTO train_line_run VALUES (default, 1, 1, NOW(), NOW(), 1);
INSERT INTO train_line_run VALUES (default, 1, 2, NOW(), NOW(), 2);
INSERT INTO train_line_run VALUES (default, 1, 3, NOW(), NOW(), 3);
INSERT INTO train_line_run VALUES (default, 1, 3, NOW(), NOW(), 4);

INSERT INTO train_line_run VALUES (default, 2, 21, NOW(), NOW(), 15);
INSERT INTO train_line_run VALUES (default, 2, 22, NOW(), NOW(), 16);
INSERT INTO train_line_run VALUES (default, 2, 22, NOW(), NOW(), 16);
INSERT INTO train_line_run VALUES (default, 2, 23, NOW(), NOW(), 17);
INSERT INTO train_line_run VALUES (default, 2, 23, NOW(), NOW(), 18);

INSERT INTO train_line_run VALUES (default, 3, 118, NOW(), NOW(), 42);
-- Dump completed on 2018-10-26  3:24:15
