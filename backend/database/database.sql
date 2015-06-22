/*
SQLyog Ultimate v11.11 (32 bit)
MySQL - 5.6.21 : Database - bluetube
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`bluetube` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `bluetube`;

/*Table structure for table `song` */

DROP TABLE IF EXISTS `song`;

CREATE TABLE `song` (
  `id` int(2) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `duration` varchar(5) NOT NULL,
  `channel_name` varchar(100) NOT NULL,
  `picture_url` varchar(200) NOT NULL,
  `youtube_video_id` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyIsam AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

/*Data for the table `song` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
