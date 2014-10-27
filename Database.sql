/*
SQLyog Ultimate v11.11 (32 bit)
MySQL - 5.5.36 : Database - app_video_player
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`app_video_player` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `app_video_player`;

/*Table structure for table `lista_reproduccion` */

CREATE TABLE `lista_reproduccion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `email_usuario` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_lista_reproduccion_usuario` (`email_usuario`),
  CONSTRAINT `fk_lista_reproduccion_usuario` FOREIGN KEY (`email_usuario`) REFERENCES `usuario` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `lista_reproduccion` */

/*Table structure for table `usuario` */

CREATE TABLE `usuario` (
  `email` varchar(100) NOT NULL,
  `nombre_completo` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `usuario` */

/*Table structure for table `video` */

CREATE TABLE `video` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url_youtube` varchar(150) NOT NULL,
  `id_lista_reproduccion` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_video_lista_reproduccion` (`id_lista_reproduccion`),
  CONSTRAINT `fk_video_lista_reproduccion` FOREIGN KEY (`id_lista_reproduccion`) REFERENCES `lista_reproduccion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `video` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
