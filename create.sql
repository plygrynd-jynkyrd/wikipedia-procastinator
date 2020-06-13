CREATE UNLOGGED TABLE public.words1
(
    word character varying COLLATE pg_catalog."default" NOT NULL,
    article character varying COLLATE pg_catalog."default" NOT NULL
)

WITH (
    autovacuum_enabled = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.words1
    OWNER to postgres;