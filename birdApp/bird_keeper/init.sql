-- Adminer 5.3.0 PostgreSQL 17.5 dump
-- inside init.sql or a separate script
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- DROP FUNCTION IF EXISTS "uuid_generate_v1";;
-- CREATE FUNCTION "uuid_generate_v1" () RETURNS uuid LANGUAGE c AS 'uuid_generate_v1';

-- DROP FUNCTION IF EXISTS "uuid_generate_v1mc";;
-- CREATE FUNCTION "uuid_generate_v1mc" () RETURNS uuid LANGUAGE c AS 'uuid_generate_v1mc';

-- DROP FUNCTION IF EXISTS "uuid_generate_v3";;
-- CREATE FUNCTION "uuid_generate_v3" (IN "namespace" uuid, IN "name" text) RETURNS uuid LANGUAGE c AS 'uuid_generate_v3';

-- DROP FUNCTION IF EXISTS "uuid_generate_v4";;
-- CREATE FUNCTION "uuid_generate_v4" () RETURNS uuid LANGUAGE c AS 'uuid_generate_v4';

-- DROP FUNCTION IF EXISTS "uuid_generate_v5";;
-- CREATE FUNCTION "uuid_generate_v5" (IN "namespace" uuid, IN "name" text) RETURNS uuid LANGUAGE c AS 'uuid_generate_v5';

-- DROP FUNCTION IF EXISTS "uuid_nil";;
-- CREATE FUNCTION "uuid_nil" () RETURNS uuid LANGUAGE c AS 'uuid_nil';

-- DROP FUNCTION IF EXISTS "uuid_ns_dns";;
-- CREATE FUNCTION "uuid_ns_dns" () RETURNS uuid LANGUAGE c AS 'uuid_ns_dns';

-- DROP FUNCTION IF EXISTS "uuid_ns_oid";;
-- CREATE FUNCTION "uuid_ns_oid" () RETURNS uuid LANGUAGE c AS 'uuid_ns_oid';

-- DROP FUNCTION IF EXISTS "uuid_ns_url";;
-- CREATE FUNCTION "uuid_ns_url" () RETURNS uuid LANGUAGE c AS 'uuid_ns_url';

-- DROP FUNCTION IF EXISTS "uuid_ns_x500";;
-- CREATE FUNCTION "uuid_ns_x500" () RETURNS uuid LANGUAGE c AS 'uuid_ns_x500';

DROP TABLE IF EXISTS "user_birds";
CREATE TABLE "public"."user_birds" (
    "user_id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "birdname" character varying(255) DEFAULT '' NOT NULL,
    "birdimage" character varying(255) DEFAULT '' NOT NULL,
    "location" character varying(60) DEFAULT '' NOT NULL
)
WITH (oids = false);

