BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Country" (
	"cnt_ID"	INTEGER NOT NULL,
	"cnt_name"	TEXT NOT NULL,
	"cnt_region"	TEXT NOT NULL,
	PRIMARY KEY("cnt_ID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Subject" (
	"subj_ID"	INTEGER NOT NULL,
	"subj_image"	BLOB NOT NULL,
	"subj_category"	TEXT NOT NULL,
	"subj_source"	TEXT NOT NULL,
	"subj_difficulty"	INTEGER NOT NULL,
	"subj_added_by"	TEXT NOT NULL,
	PRIMARY KEY("subj_ID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "User" (
	"usr_ID"	INTEGER NOT NULL,
	"usr_email"	TEXT NOT NULL UNIQUE,
	"usr_display_name"	TEXT NOT NULL UNIQUE,
	"usr_password"	TEXT NOT NULL,
	"usr_gender"	TEXT NOT NULL,
	"cnt_ID"	INTEGER NOT NULL,
	"usr_ethnicity"	TEXT,
	FOREIGN KEY("cnt_ID") REFERENCES "Country"("cnt_ID"),
	PRIMARY KEY("usr_ID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "CountryAdjacent" (
	"cnt_ID_1"	INTEGER NOT NULL,
	"cnt_ID_2"	INTEGER NOT NULL,
	FOREIGN KEY("cnt_ID_2") REFERENCES "Country"("cnt_ID"),
	FOREIGN KEY("cnt_ID_1") REFERENCES "Country"("cnt_ID"),
	PRIMARY KEY("cnt_ID_1","cnt_ID_2")
);
CREATE TABLE IF NOT EXISTS "Guess" (
	"gss_ID"	INTEGER NOT NULL,
	"subj_ID"	INTEGER NOT NULL,
	"usr_ID"	INTEGER NOT NULL,
	"gss_score"	INTEGER NOT NULL,
	"gss_last_updated"	TEXT NOT NULL,
	FOREIGN KEY("subj_ID") REFERENCES "Subject"("subj_ID"),
	FOREIGN KEY("usr_ID") REFERENCES "User"("usr_ID"),
	PRIMARY KEY("gss_ID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Leaderboard" (
	"lb_ID"	INTEGER NOT NULL,
	"lb_category"	TEXT NOT NULL,
	"lb_rank"	INTEGER NOT NULL,
	"usr_ID"	INTEGER NOT NULL,
	FOREIGN KEY("usr_ID") REFERENCES "User"("usr_ID"),
	PRIMARY KEY("lb_ID" AUTOINCREMENT)
);
COMMIT;
