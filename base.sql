-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: megafon
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `idauth` int NOT NULL,
  `login` varchar(45) NOT NULL,
  `passwd` varchar(45) NOT NULL,
  PRIMARY KEY (`idauth`),
  UNIQUE KEY `idauth_UNIQUE` (`idauth`),
  UNIQUE KEY `login_UNIQUE` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` VALUES (1,'Топ-менеджер','admin'),(2,'Менеджер','admin');
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `switchboar items`
--

DROP TABLE IF EXISTS `switchboar items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `switchboar items` (
  `SwitchboardID` int NOT NULL,
  `ItemNumber` int NOT NULL,
  `ItemText` varchar(45) DEFAULT NULL,
  `Command` int DEFAULT NULL,
  `Argument` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`SwitchboardID`),
  UNIQUE KEY `SwitchboardID_UNIQUE` (`SwitchboardID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `switchboar items`
--

LOCK TABLES `switchboar items` WRITE;
/*!40000 ALTER TABLE `switchboar items` DISABLE KEYS */;
/*!40000 ALTER TABLE `switchboar items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `должности`
--

DROP TABLE IF EXISTS `должности`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `должности` (
  `Код_должности` int NOT NULL,
  `Код_компании` varchar(45) DEFAULT NULL,
  `Наименование_должности` varchar(45) DEFAULT NULL,
  `Оклад` int DEFAULT NULL,
  PRIMARY KEY (`Код_должности`),
  UNIQUE KEY `Код_должности_UNIQUE` (`Код_должности`),
  UNIQUE KEY `Наименование_должности_UNIQUE` (`Наименование_должности`),
  KEY `Код_компании_idx` (`Код_компании`) /*!80000 INVISIBLE */,
  KEY `Наименование_должности_idx` (`Наименование_должности`),
  CONSTRAINT `Код_компании` FOREIGN KEY (`Код_компании`) REFERENCES `компания` (`Название_компании`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `должности`
--

LOCK TABLES `должности` WRITE;
/*!40000 ALTER TABLE `должности` DISABLE KEYS */;
INSERT INTO `должности` VALUES (1,'ПАО \"Мегафон\"','Продавец',5000),(2,'ПАО \"Мегафон\"','Уборщик',7000),(3,'ПАО \"Мегафон\"','Администратор',7000);
/*!40000 ALTER TABLE `должности` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `заказы`
--

DROP TABLE IF EXISTS `заказы`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `заказы` (
  `Код_заказа` int NOT NULL,
  `Код_клиента` varchar(45) DEFAULT NULL,
  `Код_компании` varchar(45) DEFAULT NULL,
  `Дата_заказа` date DEFAULT NULL,
  `Безналичный_расчет` tinyint DEFAULT NULL,
  `Код_сотрудника` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Код_заказа`),
  KEY `Код_клиента_idx_FK_idx` (`Код_клиента`),
  KEY `Код_компании_idx_FK_idx` (`Код_компании`),
  KEY `Код_сотрудника_idx_FK_заказы_idx` (`Код_сотрудника`),
  CONSTRAINT `Код_клиента_idx_FK` FOREIGN KEY (`Код_клиента`) REFERENCES `клиенты` (`ФИО_клиента`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Код_компании_idx_FK` FOREIGN KEY (`Код_компании`) REFERENCES `компания` (`Название_компании`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Код_сотрудника_idx_FK_заказы` FOREIGN KEY (`Код_сотрудника`) REFERENCES `сотрудники` (`ФИО_сотрудника`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `заказы`
--

LOCK TABLES `заказы` WRITE;
/*!40000 ALTER TABLE `заказы` DISABLE KEYS */;
INSERT INTO `заказы` VALUES (1,'Брызгалов Максим Андреевич','ПАО \"Мегафон\"','2022-10-05',0,'Марьин Иван Петрович');
/*!40000 ALTER TABLE `заказы` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `клиенты`
--

DROP TABLE IF EXISTS `клиенты`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `клиенты` (
  `Код_клиента` int NOT NULL,
  `ФИО_клиента` varchar(45) DEFAULT NULL,
  `Код_компании` varchar(45) DEFAULT NULL,
  `Контактный_телефон_клиента` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Код_клиента`),
  UNIQUE KEY `Код_клиента_UNIQUE` (`Код_клиента`) /*!80000 INVISIBLE */,
  KEY `clientCompany_idx` (`Код_компании`),
  KEY `ФИО_idx` (`ФИО_клиента`),
  CONSTRAINT `clientCompany` FOREIGN KEY (`Код_компании`) REFERENCES `компания` (`Название_компании`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `клиенты`
--

LOCK TABLES `клиенты` WRITE;
/*!40000 ALTER TABLE `клиенты` DISABLE KEYS */;
INSERT INTO `клиенты` VALUES (1,'Брызгалов Максим Андреевич','ПАО \"Мегафон\"','906-61-67'),(2,'Сергеев Максим Андреевич','ПАО \"Мегафон\"','906-61-61'),(3,'Иванов Иван Иванович','ПАО \"Мегафон\"','906-61-69'),(4,'Ванюков Иван Ванов','ПАО \"Мегафон\"','906-61-60'),(5,'Ванюков Иван Ванов','ПАО \"Мегафон\"','906-61-51');
/*!40000 ALTER TABLE `клиенты` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `компания`
--

DROP TABLE IF EXISTS `компания`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `компания` (
  `Код компании` int NOT NULL,
  `Название_компании` varchar(45) DEFAULT NULL,
  `ФИО_директора` varchar(45) DEFAULT NULL,
  `Телефон_компании` varchar(45) DEFAULT NULL,
  `Адрес_компании` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Код компании`),
  UNIQUE KEY `Код компании_UNIQUE` (`Код компании`),
  UNIQUE KEY `Название компании_UNIQUE` (`Название_компании`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `компания`
--

LOCK TABLES `компания` WRITE;
/*!40000 ALTER TABLE `компания` DISABLE KEYS */;
INSERT INTO `компания` VALUES (1,'ПАО \"Мегафон\"','Юсупов Хачатур Эдуардович','+7(495)-232-23-00','127006, город Москва, Оружейный пер., д. 41');
/*!40000 ALTER TABLE `компания` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `поставщики`
--

DROP TABLE IF EXISTS `поставщики`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `поставщики` (
  `Код_поставщика` int NOT NULL,
  `Название_компании_поставщика` varchar(45) DEFAULT NULL,
  `Код_компании` varchar(45) DEFAULT NULL,
  `Контактный_телефон` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Код_поставщика`),
  UNIQUE KEY `idпоставщики_UNIQUE` (`Код_поставщика`),
  KEY `Код_компании_FK_provider` (`Код_компании`),
  KEY `Код_компании_FK_provider_idx` (`Код_компании`) /*!80000 INVISIBLE */,
  KEY `Код_компанииFkProviderIdx` (`Код_компании`) /*!80000 INVISIBLE */,
  CONSTRAINT `Код_компании_provider1` FOREIGN KEY (`Код_компании`) REFERENCES `компания` (`Название_компании`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `поставщики`
--

LOCK TABLES `поставщики` WRITE;
/*!40000 ALTER TABLE `поставщики` DISABLE KEYS */;
INSERT INTO `поставщики` VALUES (1,'ООО \"СБР\"','ПАО \"Мегафон\"','+7 (495) 120 14 21'),(2,'TapTech','ПАО \"Мегафон\"','+7 (495) 221 14 21'),(3,'Digital City','ПАО \"Мегафон\"','+7 (495) 020 20 21'),(4,'Digital City1','ПАО \"Мегафон\"','+7 (495) 020 20 22');
/*!40000 ALTER TABLE `поставщики` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `производитель`
--

DROP TABLE IF EXISTS `производитель`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `производитель` (
  `Код_производителя` int NOT NULL,
  `Название` varchar(45) DEFAULT NULL,
  `Логотип` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Код_производителя`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `производитель`
--

LOCK TABLES `производитель` WRITE;
/*!40000 ALTER TABLE `производитель` DISABLE KEYS */;
/*!40000 ALTER TABLE `производитель` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `сотрудники`
--

DROP TABLE IF EXISTS `сотрудники`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `сотрудники` (
  `Код_сотрудника` int NOT NULL,
  `Код_компании` varchar(45) DEFAULT NULL,
  `ФИО_сотрудника` varchar(45) DEFAULT NULL,
  `Код_должности` varchar(45) DEFAULT NULL,
  `Дата_рождения` date DEFAULT NULL,
  `Контактный_телефон` varchar(45) DEFAULT NULL,
  `Адрес` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Код_сотрудника`),
  UNIQUE KEY `Код_сотрудника_UNIQUE` (`Код_сотрудника`) /*!80000 INVISIBLE */,
  UNIQUE KEY `Код_должности_UNIQUE` (`Код_должности`),
  KEY `Код_компании_idx_FK_company_idx` (`Код_компании`),
  KEY `ФИО_сотрудника_idx_Fk` (`ФИО_сотрудника`),
  CONSTRAINT `Код_компании_idx_FK_company_idx` FOREIGN KEY (`Код_компании`) REFERENCES `компания` (`Название_компании`),
  CONSTRAINT `Наименование_должности_idx` FOREIGN KEY (`Код_должности`) REFERENCES `должности` (`Наименование_должности`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `сотрудники`
--

LOCK TABLES `сотрудники` WRITE;
/*!40000 ALTER TABLE `сотрудники` DISABLE KEYS */;
INSERT INTO `сотрудники` VALUES (1,'ПАО \"Мегафон\"','Марьин Иван Петрович','Администратор','1980-10-24','906-50-65','ул.Заветная, 49, кв.41'),(2,'ПАО \"Мегафон\"','Шагидзянова ﻿Анастасия Игоревна','Уборщик','1998-01-01','980-65-40','ул.Новотушинская, 78, кв.2'),(3,'ПАО \"Мегафон\"','Иванов Иван Иванович','Продавец','2000-11-11','980-65-43','ул.Делегатская, 49, кв.41');
/*!40000 ALTER TABLE `сотрудники` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `тип_товара`
--

DROP TABLE IF EXISTS `тип_товара`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `тип_товара` (
  `Код_типа` int NOT NULL,
  `Тип_товара` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Код_типа`),
  UNIQUE KEY `Код_типа_UNIQUE` (`Код_типа`),
  KEY `Тип_товара_idx` (`Тип_товара`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `тип_товара`
--

LOCK TABLES `тип_товара` WRITE;
/*!40000 ALTER TABLE `тип_товара` DISABLE KEYS */;
INSERT INTO `тип_товара` VALUES (4,'Аксессуары'),(3,'Модемы и роутеры'),(2,'Планшет'),(1,'Телефон');
/*!40000 ALTER TABLE `тип_товара` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `товары`
--

DROP TABLE IF EXISTS `товары`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `товары` (
  `Код_товара` int NOT NULL,
  `Название` varchar(45) DEFAULT NULL,
  `Код_компании` varchar(45) DEFAULT NULL,
  `Характеристики` longtext,
  `Фото` varchar(255) DEFAULT NULL,
  `Цена` int DEFAULT NULL,
  `Производитель` varchar(45) DEFAULT NULL,
  `Кол_во_на_складе` varchar(45) DEFAULT NULL,
  `Тип_товара` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Код_товара`),
  UNIQUE KEY `Код_товара_UNIQUE` (`Код_товара`),
  KEY `goodsCompanyFk_idx` (`Код_компании`),
  KEY `Тип_товара_idx1_idx` (`Тип_товара`),
  KEY `название_товара_idx` (`Название`),
  CONSTRAINT `goodsCompanyFk` FOREIGN KEY (`Код_компании`) REFERENCES `компания` (`Название_компании`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Тип_товара_idx1` FOREIGN KEY (`Тип_товара`) REFERENCES `тип_товара` (`Тип_товара`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `товары`
--

LOCK TABLES `товары` WRITE;
/*!40000 ALTER TABLE `товары` DISABLE KEYS */;
INSERT INTO `товары` VALUES (1,'Apple iPhone X 256GB','ПАО \"Мегафон\"','Дисплей 5.8\", 1125x2436 Pix Двойная задняя камера 12 Mpix + 12 Mpix 256 ГБ Защита от брызг и воды','iphone-13-mini-blue-select-2021.png',85990,'Apple','51','Планшет'),(2,'Apple iPhone X 256GB','ПАО \"Мегафон\"','Дисплей 5.8\", 1125x2436 Pix Двойная задняя камера 12 Mpix + 12 Mpix 256 ГБ Защита от брызг и воды','png-transparent-telephone-samsung-t-mobile-4g-smartphone-samsung-gadget-mobile-phone-mobile-phones.png',85990,'Apple','11','Модемы и роутеры'),(30,'Apple iPhone X 256GB','ПАО \"Мегафон\"','Дисплей 5.8\", 1125x2436 Pix Двойная задняя камера 12 Mpix + 12 Mpix 256 ГБ Защита от брызг и воды','iphone-13-mini-blue-select-2021.png',1,'1','1','Аксессуары'),(31,'Apple iPhone X 256GB','ПАО \"Мегафон\"','Дисплей 5.8\", 1125x2436 Pix Двойная задняя камера 12 Mpix + 12 Mpix 256 ГБ Защита от брызг и воды','iphone-13-mini-blue-select-2021.png',1,'1','1','Аксессуары'),(32,'1','ПАО \"Мегафон\"','1','iphone-13-mini-blue-select-2021.png',1,'1','1','Аксессуары'),(33,'1','ПАО \"Мегафон\"','2','iphone-13-mini-blue-select-2021.png',1,'1','1','Планшет');
/*!40000 ALTER TABLE `товары` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `товары_в_покупке`
--

DROP TABLE IF EXISTS `товары_в_покупке`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `товары_в_покупке` (
  `Код_покупки` int NOT NULL AUTO_INCREMENT,
  `Код_компании` varchar(45) DEFAULT NULL,
  `Код_товара` varchar(45) DEFAULT NULL,
  `Кол_во` varchar(45) DEFAULT NULL,
  `код_заказа` int DEFAULT NULL,
  PRIMARY KEY (`Код_покупки`),
  KEY `Код_компании_idx_FK_idx` (`Код_компании`),
  KEY `Код_товара_idx_FK_товар_idx` (`Код_товара`),
  KEY `Код_товара_idx_FK_товаравпокупке_idx` (`Код_товара`),
  KEY `код_заказа_idx_FK_товарывпокупке_idx` (`код_заказа`),
  CONSTRAINT `код_заказа_idx_FK_товарывпокупке` FOREIGN KEY (`код_заказа`) REFERENCES `заказы` (`Код_заказа`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Код_компании_idx_FK_товарывпокупке` FOREIGN KEY (`Код_компании`) REFERENCES `компания` (`Название_компании`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Код_товара_idx_FK_товарвпокупке` FOREIGN KEY (`Код_товара`) REFERENCES `товары` (`Название`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `товары_в_покупке`
--

LOCK TABLES `товары_в_покупке` WRITE;
/*!40000 ALTER TABLE `товары_в_покупке` DISABLE KEYS */;
INSERT INTO `товары_в_покупке` VALUES (1,'ПАО \"Мегафон\"','Apple iPhone X 256GB','11',1),(2,'ПАО \"Мегафон\"','Apple iPhone X 256GB','1',1),(14,'ПАО \"Мегафон\"','Apple iPhone X 256GB','100',1);
/*!40000 ALTER TABLE `товары_в_покупке` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `товары_поставки`
--

DROP TABLE IF EXISTS `товары_поставки`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `товары_поставки` (
  `Код_поставки` int NOT NULL,
  `Код_компании` varchar(45) DEFAULT NULL,
  `Код_товара` varchar(45) DEFAULT NULL,
  `Количество` int DEFAULT NULL,
  `Цена_товара` int DEFAULT NULL,
  PRIMARY KEY (`Код_поставки`),
  KEY `Код_компании_FK_ТоварыПоставки_idx` (`Код_компании`),
  KEY `Код_товара_FK_ТоварыПоставки_idx` (`Код_товара`),
  KEY `Цена_товара_FK_ТоварыПоставки_idx` (`Цена_товара`),
  CONSTRAINT `Код_компании_FK_ТоварыПоставки` FOREIGN KEY (`Код_компании`) REFERENCES `компания` (`Название_компании`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Код_товара_FK_ТоварыПоставки` FOREIGN KEY (`Код_товара`) REFERENCES `товары` (`Название`),
  CONSTRAINT `Цена_товара_FK_ТоварыПоставки` FOREIGN KEY (`Цена_товара`) REFERENCES `товары` (`Код_товара`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `товары_поставки`
--

LOCK TABLES `товары_поставки` WRITE;
/*!40000 ALTER TABLE `товары_поставки` DISABLE KEYS */;
/*!40000 ALTER TABLE `товары_поставки` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-29  7:31:58
