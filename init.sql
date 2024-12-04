CREATE DATABASE IF NOT EXISTS myapp
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
USE myapp;

CREATE TABLE Vartotojas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipas VARCHAR(50),
    vardas VARCHAR(100),
    slapazodis VARCHAR(255)
);

CREATE TABLE Uzklausa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    klausimas VARCHAR(255),
    atsakymas VARCHAR(255)
);

CREATE TABLE Krepselio_preke (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kiekis INT
);

CREATE TABLE Preke (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pavadinimas VARCHAR(255),
    kaina FLOAT,
    nuotrauka MEDIUMTEXT
);

CREATE TABLE Uzsakymas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    suma FLOAT,
    prekes MEDIUMTEXT,
    kiekiai MEDIUMTEXT,
    kainos MEDIUMTEXT
);

ALTER TABLE Krepselio_preke
ADD COLUMN preke_id INT,
ADD COLUMN vartotojas_id INT,
ADD FOREIGN KEY (preke_id) REFERENCES Preke(id),
ADD FOREIGN KEY (vartotojas_id) REFERENCES Vartotojas(id);

ALTER TABLE Uzklausa
ADD COLUMN vartotojas_id INT,
ADD FOREIGN KEY (vartotojas_id) REFERENCES Vartotojas(id);

ALTER TABLE Uzsakymas
ADD COLUMN vartotojas_id INT,
ADD FOREIGN KEY (vartotojas_id) REFERENCES Vartotojas(id);

INSERT INTO Vartotojas (tipas, vardas, slapazodis) 
VALUES ('pardavejas', 'admin', '$2b$10$r9xvyAJzLkvp3Kd/Kr8ynOuIsXDa5Br/rJZTriZaBsHD.9iJx95SC');

INSERT INTO Vartotojas (tipas, vardas, slapazodis)
VALUES ('klientas', 'klientas', '$2b$10$r9xvyAJzLkvp3Kd/Kr8ynOuIsXDa5Br/rJZTriZaBsHD.9iJx95SC');

INSERT INTO Preke (pavadinimas, kaina, nuotrauka)
VALUES ('Kolonėlė', 10.99, 'https://ksd-images.lt/display/aikido/cache/8494255d34658a2262023532c19a973f.jpeg?h=2000&w=2000');