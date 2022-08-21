CREATE TABLE `term` (
  `term_pk` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
  `term_name` VARCHAR(255) NOT NULL UNIQUE,
  `owner_user_fk` INT UNSIGNED DEFAULT NULL,
  `dt_created` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`term_pk`),
  CONSTRAINT `FK_term_user` FOREIGN KEY (`owner_user_fk`) REFERENCES `user` (`user_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;