--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

-- Started on 2020-05-26 11:02:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 49321)
-- Name: images; Type: TABLE; Schema: public; Owner: tutorial
--

DROP TABLE public.task;

CREATE TABLE public.task( id serial PRIMARY KEY, title VARCHAR ( 200 ) NOT NULL, description VARCHAR ( 4000 ), assignee VARCHAR ( 100 ), priority VARCHAR ( 50 ), user_id VARCHAR ( 100 ));


INSERT INTO public.task (title, description, assignee, priority, user_id)
    VALUES ('Deployment of all my-todos services', 'Deployment of all my-todos services', 'sofikul.mallick', 'high', '634941c3126761a5b2539b66');


-- Completed on 2020-05-26 11:02:33

--
-- PostgreSQL database dump complete
--