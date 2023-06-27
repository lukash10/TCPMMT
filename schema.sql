CREATE TABLE public.syncs (
	id uuid primary key,
	dados json NULL,
	id_caso varchar(255) NULL,
	last_hash varchar(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.usuarios (
	id uuid primary KEY,
	nome varchar(255) NOT null,
	login varchar(255) NOT NULL,
	senha varchar(255) NOT NULL,
	rrole varchar(255) NOT NULL
);