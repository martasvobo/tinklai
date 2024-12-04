CREATE DATABASE IF NOT EXISTS myapp;
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
    kaina INT,
    nuotrauka MEDIUMTEXT
);

CREATE TABLE Uzsakymas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    suma INT
);

ALTER TABLE Krepselio_preke
ADD COLUMN preke_id INT,
ADD FOREIGN KEY (preke_id) REFERENCES Preke(id);

ALTER TABLE Uzklausa
ADD COLUMN vartotojas_id INT,
ADD FOREIGN KEY (vartotojas_id) REFERENCES Vartotojas(id);
