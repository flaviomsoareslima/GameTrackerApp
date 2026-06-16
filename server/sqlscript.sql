/*CREATE DATABASE IF NOT EXISTS musicas_aula_db;
 
USE musicas_aula_db;
 
DROP TABLE IF EXISTS musicas;
 
CREATE TABLE musicas (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  titulo    VARCHAR(255)  NOT NULL,
  artista   VARCHAR(255)  NOT NULL,
  genero    VARCHAR(50)   NOT NULL,
  ano       SMALLINT,
  favorita  BOOLEAN       DEFAULT FALSE
);*/

/*INSERT INTO musicas (titulo, artista, genero, ano, favorita) VALUES
('Bohemian Rhapsody', 'Queen',           'rock',       1975, TRUE),
('Lose Yourself',     'Eminem',          'hip-hop',    2002, FALSE),
('Take Five',         'Dave Brubeck',    'jazz',       1959, FALSE),
('Strobe',            'deadmau5',        'eletronico', 2009, TRUE),
('Clair de Lune',     'Claude Debussy',  'classico',   1905, FALSE),
('Garota de Ipanema', 'Tom Jobim',       'outro',      1962, TRUE),
('Chuva Dissolvida',  'Ornatos Violeta', 'rock',       1999, TRUE),
('Blinding Lights',   'The Weeknd',      'pop',        2019, FALSE),
('Around the World',  'Daft Punk',       'eletronico', 1997, FALSE),
('Despacito',         'Luis Fonsi',      'pop',        2017, FALSE);*/

/*ALTER USER 'root'@'localhost' IDENTIFIED BY '';*/