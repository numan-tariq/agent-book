/*
 Navicat Premium Data Transfer

 Source Server         : lcoalhost
 Source Server Type    : PostgreSQL
 Source Server Version : 140005
 Source Host           : localhost:5432
 Source Catalog        : agent-book
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140005
 File Encoding         : 65001

 Date: 15/04/2023 10:40:59
*/


-- ----------------------------
-- Table structure for cards
-- ----------------------------
DROP TABLE IF EXISTS "public"."cards";
CREATE TABLE "public"."cards" (
  "id" uuid NOT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "project_id" uuid,
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "status" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamp(6) NOT NULL,
  "updatedAt" timestamp(6) NOT NULL
)
;
ALTER TABLE "public"."cards" OWNER TO "postgres";

-- ----------------------------
-- Records of cards
-- ----------------------------
BEGIN;
INSERT INTO "public"."cards" VALUES ('3467a2f6-5fdb-48b3-951e-7869b5b18d57', 'Agent Book Task', '153c4562-a4b0-4eb9-9fab-8b17e6f8fb12', NULL, 'backlog', '2023-04-14 00:41:37.22', '2023-04-14 00:41:37.22');
COMMIT;

-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS "public"."projects";
CREATE TABLE "public"."projects" (
  "id" uuid NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  "description" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."projects" OWNER TO "postgres";

-- ----------------------------
-- Records of projects
-- ----------------------------
BEGIN;
INSERT INTO "public"."projects" VALUES ('153c4562-a4b0-4eb9-9fab-8b17e6f8fb12', 'General', '2023-04-13 23:49:34+05', '2023-04-13 23:49:36+05', 'This is general Project');
INSERT INTO "public"."projects" VALUES ('953c4562-a4b0-4eb9-9fab-8b17e6f8fb11', 'Design', '2023-04-13 23:49:34+05', '2023-04-13 23:49:36+05', 'This is design Project');
INSERT INTO "public"."projects" VALUES ('653c4562-a4b0-4eb9-9fab-8b17e6f8fb19', 'Development', '2023-04-13 23:49:34+05', '2023-04-13 23:49:36+05', 'This is development Project');
INSERT INTO "public"."projects" VALUES ('253c4562-a4b0-4eb9-9fab-8b17e6f8fb10', 'Marketing', '2023-04-13 23:49:34+05', '2023-04-13 23:49:36+05', 'This is marketing Project');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" uuid NOT NULL,
  "firstName" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "lastName" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "resetPasswordToken" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;
ALTER TABLE "public"."users" OWNER TO "postgres";

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO "public"."users" VALUES ('7500302c-b82c-48e0-a48f-e0436b6c43de', 'Numan', 'Tariq', 'numan@gmail.com', '$2a$10$PSBt.9KPnxeNms3pxdgNs.5P32t4W/2AdzKiivFJAFeILrMsCg0zW', NULL, '2023-04-13 02:38:39.394+05', '2023-04-13 02:38:39.394+05');
COMMIT;

-- ----------------------------
-- Primary Key structure for table cards
-- ----------------------------
ALTER TABLE "public"."cards" ADD CONSTRAINT "projects_copy1_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table projects
-- ----------------------------
ALTER TABLE "public"."projects" ADD CONSTRAINT "users_copy1_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_email_key" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table cards
-- ----------------------------
ALTER TABLE "public"."cards" ADD CONSTRAINT "cards_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
