CREATE DATABASE IF NOT EXISTS wedding;
CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';
GRANT ALL PRIVILEGES ON wedding.* TO '${MYSQL_USER}'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS `users` (
  `id`  BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  `rsvp_reception` tinyint(1) DEFAULT NULL,
  `rsvp_tea_ceremony` tinyint(1) DEFAULT NULL,
  `num_plus_ones` int DEFAULT 0,
  `dietary_restrictions` varchar(255) DEFAULT NULL,
  `welcome_message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `plus_ones` (
  `id`  BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `plus_one_of` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`plus_one_of`) REFERENCES `users` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `accommodations` (
  `id`  BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `num_guests` int DEFAULT 0,
  `num_rooms` int DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_accommodations_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `accommodated_guests` (
  `id`  BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `accommodation_id` BIGINT UNSIGNED NOT NULL,
  `check_in` DATE NOT NULL,
  `check_out` DATE NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`accommodation_id`) REFERENCES `accommodations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
  
CREATE TABLE IF NOT EXISTS `admins` (
  `id`  BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_admin_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
