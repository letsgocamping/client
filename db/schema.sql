CREATE TABLE "generations" (
"id"  SERIAL ,
"name" VARCHAR ,
PRIMARY KEY ("id")
);

CREATE TABLE "pokedexes" (
"id"  SERIAL ,
"name" VARCHAR ,
PRIMARY KEY ("id")
);

CREATE TABLE "pokedex" (
"id"  SERIAL ,
"generation_id" INTEGER ,
"pokedex_id" INTEGER ,
"name" VARCHAR ,
"sprite" VARCHAR ,
"type1" VARCHAR ,
"type2" VARCHAR ,
"hp" INTEGER ,
"attack" INTEGER ,
"sp_attack" INTEGER ,
"defense" INTEGER ,
"sp_defense" INTEGER ,
"speed" INTEGER ,
PRIMARY KEY ("id")
);

CREATE TABLE "team" (
"id"  SERIAL ,
"poke_id" INTEGER ,
PRIMARY KEY ("id")
);

ALTER TABLE "team" ADD FOREIGN KEY ("poke_id") REFERENCES "pokedex" ("id");
ALTER TABLE "pokedex" ADD FOREIGN KEY ("generation_id") REFERENCES "generations" ("id");
ALTER TABLE "pokedex" ADD FOREIGN KEY ("pokedex_id") REFERENCES "pokedexes" ("id");