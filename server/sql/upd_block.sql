DROP TRIGGER IF EXISTS `upd_block`;

DELIMITER $$
CREATE TRIGGER `upd_block`
	BEFORE UPDATE ON `block`
FOR EACH ROW
BEGIN
	DECLARE average DECIMAL(5,2);
	IF NOT (NEW.`entries` <=> OLD.`entries`) THEN
		SELECT SUM(entry)/JSON_LENGTH(NEW.`entries`) * NEW.`block_weight` / 100
        INTO average FROM JSON_TABLE(
		  NEW.`entries`, '$[*]'
		  COLUMNS(entry DECIMAL(5,2) path '$[0]')
		) AS jsontable;
		SET NEW.`block_average` = average;
	END IF;
END$$
DELIMITER ;