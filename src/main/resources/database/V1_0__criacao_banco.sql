USE easy_health;

CREATE TABLE prescription(
	id BIGINT NOT NULL AUTO_INCREMENT,
	medicine VARCHAR(100) NOT NULL,
	frequency INT,
	observation VARCHAR(250),
	PRIMARY KEY(id)
);