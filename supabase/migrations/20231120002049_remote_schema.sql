
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

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."category_gear" (
    "created_at" timestamp with time zone DEFAULT "now"(),
    "gear_id" "uuid" NOT NULL,
    "category_id" "uuid" NOT NULL,
    "quantity" bigint DEFAULT '1'::bigint,
    "consumable_weight" boolean DEFAULT false,
    "worn_weight" boolean DEFAULT false
);

ALTER TABLE "public"."category_gear" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."gear" (
    "created_at" timestamp with time zone DEFAULT "now"(),
    "user_id" "uuid",
    "name" "text",
    "description" "text",
    "weight_g" bigint DEFAULT '0'::bigint,
    "image_url" "text",
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL
);

ALTER TABLE "public"."gear" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."list_categories" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "name" "text" DEFAULT ''::"text"
);

ALTER TABLE "public"."list_categories" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."lists" (
    "created_at" timestamp with time zone DEFAULT "now"(),
    "name" "text",
    "description" "text",
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL
);

ALTER TABLE "public"."lists" OWNER TO "postgres";

ALTER TABLE ONLY "public"."category_gear"
    ADD CONSTRAINT "category_gear_pkey" PRIMARY KEY ("gear_id", "category_id");

ALTER TABLE ONLY "public"."gear"
    ADD CONSTRAINT "gear_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."list_categories"
    ADD CONSTRAINT "list_categories_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."lists"
    ADD CONSTRAINT "lists_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."category_gear"
    ADD CONSTRAINT "category_gear_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."list_categories"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."category_gear"
    ADD CONSTRAINT "category_gear_gear_id_fkey" FOREIGN KEY ("gear_id") REFERENCES "public"."gear"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."gear"
    ADD CONSTRAINT "gear_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER TABLE "public"."category_gear" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."gear" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."list_categories" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."lists" ENABLE ROW LEVEL SECURITY;

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."category_gear" TO "anon";
GRANT ALL ON TABLE "public"."category_gear" TO "authenticated";
GRANT ALL ON TABLE "public"."category_gear" TO "service_role";

GRANT ALL ON TABLE "public"."gear" TO "anon";
GRANT ALL ON TABLE "public"."gear" TO "authenticated";
GRANT ALL ON TABLE "public"."gear" TO "service_role";

GRANT ALL ON TABLE "public"."list_categories" TO "anon";
GRANT ALL ON TABLE "public"."list_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."list_categories" TO "service_role";

GRANT ALL ON TABLE "public"."lists" TO "anon";
GRANT ALL ON TABLE "public"."lists" TO "authenticated";
GRANT ALL ON TABLE "public"."lists" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
