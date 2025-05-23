BEGIN TRANSACTION;
INSERT INTO "country" ("continent","name","region") 
VALUES 
 ('Asia','Myanmar ','Southern Asia'),
 ('Asia','India ','Southern Asia'),
 ('Asia','China ','Eastern Asia'),
 ('Asia','Indonesia ','Southern Asia'),
 ('Asia','Pakistan ','Southern Asia'),
 ('Asia','Bangladesh ','Southern Asia'),
 ('Asia','Japan ','Eastern Asia'),
 ('Asia','Philippines ','Southern Asia'),
 ('Asia','Vietnam ','Southern Asia'),
 ('Asia','Iran ','Southern Asia'),
 ('Asia','Turkey ','Western Asia'),
 ('Asia','Thailand ','Southern Asia'),
 ('Asia','South Korea','Eastern Asia'),
 ('Asia','Iraq ','Western Asia'),
 ('Asia','Afghanistan ','Southern Asia'),
 ('Asia','Yemen ','Western Asia'),
 ('Asia','Uzbekistan ','Central Asia'),
 ('Asia','Malaysia','Southern Asia'),
 ('Asia','Saudi Arabia ','Western Asia'),
 ('Asia','Nepal ','Southern Asia'),
 ('Asia','North Korea','Eastern Asia'),
 ('Asia','Syria ','Western Asia'),
 ('Asia','Sri Lanka ','Southern Asia'),
 ('Asia','Kazakhstan ','Central Asia'),
 ('Asia','Cambodia ','Southern Asia'),
 ('Asia','Jordan ','Western Asia'),
 ('Asia','United Arab Emirates','Western Asia'),
 ('Asia','Tajikistan','Central Asia'),
 ('Asia','Azerbaijan','Western Asia'),
 ('Asia','Israel','Western Asia'),
 ('Asia','Laos ','Southern Asia'),
 ('Asia','Turkmenistan ','Central Asia'),
 ('Asia','Kyrgyzstan','Central Asia'),
 ('Asia','Singapore ','Southern Asia'),
 ('Asia','Lebanon ','Western Asia'),
 ('Asia','Palestine','Western Asia'),
 ('Asia','Oman ','Western Asia'),
 ('Asia','Kuwait ','Western Asia'),
 ('Asia','Georgia ','Western Asia'),
 ('Asia','Mongolia ','Eastern Asia'),
 ('Asia','Qatar ','Western Asia'),
 ('Asia','Armenia ','Western Asia'),
 ('Asia','Bahrain ','Western Asia'),
 ('Asia','Timore-Leste','Southern Asia'),
 ('Asia','Cyprus ','Western Asia'),
 ('Asia','Bhutan ','Southern Asia'),
 ('Asia','Maldives ','Southern Asia'),
 ('Asia','Brunei ','Southern Asia'),
 ('Asia','Taiwan ','Eastern Asia'),
 ('Asia','Hong Kong','Eastern Asia'),
 ('Asia','Macao ','Eastern Asia'),
 ('Africa','Nigeria ','West Africa'),
 ('Africa','Ethiopia ','East Africa'),
 ('Africa','Egypt ','Northern africa'),
 ('Africa','Democratic Republic of the Congo','Central Africa'),
 ('Africa','Tanzania ','East Africa'),
 ('Africa','South Africa','Southern Africa'),
 ('Africa','Kenya ','East Africa'),
 ('Africa','Sudan ','Northern africa'),
 ('Africa','Uganda','East Africa'),
 ('Africa','Algeria ','Northern africa'),
 ('Africa','Angola ','Southern Africa'),
 ('Africa','Morocco ','Northern africa'),
 ('Africa','Mozambique ','Southern Africa'),
 ('Africa','Ghana','West Africa'),
 ('Africa','Madagascar','Southern Africa'),
 ('Africa','Côte d''Ivoire','West Africa'),
 ('Africa','Cameroon ','Central Africa'),
 ('Africa','Niger ','West Africa'),
 ('Africa','Mali ','West Africa'),
 ('Africa','Burkina Faso','West Africa'),
 ('Africa','Malawi ','Southern Africa'),
 ('Africa','Zambia ','Southern Africa'),
 ('Africa','Chad ','Central Africa'),
 ('Africa','Somalia ','East Africa'),
 ('Africa','Senegal ','West Africa'),
 ('Africa','Zimbabwe ','Southern Africa'),
 ('Africa','Guinea ','West Africa'),
 ('Africa','Benin ','West Africa'),
 ('Africa','Rwanda ','East Africa'),
 ('Africa','Burundi ','East Africa'),
 ('Africa','Tunisia ','Northern africa'),
 ('Africa','South Sudan','Northern africa'),
 ('Africa','Togo ','West Africa'),
 ('Africa','Sierra Leone','West Africa'),
 ('Africa','Libya ','Northern africa'),
 ('Africa','Congo','Central Africa'),
 ('Africa','Liberia','West Africa'),
 ('Africa','Central African Republic','Central Africa'),
 ('Africa','Mauritania','Northern africa'),
 ('Africa','Eritrea','Northern africa'),
 ('Africa','Namibia ','Southern Africa'),
 ('Africa','Gambia ','West Africa'),
 ('Africa','Gabon ','Central Africa'),
 ('Africa','Botswana ','Southern Africa'),
 ('Africa','Lesotho ','Southern Africa'),
 ('Africa','Guinea-Bissau','West Africa'),
 ('Africa','Equatorial Guinea','Central Africa'),
 ('Africa','Mauritius ','East Africa'),
 ('Africa','Eswatini ','Southern Africa'),
 ('Africa','Djibouti ','East Africa'),
 ('Africa','Comoros ','East Africa'),
 ('Africa','Cabo Verde','West Africa'),
 ('Africa','Sao Tome & Principe','Central Africa'),
 ('Africa','Seychelles ','East Africa'),
 ('North America','United States of America','Northern America'),
 ('North America','Canada','Northern America'),
 ('North America','Mexico','Northern America'),
 ('North America','Guatemala','Central America'),
 ('North America','Belize','Central America'),
 ('North America','Honduras','Central America'),
 ('North America','El Salvador','Central America'),
 ('North America','Nicaragua','Central America'),
 ('North America','Costa Rica','Central America'),
 ('North America','Panama','Central America'),
 ('North America','Cuba','Caribbean'),
 ('North America','Haiti','Caribbean'),
 ('North America','Dominican Republic','Caribbean'),
 ('North America','Jamaica','Caribbean'),
 ('North America','Trinidad and Tobago','Caribbean'),
 ('North America','Bahamas','Caribbean'),
 ('North America','Barbados','Caribbean'),
 ('North America','Saint Lucia','Caribbean'),
 ('North America','Grenada','Caribbean'),
 ('North America','Saint Vincent and the Grenadines','Caribbean'),
 ('North America','Antigua and Barbuda','Caribbean'),
 ('North America','Dominica','Caribbean'),
 ('North America','Saint Kitts and Nevis','Caribbean'),
 ('South America','Brazil ','Southern America '),
 ('South America','Colombia','Southern America '),
 ('South America','Argentina','Southern America '),
 ('South America','Peru','Southern America '),
 ('South America','Venezuela','Southern America '),
 ('South America','Chile','Southern America '),
 ('South America','Ecuador','Southern America '),
 ('South America','Bolivia','Southern America '),
 ('South America','Paraguay','Southern America '),
 ('South America','Uruguay','Southern America '),
 ('South America','Guyana','Southern America '),
 ('South America','Suriname','Southern America '),
 ('South America','United Kingdom','Northern Europe'),
 ('Europe','Ireland','Northern Europe'),
 ('Europe','Iceland','Northern Europe'),
 ('Europe','Norway','Northern Europe'),
 ('Europe','Sweden','Northern Europe'),
 ('Europe','Finland','Northern Europe'),
 ('Europe','Denmark','Northern Europe'),
 ('Europe','Estonia','Northern Europe'),
 ('Europe','Latvia','Northern Europe'),
 ('Europe','Lithuania','Northern Europe'),
 ('Europe','France','Western Europe'),
 ('Europe','Germany','Western Europe'),
 ('Europe','Netherlands','Western Europe'),
 ('Europe','Belgium','Western Europe'),
 ('Europe','Luxembourg','Western Europe'),
 ('Europe','Switzerland','Western Europe'),
 ('Europe','Liechtenstein','Western Europe'),
 ('Europe','Monaco','Western Europe'),
 ('Europe','Andorra','Western Europe'),
 ('Europe','Vatican City','Western Europe'),
 ('Europe','Spain','Northern Europe'),
 ('Europe','Portugal','Northern Europe'),
 ('Europe','Italy','Northern Europe'),
 ('Europe','Greece','Northern Europe'),
 ('Europe','Croatia','Northern Europe'),
 ('Europe','Bosnia and Herzegovina','Northern Europe'),
 ('Europe','Albania','Northern Europe'),
 ('Europe','Slovenia','Northern Europe'),
 ('Europe','Montenegro','Northern Europe'),
 ('Europe','North Macedonia','Northern Europe'),
 ('Europe','Malta','Northern Europe'),
 ('Europe','San Marino','Northern Europe'),
 ('Europe','Ukraine','Eastern Europe'),
 ('Europe','Poland','Central Europe'),
 ('Europe','Romania','Eastern Europe'),
 ('Europe','Hungary','Central Europe'),
 ('Europe','Czech Republic','Central Europe'),
 ('Europe','Slovakia','Central Europe'),
 ('Europe','Bulgaria','Southeast Europe'),
 ('Europe','Belarus','Eastern Europe'),
 ('Europe','Serbia','Southern Europe'),
 ('Europe','Moldova','Eastern Europe'),
 ('Europe','Kosovo','Southern Europe'),
 ('Europe','Austria','Central Europe'),
 ('Europe','Russia','Eastern Europe'),
 ('Australia','Australia ','Australia and New Zealand'),
 ('Australia','New Zealand','Australia and New Zealand'),
 ('Australia','Papua New Guinea','Melanesia'),
 ('Australia','Fiji ','Melanesia'),
 ('Australia','Solomon Islands','Melanesia'),
 ('Australia','Vanuatu ','Melanesia'),
 ('Australia','Samoa ','Polynesia'),
 ('Australia','Kiribati ','Micronesia'),
 ('Australia','Micronesia ','Micronesia'),
 ('Australia','Tonga ','Polynesia'),
 ('Australia','Marshall Islands','Micronesia'),
 ('Australia','Palau ','Micronesia'),
 ('Australia','Nauru ','Micronesia'),
 ('Australia','Tuvalu ','Micronesia');
COMMIT;
