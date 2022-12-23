CREATE DATABASE shortly;

CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"name" TEXT NOT NULL,
	"email" TEXT UNIQUE NOT NULL,
	"password" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "sessions" (
	"id" SERIAL PRIMARY KEY,
	"email" TEXT UNIQUE NOT NULL,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "token" TEXT UNIQUE NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "urls" (
	"id" SERIAL PRIMARY KEY,
	"shortUrl" TEXT UNIQUE NOT NULL,
    "url" TEXT UNIQUE NOT NULL,
    "visitCount" INTEGER NOT NULL,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

SELECT 
	users.id as "id",
	users.name as "name",
	COUNT("userId") as "linksCount",
	SUM("visitCount") AS "visitCount"
FROM users
LEFT JOIN urls ON urls."userId" = users.id
GROUP BY users.id
ORDER BY "visitCount" ASC
LIMIT 10;