INSERT INTO "user_birds" ("user_id", "birdname", "birdimage", "location") VALUES
('2004f51e-1a00-411d-8202-6623daff410e',	'Red-winged Blackbird',	'https://static.inaturalist.org/photos/368048127/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Chilean Burrowing Parakeet',	'https://inaturalist-open-data.s3.amazonaws.com/photos/79627019/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Red-backed Shrike',	'https://inaturalist-open-data.s3.amazonaws.com/photos/127743790/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Domestic Chicken',	'https://inaturalist-open-data.s3.amazonaws.com/photos/274681663/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Black Redstart',	'https://static.inaturalist.org/photos/120990680/medium.jpeg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Piranga Tanagers',	'https://inaturalist-open-data.s3.amazonaws.com/photos/76199272/medium.jpeg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Red Junglefowl',	'https://inaturalist-open-data.s3.amazonaws.com/photos/3784873/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Red-bellied Woodpecker',	'https://static.inaturalist.org/photos/383227697/medium.jpeg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Red-breasted Merganser',	'https://inaturalist-open-data.s3.amazonaws.com/photos/254681236/medium.jpeg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'True Redstarts',	'https://inaturalist-open-data.s3.amazonaws.com/photos/188125371/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Red-breasted Nuthatch',	'https://inaturalist-open-data.s3.amazonaws.com/photos/117331702/medium.jpg',	'Hanging out in aatree'),
('2004f51e-1a00-411d-8202-6623daff410e',	'Yellow-bellied Sapsucker',	'https://inaturalist-open-data.s3.amazonaws.com/photos/294094189/medium.jpeg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'American Robin',	'https://inaturalist-open-data.s3.amazonaws.com/photos/34859026/medium.jpg',	'west side gunn'),
('2004f51e-1a00-411d-8202-6623daff410e',	'Northern Cardinal',	'https://inaturalist-open-data.s3.amazonaws.com/photos/189434971/medium.jpg',	'doctor stranger'),
('2004f51e-1a00-411d-8202-6623daff410e',	'Milvus Kites',	'https://inaturalist-open-data.s3.amazonaws.com/photos/184027751/medium.jpg',	'Flyring around southside'),
('2004f51e-1a00-411d-8202-6623daff410e',	'Red-tailed Hawk',	'https://inaturalist-open-data.s3.amazonaws.com/photos/101327658/medium.jpg',	'pooping it hard'),
('2004f51e-1a00-411d-8202-6623daff410e',	'Golden-capped Parakeet',	'https://inaturalist-open-data.s3.amazonaws.com/photos/87137204/medium.jpeg',	'im so gay'),
('2004f51e-1a00-411d-8202-6623daff410e',	'Redpoll',	'https://inaturalist-open-data.s3.amazonaws.com/photos/226173/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Jandaya Parakeet',	'https://inaturalist-open-data.s3.amazonaws.com/photos/163703172/medium.jpeg',	'stuipd bird moment'),
('2004f51e-1a00-411d-8202-6623daff410e',	'Yellow-crowned Parakeet',	'https://inaturalist-open-data.s3.amazonaws.com/photos/57107378/medium.jpeg',	'i dont even care'),
('2004f51e-1a00-411d-8202-6623daff410e',	'Rufous-bellied Seedsnipe',	'https://inaturalist-open-data.s3.amazonaws.com/photos/260760138/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Cactus Parakeet',	'https://inaturalist-open-data.s3.amazonaws.com/photos/141276572/medium.jpg',	'give me the loot!'),
('2004f51e-1a00-411d-8202-6623daff410e',	'Dunlin',	'https://inaturalist-open-data.s3.amazonaws.com/photos/65881975/medium.jpg',	'in some dirt'),
('2004f51e-1a00-411d-8202-6623daff410e',	'Gray-hooded Sierra-Finch',	'https://inaturalist-open-data.s3.amazonaws.com/photos/114640498/medium.jpeg',	'bobbles'),
('2004f51e-1a00-411d-8202-6623daff410e',	'Sulphur-crested Cockatoo',	'https://inaturalist-open-data.s3.amazonaws.com/photos/247007913/medium.jpg',	''),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'European Robin',	'https://static.inaturalist.org/photos/331946615/medium.jpeg',	''),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Red-shouldered Hawk',	'https://inaturalist-open-data.s3.amazonaws.com/photos/5600620/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Agelaius Blackbirds',	'https://inaturalist-open-data.s3.amazonaws.com/photos/28027/medium.jpg',	'fvgagadgadsgasgdasgsagasdgaGAPPasgdasgasdgGAPPABLERRRRAAAAAA'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Common Buzzard',	'https://inaturalist-open-data.s3.amazonaws.com/photos/192398523/medium.jpeg',	''),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Black-bellied Whistling-Duck',	'https://inaturalist-open-data.s3.amazonaws.com/photos/411123026/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Scarlet-fronted Parakeet',	'https://static.inaturalist.org/photos/178620490/medium.jpg',	'toasted bruhtoasted bruhtoasted bruhtoefeastfdfhtoasted br'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Northern Cardinal',	'https://inaturalist-open-data.s3.amazonaws.com/photos/189434971/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'American Robin',	'https://inaturalist-open-data.s3.amazonaws.com/photos/34859026/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'American Robin',	'https://inaturalist-open-data.s3.amazonaws.com/photos/34859026/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Red-tailed Hawk',	'https://inaturalist-open-data.s3.amazonaws.com/photos/101327658/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Agelaius Blackbirds',	'https://inaturalist-open-data.s3.amazonaws.com/photos/28027/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Red-winged Blackbird',	'https://static.inaturalist.org/photos/368048127/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Northern Flicker',	'https://inaturalist-open-data.s3.amazonaws.com/photos/123812445/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Milvus Kites',	'https://inaturalist-open-data.s3.amazonaws.com/photos/184027751/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'True Redstarts',	'https://inaturalist-open-data.s3.amazonaws.com/photos/188125371/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Red-bellied Woodpecker',	'https://static.inaturalist.org/photos/383227697/medium.jpeg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Piranga Tanagers',	'https://inaturalist-open-data.s3.amazonaws.com/photos/76199272/medium.jpeg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Yellow-bellied Sapsucker',	'https://inaturalist-open-data.s3.amazonaws.com/photos/294094189/medium.jpeg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Red-breasted Nuthatch',	'https://inaturalist-open-data.s3.amazonaws.com/photos/117331702/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Dunlin',	'https://inaturalist-open-data.s3.amazonaws.com/photos/65881975/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Redpolls',	'https://inaturalist-open-data.s3.amazonaws.com/photos/8231125/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Red Kite',	'https://inaturalist-open-data.s3.amazonaws.com/photos/300209194/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Redpoll',	'https://inaturalist-open-data.s3.amazonaws.com/photos/226173/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Rainbow Lorikeets and Allies',	'https://static.inaturalist.org/photos/178281165/medium.jpeg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Red-rumped Swallows, Striped Swallows, and Allies',	'https://inaturalist-open-data.s3.amazonaws.com/photos/289575103/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Bronzed Cowbird',	'https://inaturalist-open-data.s3.amazonaws.com/photos/233696/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Red-backed Shrike',	'https://inaturalist-open-data.s3.amazonaws.com/photos/127743790/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Domestic Chicken',	'https://inaturalist-open-data.s3.amazonaws.com/photos/274681663/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'American Redstart',	'https://inaturalist-open-data.s3.amazonaws.com/photos/31539046/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Red-breasted Merganser',	'https://inaturalist-open-data.s3.amazonaws.com/photos/254681236/medium.jpeg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Gang-gang Cockatoo',	'https://inaturalist-open-data.s3.amazonaws.com/photos/259067709/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Red-legged Honeycreeper',	'https://inaturalist-open-data.s3.amazonaws.com/photos/2964188/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Red-crowned Woodpecker',	'https://inaturalist-open-data.s3.amazonaws.com/photos/238747715/medium.jpeg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Red-lored Amazon',	'https://static.inaturalist.org/photos/110438073/medium.jpeg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Spotted Redshank',	'https://inaturalist-open-data.s3.amazonaws.com/photos/347059364/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Red-billed Chough',	'https://inaturalist-open-data.s3.amazonaws.com/photos/19706/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Red-rumped Parrots',	'https://inaturalist-open-data.s3.amazonaws.com/photos/322359675/medium.jpg',	'jgay'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'Red-rumped Parrot',	'https://inaturalist-open-data.s3.amazonaws.com/photos/158113969/medium.jpeg',	'jgay'),
('2004f51e-1a00-411d-8202-6623daff410e',	'Northern Flicker',	'https://inaturalist-open-data.s3.amazonaws.com/photos/123812445/medium.jpg',	'crasy shyte'),
('2004f51e-1a00-411d-8202-6623daff410e',	'Black-bellied Whistling-Duck',	'https://inaturalist-open-data.s3.amazonaws.com/photos/411123026/medium.jpg',	'crasy shyte'),
('2004f51e-1a00-411d-8202-6623daff410e',	'Redpolls',	'https://inaturalist-open-data.s3.amazonaws.com/photos/8231125/medium.jpg',	'crasy shyte'),
('2004f51e-1a00-411d-8202-6623daff410e',	'Gray-breasted Martin',	'https://inaturalist-open-data.s3.amazonaws.com/photos/172086927/medium.jpeg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Black-throated Gray Warbler',	'https://static.inaturalist.org/photos/194575344/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Grey Shrikethrush',	'https://static.inaturalist.org/photos/6629898/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Indian Pond-Heron',	'https://inaturalist-open-data.s3.amazonaws.com/photos/298428/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Gray Partridge',	'https://inaturalist-open-data.s3.amazonaws.com/photos/472680761/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Grey-headed Woodpecker',	'https://inaturalist-open-data.s3.amazonaws.com/photos/355914852/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Gray Hawk',	'https://inaturalist-open-data.s3.amazonaws.com/photos/199370/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Typical Cuckooshrikes',	'https://inaturalist-open-data.s3.amazonaws.com/photos/39535361/medium.jpeg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Great Grey Shrike',	'https://inaturalist-open-data.s3.amazonaws.com/photos/137178343/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'New Zealand Fantail',	'https://inaturalist-open-data.s3.amazonaws.com/photos/463499217/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Grey Butcherbird',	'https://static.inaturalist.org/photos/5223269/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Spotted Crakes and allies',	'https://inaturalist-open-data.s3.amazonaws.com/photos/342973/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Canada Jay',	'https://inaturalist-open-data.s3.amazonaws.com/photos/444966796/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Domestic Greylag Goose',	'https://inaturalist-open-data.s3.amazonaws.com/photos/338955166/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Grey Fantail',	'https://static.inaturalist.org/photos/6696482/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Clay-colored Thrush',	'https://inaturalist-open-data.s3.amazonaws.com/photos/3772811/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Blue-gray Tanager',	'https://inaturalist-open-data.s3.amazonaws.com/photos/177459123/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Grey Wagtail',	'https://inaturalist-open-data.s3.amazonaws.com/photos/849468/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Black-bellied Plover',	'https://static.inaturalist.org/photos/10603462/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Northern Harrier',	'https://static.inaturalist.org/photos/114035783/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Blue-gray Gnatcatcher',	'https://static.inaturalist.org/photos/269328954/medium.jpeg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Golden Plovers and Grey Plover',	'https://static.inaturalist.org/photos/163819226/medium.jpeg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Greylag Goose',	'https://inaturalist-open-data.s3.amazonaws.com/photos/61334030/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Gray Catbird',	'https://static.inaturalist.org/photos/16329727/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Grey Geese',	'https://inaturalist-open-data.s3.amazonaws.com/photos/170389589/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Grey Heron',	'https://inaturalist-open-data.s3.amazonaws.com/photos/73516715/medium.jpg',	''),
('2004f51e-1a00-411d-8202-6623daff410e',	'Theristicus Ibises',	'https://inaturalist-open-data.s3.amazonaws.com/photos/150799636/medium.jpg',	'red eyed cunt');

DROP TABLE IF EXISTS "users";
CREATE TABLE "public"."users" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "username" character(128) DEFAULT '' NOT NULL,
    "password" character varying(256) DEFAULT '' NOT NULL,
    "role" character(128) DEFAULT '',
    "createdAt" timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL
)
WITH (oids = false);

CREATE UNIQUE INDEX id ON public.users USING btree (id);

CREATE UNIQUE INDEX username ON public.users USING btree (username);

INSERT INTO "users" ("id", "username", "password", "role", "createdAt") VALUES
('5a14c51e-6880-43c4-b40d-292b5990c076',	'geeeey                                                                                                                          ',	'$2b$10$Jb5TxmxDWkH6aBXGdLyblOFaBUQLebPF2dBHjLm0spr5fh9ZE8JTS',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('2daa2712-f469-441e-9e42-058cc6157a6e',	'geaay                                                                                                                           ',	'$2b$10$HpYiDBblNsHcZBlXD9HqAuRiNTS.KYaTi0djYD6eVEBRjXzy5nLka',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('a9ae4ab2-34e2-4eac-8e16-74c01927cc89',	'gasdf                                                                                                                           ',	'$2b$10$/lBYWV/3x50fFMz7G7JhE./IWHBe92NX6ttXeXca1K9LraR4qLfvC',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('c801a855-5a34-4571-b48d-5ad3ba19cf3b',	'gearry                                                                                                                          ',	'$2b$10$YqxpInJIi8C3GoNNvgNVH.0yK54LREqPuAaCbdvvpohLG32ZNZ7x6',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('423699cb-212a-489d-9f4a-9c23d7987a09',	'playto                                                                                                                          ',	'$2b$10$qImSsWffloJIBSJa9F45JeELApgNffNm3cFcr5/hQzcNqH1vlAMmG',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('ade8e11d-37dd-485d-ae73-c3b11137b82b',	'glay                                                                                                                            ',	'$2b$10$52C7M.vEnPxf.s6EkmmYBuo4xwgYVbFe4q6AW.bYqO/O1TvKHnWFm',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('a9896340-2572-4ea1-8e3a-4a4d61793290',	'tayy                                                                                                                            ',	'$2b$10$6ZXXICY3zgdPKboNpk3UI.KHdfh9cfZiZQOgwwghhM0MS.WjaCtEK',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('9579ef7c-4be9-4be0-8110-015637b806e1',	'clunge                                                                                                                          ',	'$2b$10$ljYz3OxM/Bx0YXzXzKEMlejMMTnTYUorJbwilFL.f0QSZrez5lmZ2',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('47d3e68a-7269-441a-a796-d3420f025b94',	'clay                                                                                                                            ',	'$2b$10$bdqezYK6ZKGK7/QTDJXta.A2vzSbjuVe3yEEzaW.cn2x8S.72b7bS',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('d5dcf1bd-1418-4fcf-ba06-83f5e1ce4e44',	'greg                                                                                                                            ',	'$2b$10$ozFZ5VzqtNgFw0.TskTDReCetzH1liNAv1gpF7qmim/7FPbSjSH8.',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('e0e135aa-f573-4962-bb56-4f2d9d45f943',	'tasss                                                                                                                           ',	'$2b$10$YjyO8/KRmLT5WpSW/aPKUuiKVNgHx6oGyaDT9A5REDXZ0BoFvzk2m',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('985241cd-55cb-49ec-9f04-d3c6a12ad5a2',	'grree                                                                                                                           ',	'$2b$10$NmeA92sV8bSDuO07brnwYulCiZYmwXs4tc7iSfqOR3VO8YsJ3j79e',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('900a0843-d07c-443b-b6fb-71b43e414231',	'bbbaall                                                                                                                         ',	'$2b$10$J/ZcjxgB5MDdJhMiZ9DI5.uK.4DxRx2OviYQmCHRuBgF3sNdfRL6q',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('dee6711e-6463-4389-9ac6-f1b0b4a9b514',	'gfasgsadf                                                                                                                       ',	'$2b$10$BD/kIW1s.9WmveJ7XwvAweh8y9aXLcdy2lwTXZUrTt3RKKOFmjNfG',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('cd2beb42-0ee4-4ad3-bd55-26e5274cd357',	'sears                                                                                                                           ',	'$2b$10$Kh6J0B6VMCiffON1lMNsH.AvnnZQUGK35rJvOa136JMVeEEA08Ni2',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('8cee5a64-e661-43be-8f1b-8a5c8ebceca3',	'paint                                                                                                                           ',	'$2b$10$LBVV5obL6CwN148DJMlJ1Oo5LQ7AjCGkey9T8jsVYc.lzhn836hGK',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('ed78aacf-e629-4942-acb2-f5f847df7fcc',	'GASDGA                                                                                                                          ',	'$2b$10$gk8OsMwrbVS6CzArFKoaNeUZuvqjf2Xq/.KAH0jx6Tj6DrT8CRhCa',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('13b70ede-eb53-4b75-ba8e-753a435b0365',	'gasdfe                                                                                                                          ',	'$2b$10$RknfAFtA14RIwTZFUExRQOmzYdMdJ5HnljBNd/Cq7/0aiQXYRJ.02',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('ec02d38d-7144-4da0-82bc-e6862af44a33',	'feasdf                                                                                                                          ',	'$2b$10$EbGaF3Rv19PFQ9XYwxz6K.gRn7P6dkPxWUTjgf3hY3FwIhd9X04ou',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('89e48f02-9ddd-4292-9d7a-e64d729b903a',	'glaybor                                                                                                                         ',	'$2b$10$XAyVzfGt8ZGoJeJ0jctxg.1pf.gKSEh.dogc5dOybKzVzCnih6gme',	'basic                                                                                                                           ',	'2025-08-11 00:51:30.142226+00'),
('9b4d4e76-3d29-4b8f-8a32-f13240e0df71',	'fear                                                                                                                            ',	'$2b$10$jFybtyMpgZri2OLx2YA0v.urqdnYPluNwtc3Kkiel/k.YAp8cTfJy',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('99d5e92d-f065-47c5-9f06-f0f3da577edb',	'tate                                                                                                                            ',	'$2b$10$PrUpWJsGh2DK2BqIe.AsP.Jpbmf73DXq9h6L5Bg8vgsEoS58j4bQa',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('f97a741c-28c4-4d02-876f-72f54931b44f',	'taster                                                                                                                          ',	'$2b$10$WZJ36ilwJ1VNre1mqbRfcepRPDD1J1yJAZ3d7hEq54fTpWuVWUTfu',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('3bf2a6ac-1038-416f-ae5f-ab6cd1f7f296',	'glabe                                                                                                                           ',	'$2b$10$jw1S/oY.3uoLW3jSytJEQO9GNhHXccuM0Un0B.S02dK1aoSyeMqiG',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('11e93a50-0114-480d-8f6d-4ae0111d19a4',	'hhthrr                                                                                                                          ',	'$2b$10$0zn17nRebesAVk3.T65ruOs7a39FG8T8VtRLx33gRuDeEm7/yoeT2',	'                                                                                                                                ',	'2025-08-11 00:51:30.142226+00'),
('2004f51e-1a00-411d-8202-6623daff410e',	'user                                                                                                                            ',	'$2b$10$4n7E3hD4ssGr0ATvf6L5Ge/pX5R9oXHwHcFC314dviA6rNJGkXvNa',	'admin                                                                                                                           ',	'2025-08-11 00:51:30.142226+00'),
('9a9acef9-3673-433d-93bd-57a3e56b9439',	'test                                                                                                                            ',	'$2b$10$qtCcdLjVu6oAAjpd4y1RuevoW.Pm00bDHR6zhCK.fBy5r7xHm2hBq',	'admin                                                                                                                           ',	'2025-08-11 00:51:30.142226+00'),
('8252ed21-5d57-436e-9d8f-340d48d7a9b1',	'pooper                                                                                                                          ',	'$2b$10$hlEqbNNLino9/X6FZn/ht.2pBHKIrHUamM96xD2uSlM/1vQ3ZFaj6',	'basic                                                                                                                           ',	'2025-08-11 00:51:30.142226+00'),
('b0be2823-5bd3-41d5-bc0d-6975a53ee6da',	'suss                                                                                                                            ',	'$2b$10$NLsp8nZjXScrHscw.FBAhuDEAGP32Gly9f4BW7fngKTFa4ewQbIqa',	'admin                                                                                                                           ',	'2025-08-14 01:02:53.53978+00'),
('1f09a234-d37f-44a3-b368-27ca9154fbb8',	'tuff                                                                                                                            ',	'$2b$10$haOGPYgp9ORrhnnP4E/nA.LsYsF1TBpBtZFkjevmEWKRdM9dZWUie',	'admin                                                                                                                           ',	'2025-08-14 01:07:00.493981+00'),
('4903ed30-ffc9-414b-bdd8-b7ea8b2950bd',	'glabor                                                                                                                          ',	'$2b$10$NfS.eYomQhn5mqOq5Ay8mubDmdNre8PxGNwDT4TuBYQUgsr434SUK',	'basic                                                                                                                           ',	'2025-08-11 00:51:30.142226+00'),
('48ed8a47-2bd0-49c3-9497-cccba0841eba',	'tart                                                                                                                            ',	'test123',	'admin                                                                                                                           ',	'2025-08-11 00:56:30.044039+00'),
('5ba2845e-a3e8-468e-ad61-54fc34ed6de6',	'check                                                                                                                           ',	'$2b$10$PoGjtRbGo4XEbd4jAW9h0udl4oWNniP0df9n8vPaXzyb1W1gb0wZW',	'                                                                                                                                ',	'2025-08-14 00:28:50.778706+00'),
('713f4b65-9c17-48ff-86bb-c9bf720ed09f',	'waaht                                                                                                                           ',	'$2b$10$WLbSnSY7.nCtON8IDQHQReWCEo44cTnTjnysAggfeMbTdi8iexALC',	'admin                                                                                                                           ',	'2025-08-11 00:59:58.759954+00');

ALTER TABLE ONLY "public"."user_birds" ADD CONSTRAINT "user_birds_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) NOT DEFERRABLE;

-- 2025-08-15 22:42:15 UTC
