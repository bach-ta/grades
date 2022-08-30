CREATE TABLE `user` (
  `user_pk` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
  `user_email` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `dt_created` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_pk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;