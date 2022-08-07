CREATE TABLE "companies"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR NOT NULL,
	"email" VARCHAR UNIQUE NOT NULL,
	"password" VARCHAR NOT NULL,
	"createdAt" DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE "products"(
	"id" SERIAL PRIMARY KEY,
	"companyId" INTEGER REFERENCES "companies"(id),
	"name" VARCHAR NOT NULL,
	"quantity" INTEGER NOT NULL,
	"costPrice" INTEGER NOT NULL,
	"sellingPrice" INTEGER NOT NULL
);

CREATE TABLE "sales"(
	"id" SERIAL PRIMARY KEY,
	"companyId" INTEGER REFERENCES "companies"(id),
	"productId" INTEGER REFERENCES "products"(id),
	"quantity" INTEGER NOT NULL,
	"totalPrice" INTEGER NOT NULL,
	"dateOfSale" DATE NOT NULL DEFAULT NOW()	
);

CREATE TABLE "cashflow"(
	"id" SERIAL PRIMARY KEY,
	"companyId" INTEGER REFERENCES "companies"(id),
	"type" VARCHAR NOT NULL,
	"description" VARCHAR NOT NULL,
	"value" INTEGER NOT NULL,
	"date" DATE NOT NULL DEFAULT NOW()
);
