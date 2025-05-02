BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "country" (
	"cnt_id"	integer,
	"cnt_continent"	varchar(255) NOT NULL,
	"cnt_name"	varchar(255) NOT NULL,
	"cnt_region"	varchar(255) NOT NULL,
	PRIMARY KEY("cnt_id")
);
CREATE TABLE IF NOT EXISTS "country_adjacent" (
	"cnt_id_1"	integer NOT NULL,
	"cnt_id_2"	integer NOT NULL,
	PRIMARY KEY("cnt_id_1","cnt_id_2")
);
CREATE TABLE IF NOT EXISTS "guess" (
	"gss_id"	integer,
	"gss_last_updated"	varchar(255) NOT NULL,
	"gss_score"	integer NOT NULL,
	"subj_id"	integer NOT NULL,
	"usr_id"	integer NOT NULL,
	PRIMARY KEY("gss_id")
);
CREATE TABLE IF NOT EXISTS "leaderboard" (
	"lb_id"	integer,
	"lb_category"	varchar(255) NOT NULL,
	"lb_rank"	integer NOT NULL,
	"usr_id"	integer NOT NULL,
	PRIMARY KEY("lb_id")
);
CREATE TABLE IF NOT EXISTS "subject" (
	"subj_id"	integer,
	"subj_added_by"	varchar(255) NOT NULL,
	"subj_category"	varchar(255) NOT NULL,
	"subj_difficulty"	integer NOT NULL,
	"subj_image"	blob NOT NULL,
	"subj_source"	varchar(255) NOT NULL,
	PRIMARY KEY("subj_id")
);
CREATE TABLE IF NOT EXISTS "user" (
	"usr_id"	integer,
	"usr_display_name"	varchar(255) NOT NULL UNIQUE,
	"usr_email"	varchar(255) NOT NULL UNIQUE,
	"usr_ethnicity"	varchar(255),
	"usr_gender"	varchar(255) NOT NULL,
	"usr_password"	varchar(255) NOT NULL,
	"usr_role"	varchar(255) NOT NULL,
	"cnt_id"	integer NOT NULL,
	PRIMARY KEY("usr_id")
);
INSERT INTO "country" VALUES (1,'Asia','Myanmar ','Southern Asia');
INSERT INTO "country" VALUES (2,'Asia','India ','Southern Asia');
INSERT INTO "country" VALUES (3,'Asia','China ','Eastern Asia');
INSERT INTO "country" VALUES (4,'Asia','Indonesia ','Southern Asia');
INSERT INTO "country" VALUES (5,'Asia','Pakistan ','Southern Asia');
INSERT INTO "country" VALUES (6,'Asia','Bangladesh ','Southern Asia');
INSERT INTO "country" VALUES (7,'Asia','Japan ','Eastern Asia');
INSERT INTO "country" VALUES (8,'Asia','Philippines ','Southern Asia');
INSERT INTO "country" VALUES (9,'Asia','Vietnam ','Southern Asia');
INSERT INTO "country" VALUES (10,'Asia','Iran ','Southern Asia');
INSERT INTO "country" VALUES (11,'Asia','Turkey ','Western Asia');
INSERT INTO "country" VALUES (12,'Asia','Thailand ','Southern Asia');
INSERT INTO "country" VALUES (13,'Asia','South Korea','Eastern Asia');
INSERT INTO "country" VALUES (14,'Asia','Iraq ','Western Asia');
INSERT INTO "country" VALUES (15,'Asia','Afghanistan ','Southern Asia');
INSERT INTO "country" VALUES (16,'Asia','Yemen ','Western Asia');
INSERT INTO "country" VALUES (17,'Asia','Uzbekistan ','Central Asia');
INSERT INTO "country" VALUES (18,'Asia','Malaysia','Southern Asia');
INSERT INTO "country" VALUES (19,'Asia','Saudi Arabia ','Western Asia');
INSERT INTO "country" VALUES (20,'Asia','Nepal ','Southern Asia');
INSERT INTO "country" VALUES (21,'Asia','North Korea','Eastern Asia');
INSERT INTO "country" VALUES (22,'Asia','Syria ','Western Asia');
INSERT INTO "country" VALUES (23,'Asia','Sri Lanka ','Southern Asia');
INSERT INTO "country" VALUES (24,'Asia','Kazakhstan ','Central Asia');
INSERT INTO "country" VALUES (25,'Asia','Cambodia ','Southern Asia');
INSERT INTO "country" VALUES (26,'Asia','Jordan ','Western Asia');
INSERT INTO "country" VALUES (27,'Asia','United Arab Emirates','Western Asia');
INSERT INTO "country" VALUES (28,'Asia','Tajikistan','Central Asia');
INSERT INTO "country" VALUES (29,'Asia','Azerbaijan','Western Asia');
INSERT INTO "country" VALUES (30,'Asia','Israel','Western Asia');
INSERT INTO "country" VALUES (31,'Asia','Laos ','Southern Asia');
INSERT INTO "country" VALUES (32,'Asia','Turkmenistan ','Central Asia');
INSERT INTO "country" VALUES (33,'Asia','Kyrgyzstan','Central Asia');
INSERT INTO "country" VALUES (34,'Asia','Singapore ','Southern Asia');
INSERT INTO "country" VALUES (35,'Asia','Lebanon ','Western Asia');
INSERT INTO "country" VALUES (36,'Asia','State of Palestine','Western Asia');
INSERT INTO "country" VALUES (37,'Asia','Oman ','Western Asia');
INSERT INTO "country" VALUES (38,'Asia','Kuwait ','Western Asia');
INSERT INTO "country" VALUES (39,'Asia','Georgia ','Western Asia');
INSERT INTO "country" VALUES (40,'Asia','Mongolia ','Eastern Asia');
INSERT INTO "country" VALUES (41,'Asia','Qatar ','Western Asia');
INSERT INTO "country" VALUES (42,'Asia','Armenia ','Western Asia');
INSERT INTO "country" VALUES (43,'Asia','Bahrain ','Western Asia');
INSERT INTO "country" VALUES (44,'Asia','Timore-Leste','Southern Asia');
INSERT INTO "country" VALUES (45,'Asia','Cyprus ','Western Asia');
INSERT INTO "country" VALUES (46,'Asia','Bhutan ','Southern Asia');
INSERT INTO "country" VALUES (47,'Asia','Maldives ','Southern Asia');
INSERT INTO "country" VALUES (48,'Asia','Brunei ','Southern Asia');
INSERT INTO "country" VALUES (49,'Asia','Taiwan ','Eastern Asia');
INSERT INTO "country" VALUES (50,'Asia','Hong Kong','Eastern Asia');
INSERT INTO "country" VALUES (51,'Asia','Macao ','Eastern Asia');
INSERT INTO "country" VALUES (52,'Africa','Nigeria ','West Africa
');
INSERT INTO "country" VALUES (53,'Africa','Ethiopia ','East Africa');
INSERT INTO "country" VALUES (54,'Africa','Egypt ','Northern africa');
INSERT INTO "country" VALUES (55,'Africa','Democratic Republic of the Congo','Central Africa');
INSERT INTO "country" VALUES (56,'Africa','Tanzania ','East Africa');
INSERT INTO "country" VALUES (57,'Africa','South Africa','Southern Africa');
INSERT INTO "country" VALUES (58,'Africa','Kenya ','East Africa');
INSERT INTO "country" VALUES (59,'Africa','Sudan ','Northern africa');
INSERT INTO "country" VALUES (60,'Africa','Uganda','East Africa');
INSERT INTO "country" VALUES (61,'Africa','Algeria ','Northern africa');
INSERT INTO "country" VALUES (62,'Africa','Angola ','Southern Africa');
INSERT INTO "country" VALUES (63,'Africa','Morocco ','Northern africa');
INSERT INTO "country" VALUES (64,'Africa','Mozambique ','Southern Africa');
INSERT INTO "country" VALUES (65,'Africa','Ghana','West Africa');
INSERT INTO "country" VALUES (66,'Africa','Madagascar','Southern Africa');
INSERT INTO "country" VALUES (67,'Africa','Côte d''Ivoire','West Africa');
INSERT INTO "country" VALUES (68,'Africa','Cameroon ','Central Africa');
INSERT INTO "country" VALUES (69,'Africa','Niger ','West Africa');
INSERT INTO "country" VALUES (70,'Africa','Mali ','West Africa');
INSERT INTO "country" VALUES (71,'Africa','Burkina Faso','West Africa');
INSERT INTO "country" VALUES (72,'Africa','Malawi ','Southern Africa');
INSERT INTO "country" VALUES (73,'Africa','Zambia ','Southern Africa');
INSERT INTO "country" VALUES (74,'Africa','Chad ','Central Africa');
INSERT INTO "country" VALUES (75,'Africa','Somalia ','East Africa');
INSERT INTO "country" VALUES (76,'Africa','Senegal ','West Africa');
INSERT INTO "country" VALUES (77,'Africa','Zimbabwe ','Southern Africa');
INSERT INTO "country" VALUES (78,'Africa','Guinea ','West Africa');
INSERT INTO "country" VALUES (79,'Africa','Benin ','West Africa');
INSERT INTO "country" VALUES (80,'Africa','Rwanda ','East Africa');
INSERT INTO "country" VALUES (81,'Africa','Burundi ','East Africa');
INSERT INTO "country" VALUES (82,'Africa','Tunisia ','Northern africa');
INSERT INTO "country" VALUES (83,'Africa','South Sudan','Northern africa');
INSERT INTO "country" VALUES (84,'Africa','Togo ','West Africa');
INSERT INTO "country" VALUES (85,'Africa','Sierra Leone','West Africa');
INSERT INTO "country" VALUES (86,'Africa','Libya ','Northern africa');
INSERT INTO "country" VALUES (87,'Africa','Congo','Central Africa');
INSERT INTO "country" VALUES (88,'Africa','Liberia','West Africa');
INSERT INTO "country" VALUES (89,'Africa','Central African Republic','Central Africa');
INSERT INTO "country" VALUES (90,'Africa','Mauritania','Northern africa');
INSERT INTO "country" VALUES (91,'Africa','Eritrea','Northern africa');
INSERT INTO "country" VALUES (92,'Africa','Namibia ','Southern Africa');
INSERT INTO "country" VALUES (93,'Africa','Gambia ','West Africa');
INSERT INTO "country" VALUES (94,'Africa','Gabon ','Central Africa');
INSERT INTO "country" VALUES (95,'Africa','Botswana ','Southern Africa');
INSERT INTO "country" VALUES (96,'Africa','Lesotho ','Southern Africa');
INSERT INTO "country" VALUES (97,'Africa','Guinea-Bissau','West Africa');
INSERT INTO "country" VALUES (98,'Africa','Equatorial Guinea','Central Africa');
INSERT INTO "country" VALUES (99,'Africa','Mauritius ','East Africa');
INSERT INTO "country" VALUES (100,'Africa','Eswatini ','Southern Africa');
INSERT INTO "country" VALUES (101,'Africa','Djibouti ','East Africa');
INSERT INTO "country" VALUES (102,'Africa','Comoros ','East Africa');
INSERT INTO "country" VALUES (103,'Africa','Cabo Verde','West Africa');
INSERT INTO "country" VALUES (104,'Africa','Sao Tome & Principe','Central Africa');
INSERT INTO "country" VALUES (105,'Africa','Seychelles ','East Africa');
INSERT INTO "country" VALUES (106,'North America','United States','Northern America');
INSERT INTO "country" VALUES (107,'North America','Canada','Northern America');
INSERT INTO "country" VALUES (108,'North America','Mexico','Northern America');
INSERT INTO "country" VALUES (109,'North America','Guatemala','Central America');
INSERT INTO "country" VALUES (110,'North America','Belize','Central America');
INSERT INTO "country" VALUES (111,'North America','Honduras','Central America');
INSERT INTO "country" VALUES (112,'North America','El Salvador','Central America');
INSERT INTO "country" VALUES (113,'North America','Nicaragua','Central America');
INSERT INTO "country" VALUES (114,'North America','Costa Rica','Central America');
INSERT INTO "country" VALUES (115,'North America','Panama','Central America');
INSERT INTO "country" VALUES (116,'North America','Cuba','Caribbean');
INSERT INTO "country" VALUES (117,'North America','Haiti','Caribbean');
INSERT INTO "country" VALUES (118,'North America','Dominican Republic','Caribbean');
INSERT INTO "country" VALUES (119,'North America','Jamaica','Caribbean');
INSERT INTO "country" VALUES (120,'North America','Trinidad and Tobago','Caribbean');
INSERT INTO "country" VALUES (121,'North America','Bahamas','Caribbean');
INSERT INTO "country" VALUES (122,'North America','Barbados','Caribbean');
INSERT INTO "country" VALUES (123,'North America','Saint Lucia','Caribbean');
INSERT INTO "country" VALUES (124,'North America','Grenada','Caribbean');
INSERT INTO "country" VALUES (125,'North America','Aruba','Caribbean');
INSERT INTO "country" VALUES (126,'North America','Saint Vincent and the Grenadines','Caribbean');
INSERT INTO "country" VALUES (127,'North America','Antigua and Barbuda','Caribbean');
INSERT INTO "country" VALUES (128,'North America','Dominica','Caribbean');
INSERT INTO "country" VALUES (129,'North America','Saint Kitts and Nevis','Caribbean');
INSERT INTO "country" VALUES (130,'North America','Turks and Caicos','Caribbean');
INSERT INTO "country" VALUES (131,'North America','Sint Maarten','Caribbean');
INSERT INTO "country" VALUES (132,'North America','British Virgin Islands','Caribbean');
INSERT INTO "country" VALUES (133,'North America','Anguilla','Caribbean');
INSERT INTO "country" VALUES (134,'North America','Saint Barthelemy','Caribbean');
INSERT INTO "country" VALUES (135,'North America','Saint Pierre and Miquelon ','Caribbean');
INSERT INTO "country" VALUES (136,'North America','Montserrat','Caribbean');
INSERT INTO "country" VALUES (137,'North America','Guadeloupe ','Caribbean');
INSERT INTO "country" VALUES (138,'North America','Martinique ','Caribbean');
INSERT INTO "country" VALUES (139,'North America','Curaçao','Caribbean');
INSERT INTO "country" VALUES (140,'North America','U.S. Virgin Islands ','Caribbean');
INSERT INTO "country" VALUES (141,'North America','Cayman Islands ','Caribbean');
INSERT INTO "country" VALUES (142,'North America','Bermuda ','Caribbean');
INSERT INTO "country" VALUES (143,'North America','Caribbean Netherlands ','Caribbean');
INSERT INTO "country" VALUES (144,'North America','Greenland ','Caribbean');
INSERT INTO "country" VALUES (145,'South America','Brazil ','Southern America ');
INSERT INTO "country" VALUES (146,'South America','Colombia','Southern America ');
INSERT INTO "country" VALUES (147,'South America','Argentina','Southern America ');
INSERT INTO "country" VALUES (148,'South America','Peru','Southern America ');
INSERT INTO "country" VALUES (149,'South America','Venezuela','Southern America ');
INSERT INTO "country" VALUES (150,'South America','Chile','Southern America ');
INSERT INTO "country" VALUES (151,'South America','Ecuador','Southern America ');
INSERT INTO "country" VALUES (152,'South America','Bolivia','Southern America ');
INSERT INTO "country" VALUES (153,'South America','Paraguay','Southern America ');
INSERT INTO "country" VALUES (154,'South America','Uruguay','Southern America ');
INSERT INTO "country" VALUES (155,'South America','Guyana','Southern America ');
INSERT INTO "country" VALUES (156,'South America','Suriname','Southern America ');
INSERT INTO "country" VALUES (157,'South America','French Guiana','Southern America ');
INSERT INTO "country" VALUES (158,'South America','Falkland Islands','Southern America ');
INSERT INTO "country" VALUES (159,'South America','United Kingdom','Northern Europe');
INSERT INTO "country" VALUES (160,'Europe','Ireland','Northern Europe');
INSERT INTO "country" VALUES (161,'Europe','Iceland','Northern Europe');
INSERT INTO "country" VALUES (162,'Europe','Norway','Northern Europe');
INSERT INTO "country" VALUES (163,'Europe','Sweden','Northern Europe');
INSERT INTO "country" VALUES (164,'Europe','Finland','Northern Europe');
INSERT INTO "country" VALUES (165,'Europe','Denmark','Northern Europe');
INSERT INTO "country" VALUES (166,'Europe','Estonia','Northern Europe');
INSERT INTO "country" VALUES (167,'Europe','Latvia','Northern Europe');
INSERT INTO "country" VALUES (168,'Europe','Lithuania','Northern Europe');
INSERT INTO "country" VALUES (169,'Europe','Faroe Islands ','Northern Europe');
INSERT INTO "country" VALUES (170,'Europe','Isle of Man','Northern Europe');
INSERT INTO "country" VALUES (171,'Europe','Greenland ','Northern Europe');
INSERT INTO "country" VALUES (172,'Europe','France','Western Europe');
INSERT INTO "country" VALUES (173,'Europe','Germany','Western Europe');
INSERT INTO "country" VALUES (174,'Europe','Netherlands','Western Europe');
INSERT INTO "country" VALUES (175,'Europe','Belgium','Western Europe');
INSERT INTO "country" VALUES (176,'Europe','Luxembourg','Western Europe');
INSERT INTO "country" VALUES (177,'Europe','Switzerland','Western Europe');
INSERT INTO "country" VALUES (178,'Europe','Liechtenstein','Western Europe');
INSERT INTO "country" VALUES (179,'Europe','Monaco','Western Europe');
INSERT INTO "country" VALUES (180,'Europe','Andorra','Western Europe');
INSERT INTO "country" VALUES (181,'Europe','Gibraltar ','Western Europe');
INSERT INTO "country" VALUES (182,'Europe','Holy See ','Western Europe');
INSERT INTO "country" VALUES (183,'Europe','Spain','Northern Europe');
INSERT INTO "country" VALUES (184,'Europe','Portugal','Northern Europe');
INSERT INTO "country" VALUES (185,'Europe','Italy','Northern Europe');
INSERT INTO "country" VALUES (186,'Europe','Greece','Northern Europe');
INSERT INTO "country" VALUES (187,'Europe','Croatia','Northern Europe');
INSERT INTO "country" VALUES (188,'Europe','Bosnia and Herzegovina','Northern Europe');
INSERT INTO "country" VALUES (189,'Europe','Albania','Northern Europe');
INSERT INTO "country" VALUES (190,'Europe','Slovenia','Northern Europe');
INSERT INTO "country" VALUES (191,'Europe','Montenegro','Northern Europe');
INSERT INTO "country" VALUES (192,'Europe','North Macedonia','Northern Europe');
INSERT INTO "country" VALUES (193,'Europe','Malta','Northern Europe');
INSERT INTO "country" VALUES (194,'Europe','San Marino','Northern Europe');
INSERT INTO "country" VALUES (195,'Europe','Ukraine','Eastern Europe');
INSERT INTO "country" VALUES (196,'Europe','Poland','Central Europe');
INSERT INTO "country" VALUES (197,'Europe','Romania','Eastern Europe');
INSERT INTO "country" VALUES (198,'Europe','Hungary','Central Europe');
INSERT INTO "country" VALUES (199,'Europe','Czech Republic','Central Europe');
INSERT INTO "country" VALUES (200,'Europe','Slovakia','Central Europe');
INSERT INTO "country" VALUES (201,'Europe','Bulgaria','Southeast Europe');
INSERT INTO "country" VALUES (202,'Europe','Belarus','Eastern Europe');
INSERT INTO "country" VALUES (203,'Europe','Serbia','Southern Europe');
INSERT INTO "country" VALUES (204,'Europe','Moldova','Eastern Europe');
INSERT INTO "country" VALUES (205,'Europe','Serbia','Southern Europe');
INSERT INTO "country" VALUES (206,'Europe','Montenegro','Southern Europe');
INSERT INTO "country" VALUES (207,'Europe','Bosnia and Herzegovina','Southern Europe');
INSERT INTO "country" VALUES (208,'Europe','Albania','Southern Europe');
INSERT INTO "country" VALUES (209,'Europe','Croatia','Central Europe');
INSERT INTO "country" VALUES (210,'Europe','North Macedonia','Southern Europe');
INSERT INTO "country" VALUES (211,'Europe','Kosovo','Southern Europe');
INSERT INTO "country" VALUES (212,'Europe','Liechtenstein','Western Europe');
INSERT INTO "country" VALUES (213,'Australia','Australia ','Australia and New Zealand');
INSERT INTO "country" VALUES (214,'Australia','New Zealand','Australia and New Zealand');
INSERT INTO "country" VALUES (215,'Australia','Papua New Guinea','Melanesia');
INSERT INTO "country" VALUES (216,'Australia','Fiji ','Melanesia');
INSERT INTO "country" VALUES (217,'Australia','Solomon Islands','Melanesia');
INSERT INTO "country" VALUES (218,'Australia','Vanuatu ','Melanesia');
INSERT INTO "country" VALUES (219,'Australia','New Caledonia','Melanesia');
INSERT INTO "country" VALUES (220,'Australia','French Polynesia','Polynesia');
INSERT INTO "country" VALUES (221,'Australia','Samoa ','Polynesia');
INSERT INTO "country" VALUES (222,'Australia','Guam ','Micronesia');
INSERT INTO "country" VALUES (223,'Australia','Kiribati ','Micronesia');
INSERT INTO "country" VALUES (224,'Australia','Micronesia ','Micronesia');
INSERT INTO "country" VALUES (225,'Australia','Tonga ','Polynesia');
INSERT INTO "country" VALUES (226,'Australia','American Samoa','Polynesia');
INSERT INTO "country" VALUES (227,'Australia','Northern Mariana Islands','Micronesia');
INSERT INTO "country" VALUES (228,'Australia','Marshall Islands','Micronesia');
INSERT INTO "country" VALUES (229,'Australia','Palau ','Micronesia');
INSERT INTO "country" VALUES (230,'Australia','Cook Islands','Polynesia');
INSERT INTO "country" VALUES (231,'Australia','Nauru ','Micronesia');
INSERT INTO "country" VALUES (232,'Australia','Wallis & Futuna','Polynesia');
INSERT INTO "country" VALUES (233,'Australia','Tuvalu ','Micronesia');
INSERT INTO "country" VALUES (234,'Australia','Tokelau ','Polynesia');
INSERT INTO "country" VALUES (235,'Australia','Niue ','Polynesia');
COMMIT;
