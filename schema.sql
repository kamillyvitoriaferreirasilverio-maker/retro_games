create database if not exists db_retrogames;
use db_retrogames;

create table if not exists jogos (
    id int auto_increment primary key,
    titulo varchar(100) not null,
    plataforma varchar(50) not null,
    desenvolvedora varchar(100) not null,
    imagem_url text not null,
    preco decimal(10, 2) not null,
    data_cadastro timestamp default current_timestamp
);

insert into jogos (titulo, plataforma, desenvolvedora, imagem_url, preco) values
('Grand Theft Auto: San Andreas', 'PS2 / PC / Xbox', 'Rockstar Games', 'https://upload.wikimedia.org/wikipedia/en/c/c4/GTASABOX.jpg', 199.90),

('Free Fire', 'Android / iOS', 'Garena', 'https://s2-ge.glbimg.com/0aqBJnBhJLXHe7qBnjvD3b8EeUg=/0x0:1440x810/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/d/v/u1pTYiTdKspWEAlKXT2g/loja-free-fire-la-casa-de-papel.jpg', 0.00),

('Roblox', 'PC / Mobile / Console', 'Roblox Corporation', 'https://img.odcdn.com.br/wp-content/uploads/2026/06/roblox-google-play-1920x1080.jpg', 0.00);

select * from jogos;