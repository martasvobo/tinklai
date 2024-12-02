CREATE TYPE vartotojo_tipas AS ENUM ('Svečias', 'Pardavėjas', 'Klientas');

CREATE TABLE Vartotojas (
    id SERIAL PRIMARY KEY,
    tipas vartotojo_tipas NOT NULL,
    vardas VARCHAR(255) NOT NULL,
    slaptazodis VARCHAR(255) NOT NULL
);

CREATE TABLE Uzklausa (
    id SERIAL PRIMARY KEY,
    klausimas VARCHAR(255) NOT NULL,
    atsakymas VARCHAR(255),
    vartotojas_id INTEGER REFERENCES Vartotojas(id)
);

CREATE TABLE Preke (
    id SERIAL PRIMARY KEY,
    pavadinimas VARCHAR(255) NOT NULL,
    kaina INTEGER NOT NULL,
    nuotrauka BYTEA
);

CREATE TABLE Krepselio_preke (
    id SERIAL PRIMARY KEY,
    kiekis INTEGER NOT NULL,
    preke_id INTEGER REFERENCES Preke(id),
    uzsakymas_id INTEGER REFERENCES Uzsakymas(id),
    vartotojas_id INTEGER REFERENCES Vartotojas(id)
    suma INTEGER
);

CREATE INDEX idx_uzklausa_vartotojas ON Uzsakymas(vartotojas_id);
CREATE INDEX idx_krepselio_preke_preke ON Krepselio_preke(preke_id);
CREATE INDEX idx_krepselio_preke_uzsakymas ON Krepselio_preke(uzsakymas_id);
CREATE INDEX idx_krepselio_preke_vartotojas ON Krepselio_preke(vartotojas_id);