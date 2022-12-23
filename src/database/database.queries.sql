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

SELECT users.id AS "id", name, SUM("visitCount") FROM sessions JOIN users ON sessions."userId" = users.id JOIN urls ON urls."userId" = users.id WHERE token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY3MTgwOTQ4MiwiZXhwIjoxNjc0NDAxNDgyfQ.rOqgpsEVxx-gbAzUV5w4lzjWc8SXuIeGDczo8Q2CUQU' GROUP BY users.id;