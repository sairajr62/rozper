export interface CountryData {
  name: string
  slug: string
  dialCode: string
  isoCode2: string
  isoCode3: string
  utcOffset: number
  capital: string
  currency: string
  currencyCode: string
  region: "europe" | "asia" | "africa" | "americas" | "oceania" | "mideast"
  workingDays: string
  language: string
  population: number | null
  areaKm2: number | null
  gdpUsd: number | null
}

export interface CallWindow {
  start: string
  end: string
  crossesMidnight: boolean
  raw: { start: number; end: number }
}

export interface BestCallingTimes {
  localBizStart: string
  localBizEnd: string
  est: CallWindow
  cst: CallWindow
  pst: CallWindow
  recommendation: string
  diffFromEST: string
}

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['.]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function formatHour(h: number): string {
  const n = ((Math.round(h) % 24) + 24) % 24
  const h12 = n % 12 || 12
  return `${h12}:00 ${n >= 12 ? "PM" : "AM"}`
}

function makeWindow(localHour: number, utcOffset: number, tzOffset: number): CallWindow {
  const utcH = localHour - utcOffset
  const localH = utcH + tzOffset
  return {
    start: formatHour(localH),
    end: formatHour(localH + 8),
    crossesMidnight: (((localH % 24) + 24) % 24) > (((localH + 8) % 24) + 24) % 24,
    raw: { start: localH, end: localH + 8 },
  }
}

export function getBestCallingTimes(country: CountryData): BestCallingTimes {
  const est = makeWindow(9, country.utcOffset, -5)
  const cst = makeWindow(9, country.utcOffset, -6)
  const pst = makeWindow(9, country.utcOffset, -8)

  const diffH = country.utcOffset - (-5)
  const absDiff = Math.abs(diffH)
  const diffLabel =
    absDiff === 0
      ? "same timezone as US East"
      : `UTC${country.utcOffset >= 0 ? "+" : ""}${country.utcOffset === Math.floor(country.utcOffset) ? country.utcOffset : country.utcOffset.toFixed(2).replace(".00", "")}`

  const estStartNorm = (((est.raw.start) % 24) + 24) % 24
  let recommendation = ""
  if (estStartNorm >= 6 && estStartNorm <= 18) {
    recommendation = `The overlap between US business hours and ${country.name} business hours is during ${est.start}–${est.end} EST — a workable window for most teams.`
  } else if (estStartNorm < 6) {
    recommendation = `${country.name} is far ahead of US time. Early morning calls (5–9 AM EST) catch their afternoon. Consider async communication for routine matters.`
  } else {
    recommendation = `${country.name} business hours overlap with US afternoon/evening. Plan calls for after 3 PM EST to reach their morning.`
  }

  return {
    localBizStart: "9:00 AM",
    localBizEnd: "5:00 PM",
    est,
    cst,
    pst,
    recommendation,
    diffFromEST: diffLabel,
  }
}

export function formatDialCode(raw: string): string {
  const first = raw.split(",")[0].trim()
  return `+${first}`
}

export function formatUTCOffset(offset: number): string {
  const sign = offset >= 0 ? "+" : "-"
  const abs = Math.abs(offset)
  const h = Math.floor(abs)
  const m = Math.round((abs - h) * 60)
  return m > 0 ? `UTC${sign}${h}:${m.toString().padStart(2, "0")}` : `UTC${sign}${h}`
}

// ─── Raw data ──────────────────────────────────────────────────────────────────
// [name, dialCode, iso2, iso3, utcOffset, capital, currency, currencyCode, region, workDays, language, pop, area, gdp]
type Row = [string, string, string, string, number, string, string, string, CountryData["region"], string, string, number | null, number | null, number | null]

const RAW: Row[] = [
  ["Afghanistan","93","AF","AFG",4.5,"Kabul","Afghan Afghani","AFN","asia","Sun–Thu","Dari/Pashto",42239854,647500,14266000000],
  ["Albania","355","AL","ALB",1,"Tirana","Albanian Lek","ALL","europe","Mon–Fri","Albanian",2832439,28748,18916380000],
  ["Algeria","213","DZ","DZA",1,"Algiers","Algerian Dinar","DZD","africa","Sun–Thu","Arabic/French",45606480,2381740,194998450000],
  ["American Samoa","1-684","AS","ASM",-11,"Pago Pago","US Dollar","USD","oceania","Mon–Fri","English/Samoan",43914,199,871000000],
  ["Andorra","376","AD","AND",1,"Andorra la Vella","Euro","EUR","europe","Mon–Fri","Catalan",80088,468,3352030000],
  ["Angola","244","AO","AGO",1,"Luanda","Angolan Kwanza","AOA","africa","Mon–Fri","Portuguese",36684202,1246700,106782770000],
  ["Anguilla","1-264","AI","AIA",-4,"The Valley","East Caribbean Dollar","XCD","americas","Mon–Fri","English",15899,102,175000000],
  ["Antarctica","672","AQ","ATA",0,"N/A","N/A","N/A","oceania","N/A","N/A",null,14000000,null],
  ["Antigua and Barbuda","1-268","AG","ATG",-4,"Saint John's","East Caribbean Dollar","XCD","americas","Mon–Fri","English",94298,443,1867730000],
  ["Argentina","54","AR","ARG",-3,"Buenos Aires","Argentine Peso","ARS","americas","Mon–Fri","Spanish",45773884,2766890,631133380000],
  ["Armenia","374","AM","ARM",4,"Yerevan","Armenian Dram","AMD","asia","Mon–Fri","Armenian",2777970,29800,19513470000],
  ["Aruba","297","AW","ABW",-4,"Oranjestad","Aruban Florin","AWG","americas","Mon–Fri","Papiamento/Dutch",106277,193,3544710000],
  ["Australia","61","AU","AUS",10,"Canberra","Australian Dollar","AUD","oceania","Mon–Fri","English",26439111,7686850,1692956650000],
  ["Austria","43","AT","AUT",1,"Vienna","Euro","EUR","europe","Mon–Fri","German",8958960,83858,470941930000],
  ["Azerbaijan","994","AZ","AZE",4,"Baku","Azerbaijani Manat","AZN","asia","Mon–Fri","Azerbaijani",10412651,86600,78721060000],
  ["Bahamas","1-242","BS","BHS",-5,"Nassau","Bahamian Dollar","BSD","americas","Mon–Fri","English",412623,13940,12897400000],
  ["Bahrain","973","BH","BHR",3,"Manama","Bahraini Dinar","BHD","mideast","Sun–Thu","Arabic",1485509,665,44383300000],
  ["Bangladesh","880","BD","BGD",6,"Dhaka","Bangladeshi Taka","BDT","asia","Sun–Thu","Bengali",173000000,144000,460201270000],
  ["Barbados","1-246","BB","BRB",-4,"Bridgetown","Barbadian Dollar","BBD","americas","Mon–Fri","English",281995,431,5699950000],
  ["Belarus","375","BY","BLR",3,"Minsk","Belarusian Ruble","BYR","europe","Mon–Fri","Belarusian/Russian",9498238,207600,72793460000],
  ["Belgium","32","BE","BEL",1,"Brussels","Euro","EUR","europe","Mon–Fri","Dutch/French/German",11686140,30510,583435600000],
  ["Belize","501","BZ","BLZ",-6,"Belmopan","Belize Dollar","BZD","americas","Mon–Fri","English",410825,22966,2830510000],
  ["Benin","229","BJ","BEN",1,"Porto-Novo","West African Franc","XOF","africa","Mon–Fri","French",13712828,112620,17396790000],
  ["Bermuda","1-441","BM","BMU",-4,"Hamilton","Bermudian Dollar","BMD","americas","Mon–Fri","English",64069,53,7546000000],
  ["Bhutan","975","BT","BTN",6,"Thimphu","Bhutanese Ngultrum","BTN","asia","Mon–Fri","Dzongkha",787424,47000,2768000000],
  ["Bolivia","591","BO","BOL",-4,"Sucre","Bolivian Boliviano","BOB","americas","Mon–Fri","Spanish",12388571,1098580,44008280000],
  ["Bosnia and Herzegovina","387","BA","BIH",1,"Sarajevo","Bosnia-Herzegovina Convertible Mark","BAM","europe","Mon–Fri","Bosnian",3210847,51129,24473910000],
  ["Botswana","267","BW","BWA",2,"Gaborone","Botswana Pula","BWP","africa","Mon–Fri","English/Tswana",2675352,600370,20355540000],
  ["Brazil","55","BR","BRA",-3,"Brasília","Brazilian Real","BRL","americas","Mon–Fri","Portuguese",216000000,8511965,1920095780000],
  ["British Indian Ocean Territory","246","IO","IOT",6,"Diego Garcia","US Dollar","USD","asia","Mon–Fri","English",null,60,60000000],
  ["British Virgin Islands","1-284","VG","VGB",-4,"Road Town","US Dollar","USD","americas","Mon–Fri","English",31538,153,1100000000],
  ["Brunei","673","BN","BRN",8,"Bandar Seri Begawan","Brunei Dollar","BND","asia","Mon–Thu","Malay",452524,5770,16681540000],
  ["Bulgaria","359","BG","BGR",2,"Sofia","Bulgarian Lev","BGN","europe","Mon–Fri","Bulgarian",6687717,110910,90346170000],
  ["Burkina Faso","226","BF","BFA",0,"Ouagadougou","West African Franc","XOF","africa","Mon–Fri","French",23251485,274200,18820060000],
  ["Burundi","257","BI","BDI",2,"Gitega","Burundian Franc","BIF","africa","Mon–Fri","French/Kirundi",13238559,27830,3338720000],
  ["Cambodia","855","KH","KHM",7,"Phnom Penh","Cambodian Riel","KHR","asia","Mon–Fri","Khmer",16944826,181040,2226860000],
  ["Cameroon","237","CM","CMR",1,"Yaoundé","Central African Franc","XAF","africa","Mon–Fri","French/English",28647293,475440,29504830000],
  ["Canada","1","CA","CAN",-5,"Ottawa","Canadian Dollar","CAD","americas","Mon–Fri","English/French",38781291,9984670,43644070000],
  ["Cape Verde","238","CV","CPV",-1,"Praia","Cape Verdean Escudo","CVE","africa","Mon–Fri","Portuguese",598682,4033,2161483370000],
  ["Cayman Islands","1-345","KY","CYM",-5,"George Town","Cayman Islands Dollar","KYD","americas","Mon–Fri","English",69310,262,6844830000],
  ["Central African Republic","236","CF","CAF",1,"Bangui","Central African Franc","XAF","africa","Mon–Fri","French/Sango",5742315,622984,2382620000],
  ["Chad","235","TD","TCD",1,"N'Djamena","Central African Franc","XAF","africa","Mon–Fri","French/Arabic",18278568,1284000,12704150000],
  ["Chile","56","CL","CHL",-4,"Santiago","Chilean Peso","CLP","americas","Mon–Fri","Spanish",19629590,756950,301024720000],
  ["China","86","CN","CHN",8,"Beijing","Chinese Yuan","CNY","asia","Mon–Fri","Mandarin",1430000000,9596960,17963171480000],
  ["Christmas Island","61","CX","CXR",7,"Flying Fish Cove","Australian Dollar","AUD","oceania","Mon–Fri","English",null,135,100000000],
  ["Cocos Islands","61","CC","CCK",6.5,"West Island","Australian Dollar","AUD","oceania","Mon–Fri","English",null,14,25000000],
  ["Colombia","57","CO","COL",-5,"Bogotá","Colombian Peso","COP","americas","Mon–Fri","Spanish",52085168,1138910,343622110000],
  ["Comoros","269","KM","COM",3,"Moroni","Comorian Franc","KMF","africa","Sun–Thu","Comorian/Arabic/French",852075,2170,1242520000],
  ["Cook Islands","682","CK","COK",-10,"Avarua","New Zealand Dollar","NZD","oceania","Mon–Fri","English/Maori",17044,240,300000000],
  ["Costa Rica","506","CR","CRI",-6,"San José","Costa Rican Colón","CRC","americas","Mon–Fri","Spanish",5212173,51100,69243630000],
  ["Croatia","385","HR","HRV",1,"Zagreb","Croatian Kuna","HRK","europe","Mon–Fri","Croatian",4008617,56542,71600050000],
  ["Cuba","53","CU","CUB",-5,"Havana","Cuban Peso","CUP","americas","Mon–Fri","Spanish",11194449,110860,107351800000],
  ["Curacao","599","CW","CUW",-4,"Willemstad","Netherlands Antillean Guilder","ANG","americas","Mon–Fri","Papiamento/Dutch",192077,444,3075180000],
  ["Cyprus","357","CY","CYP",2,"Nicosia","Euro","EUR","europe","Mon–Fri","Greek/Turkish",1260138,9250,29250520000],
  ["Czech Republic","420","CZ","CZE",1,"Prague","Czech Koruna","CZK","europe","Mon–Fri","Czech",10495295,78866,290565650000],
  ["Democratic Republic of the Congo","243","CD","COD",1,"Kinshasa","Congolese Franc","CDF","africa","Mon–Fri","French",102000000,2345410,64718640000],
  ["Denmark","45","DK","DNK",1,"Copenhagen","Danish Krone","DKK","europe","Mon–Fri","Danish",5910913,43094,400167200000],
  ["Djibouti","253","DJ","DJI",3,"Djibouti City","Djiboutian Franc","DJF","africa","Sun–Thu","French/Arabic",1136455,23000,3515110000],
  ["Dominica","1-767","DM","DMA",-4,"Roseau","East Caribbean Dollar","XCD","americas","Mon–Fri","English",73040,754,607440000],
  ["Dominican Republic","1-809","DO","DOM",-4,"Santo Domingo","Dominican Peso","DOP","americas","Mon–Fri","Spanish",11332972,48730,113537370000],
  ["East Timor","670","TL","TLS",9,"Dili","US Dollar","USD","asia","Mon–Fri","Portuguese/Tetum",1367047,15007,3480000000],
  ["Ecuador","593","EC","ECU",-5,"Quito","US Dollar","USD","americas","Mon–Fri","Spanish",18190484,283560,115049480000],
  ["Egypt","20","EG","EGY",2,"Cairo","Egyptian Pound","EGP","africa","Sun–Thu","Arabic",113000000,1001450,476747720000],
  ["El Salvador","503","SV","SLV",-6,"San Salvador","US Dollar","USD","americas","Mon–Fri","Spanish",6364943,21040,32488720000],
  ["Equatorial Guinea","240","GQ","GNQ",1,"Malabo","Central African Franc","XAF","africa","Mon–Fri","Spanish/French",1714671,28051,12029630000],
  ["Eritrea","291","ER","ERI",3,"Asmara","Eritrean Nakfa","ERN","africa","Mon–Fri","Tigrinya/Arabic",3748901,121320,2065000000],
  ["Estonia","372","EE","EST",2,"Tallinn","Euro","EUR","europe","Mon–Fri","Estonian",1322765,45226,38100810000],
  ["Ethiopia","251","ET","ETH",3,"Addis Ababa","Ethiopian Birr","ETB","africa","Mon–Fri","Amharic",127000000,1127127,126783470000],
  ["Falkland Islands","500","FK","FLK",-3,"Stanley","Falkland Islands Pound","FKP","americas","Mon–Fri","English",3791,12173,165000000],
  ["Faroe Islands","298","FO","FRO",0,"Tórshavn","Danish Krone","DKK","europe","Mon–Fri","Faroese",53270,1399,3555930000],
  ["Fiji","679","FJ","FJI",12,"Suva","Fijian Dollar","FJD","oceania","Mon–Fri","English/Fijian",936375,18270,4979980000],
  ["Finland","358","FI","FIN",2,"Helsinki","Euro","EUR","europe","Mon–Fri","Finnish",5545475,337030,282649840000],
  ["France","33","FR","FRA",1,"Paris","Euro","EUR","europe","Mon–Fri","French",64756584,547030,2779092240000],
  ["French Polynesia","689","PF","PYF",-10,"Papeete","CFP Franc","XPF","oceania","Mon–Fri","French",308872,4167,5814660000],
  ["Gabon","241","GA","GAB",1,"Libreville","Central African Franc","XAF","africa","Mon–Fri","French",2436566,267667,21071740000],
  ["Gambia","220","GM","GMB",0,"Banjul","Gambian Dalasi","GMD","africa","Mon–Fri","English",2773168,11300,2187190000],
  ["Georgia","995","GE","GEO",4,"Tbilisi","Georgian Lari","GEL","asia","Mon–Fri","Georgian",3728282,69700,24780790000],
  ["Germany","49","DE","DEU",1,"Berlin","Euro","EUR","europe","Mon–Fri","German",83294633,357021,4082469490000],
  ["Ghana","233","GH","GHA",0,"Accra","Ghanaian Cedi","GHS","africa","Mon–Fri","English",34121985,239460,73766050000],
  ["Gibraltar","350","GI","GIB",1,"Gibraltar","Gibraltar Pound","GIP","europe","Mon–Fri","English",32688,7,1900000000],
  ["Greece","30","GR","GRC",2,"Athens","Euro","EUR","europe","Mon–Fri","Greek",10341277,131940,217581320000],
  ["Greenland","299","GL","GRL",-3,"Nuuk","Danish Krone","DKK","americas","Mon–Fri","Greenlandic",56643,2166086,3235810000],
  ["Grenada","1-473","GD","GRD",-4,"Saint George's","East Caribbean Dollar","XCD","americas","Mon–Fri","English",126183,344,1215380000],
  ["Guam","1-671","GU","GUM",10,"Hagåtña","US Dollar","USD","oceania","Mon–Fri","English/Chamorro",172952,549,6123000000],
  ["Guatemala","502","GT","GTM",-6,"Guatemala City","Guatemalan Quetzal","GTQ","americas","Mon–Fri","Spanish",18092026,108890,95003330000],
  ["Guernsey","44-1481","GG","GGY",0,"Saint Peter Port","British Pound","GBP","europe","Mon–Fri","English",63085,78,2700000000],
  ["Guinea","224","GN","GIN",0,"Conakry","Guinean Franc","GNF","africa","Mon–Fri","French",14190612,245857,20999230000],
  ["Guinea-Bissau","245","GW","GNB",0,"Bissau","West African Franc","XOF","africa","Mon–Fri","Portuguese",2150842,36120,1633560000],
  ["Guyana","592","GY","GUY",-4,"Georgetown","Guyanese Dollar","GYD","americas","Mon–Fri","English",813834,214970,14718390000],
  ["Haiti","509","HT","HTI",-5,"Port-au-Prince","Haitian Gourde","HTG","americas","Mon–Fri","Haitian Creole/French",11724763,27750,20253550000],
  ["Honduras","504","HN","HND",-6,"Tegucigalpa","Honduran Lempira","HNL","americas","Mon–Fri","Spanish",10593798,112090,31717700000],
  ["Hong Kong","852","HK","HKG",8,"Hong Kong","Hong Kong Dollar","HKD","asia","Mon–Fri","Cantonese/English",7491609,1092,359838580000],
  ["Hungary","36","HU","HUN",1,"Budapest","Hungarian Forint","HUF","europe","Mon–Fri","Hungarian",10156239,93030,177337440000],
  ["Iceland","354","IS","ISL",0,"Reykjavik","Icelandic Króna","ISK","europe","Mon–Fri","Icelandic",375318,103000,28064530000],
  ["India","91","IN","IND",5.5,"New Delhi","Indian Rupee","INR","asia","Mon–Sat","Hindi/English",1430000000,3287590,3416645830000],
  ["Indonesia","62","ID","IDN",7,"Jakarta","Indonesian Rupiah","IDR","asia","Mon–Fri","Indonesian",278000000,1919440,1319100220000],
  ["Iran","98","IR","IRN",3.5,"Tehran","Iranian Rial","IRR","mideast","Sat–Wed","Persian",89172767,1648000,413493210000],
  ["Iraq","964","IQ","IRQ",3,"Baghdad","Iraqi Dinar","IQD","mideast","Sun–Thu","Arabic",45504560,437072,264182170000],
  ["Ireland","353","IE","IRL",0,"Dublin","Euro","EUR","europe","Mon–Fri","English/Irish",5056935,70280,533140010000],
  ["Isle of Man","44-1624","IM","IMN",0,"Douglas","British Pound","GBP","europe","Mon–Fri","English",84710,572,6684230000],
  ["Israel","972","IL","ISR",2,"Jerusalem","Israeli Shekel","ILS","mideast","Sun–Thu","Hebrew/Arabic",9174520,20770,525002450000],
  ["Italy","39","IT","ITA",1,"Rome","Euro","EUR","europe","Mon–Fri","Italian",58870762,301230,2049737170000],
  ["Ivory Coast","225","CI","CIV",0,"Yamoussoukro","West African Franc","XOF","africa","Mon–Fri","French",27914000,322460,70980000000],
  ["Jamaica","1-876","JM","JAM",-5,"Kingston","Jamaican Dollar","JMD","americas","Mon–Fri","English",2825544,10991,17097760000],
  ["Japan","81","JP","JPN",9,"Tokyo","Japanese Yen","JPY","asia","Mon–Fri","Japanese",123000000,377835,4256410760000],
  ["Jersey","44-1534","JE","JEY",0,"Saint Helier","British Pound","GBP","europe","Mon–Fri","English",null,116,5800000000],
  ["Jordan","962","JO","JOR",2,"Amman","Jordanian Dinar","JOD","mideast","Sun–Thu","Arabic",11337052,92300,48653380000],
  ["Kazakhstan","7","KZ","KAZ",6,"Nur-Sultan","Kazakhstani Tenge","KZT","asia","Mon–Fri","Kazakh/Russian",19606633,2717300,225496330000],
  ["Kenya","254","KE","KEN",3,"Nairobi","Kenyan Shilling","KES","africa","Mon–Fri","English/Swahili",55100586,582650,113420010000],
  ["Kiribati","686","KI","KIR",12,"South Tarawa","Australian Dollar","AUD","oceania","Mon–Fri","English/Gilbertese",133515,811,223350000],
  ["Kosovo","383","XK","XKX",1,"Pristina","Euro","EUR","europe","Mon–Fri","Albanian/Serbian",1775808,10887,9409470000],
  ["Kuwait","965","KW","KWT",3,"Kuwait City","Kuwaiti Dinar","KWD","mideast","Sun–Thu","Arabic",4310108,17820,175363270000],
  ["Kyrgyzstan","996","KG","KGZ",6,"Bishkek","Kyrgyzstani Som","KGS","asia","Mon–Fri","Kyrgyz/Russian",6735347,198500,11543970000],
  ["Laos","856","LA","LAO",7,"Vientiane","Lao Kip","LAK","asia","Mon–Fri","Lao",7633779,236800,15468790000],
  ["Latvia","371","LV","LVA",2,"Riga","Euro","EUR","europe","Mon–Fri","Latvian",1830211,64589,40932030000],
  ["Lebanon","961","LB","LBN",2,"Beirut","Lebanese Pound","LBP","mideast","Mon–Fri","Arabic",5353930,10400,2236500000],
  ["Liberia","231","LR","LBR",0,"Monrovia","Liberian Dollar","LRD","africa","Mon–Fri","English",5418377,111370,4001050000],
  ["Libya","218","LY","LBY",2,"Tripoli","Libyan Dinar","LYD","africa","Sun–Thu","Arabic",6888388,1759540,45752340000],
  ["Liechtenstein","423","LI","LIE",1,"Vaduz","Swiss Franc","CHF","europe","Mon–Fri","German",39584,160,7710380000],
  ["Lithuania","370","LT","LTU",2,"Vilnius","Euro","EUR","europe","Mon–Fri","Lithuanian",2718352,65200,70974490000],
  ["Luxembourg","352","LU","LUX",1,"Luxembourg City","Euro","EUR","europe","Mon–Fri","Luxembourgish/French/German",654768,2586,81641810000],
  ["Macau","853","MO","MAC",8,"Macau","Macanese Pataca","MOP","asia","Mon–Fri","Cantonese/Portuguese",704149,254,24042290000],
  ["Macedonia","389","MK","MKD",1,"Skopje","Macedonian Denar","MKD","europe","Mon–Fri","Macedonian",2071278,25333,13563130000],
  ["Madagascar","261","MG","MDG",3,"Antananarivo","Malagasy Ariary","MGA","africa","Mon–Fri","French/Malagasy",30325732,587040,15297190000],
  ["Malawi","265","MW","MWI",2,"Lilongwe","Malawian Kwacha","MWK","africa","Mon–Fri","English/Chichewa",20931751,118480,13164670000],
  ["Malaysia","60","MY","MYS",8,"Kuala Lumpur","Malaysian Ringgit","MYR","asia","Mon–Fri","Malay",34308525,329750,407027450000],
  ["Maldives","960","MV","MDV",5,"Malé","Maldivian Rufiyaa","MVR","asia","Sun–Thu","Dhivehi",521021,300,6170640000],
  ["Mali","223","ML","MLI",0,"Bamako","West African Franc","XOF","africa","Mon–Fri","French",23293698,1240000,18827180000],
  ["Malta","356","MT","MLT",1,"Valletta","Euro","EUR","europe","Mon–Fri","Maltese/English",535064,316,18125560000],
  ["Marshall Islands","692","MH","MHL",12,"Majuro","US Dollar","USD","oceania","Mon–Fri","Marshallese/English",41996,181,258770000],
  ["Mauritania","222","MR","MRT",0,"Nouakchott","Mauritanian Ouguiya","MRO","africa","Sun–Thu","Arabic",4862989,1030700,9780860000],
  ["Mauritius","230","MU","MUS",4,"Port Louis","Mauritian Rupee","MUR","africa","Mon–Fri","English/French",1300557,2040,12948730000],
  ["Mayotte","262","YT","MYT",3,"Mamoudzou","Euro","EUR","africa","Mon–Fri","French",335995,374,1200000000],
  ["Mexico","52","MX","MEX",-6,"Mexico City","Mexican Peso","MXN","americas","Mon–Fri","Spanish",128000000,1972550,1465854090000],
  ["Micronesia","691","FM","FSM",10,"Palikir","US Dollar","USD","oceania","Mon–Fri","English",544000,702,424000000],
  ["Moldova","373","MD","MDA",2,"Chișinău","Moldovan Leu","MDL","europe","Mon–Fri","Romanian",3435931,33843,14508330000],
  ["Monaco","377","MC","MCO",1,"Monaco","Euro","EUR","europe","Mon–Fri","French",36297,2,8784000000],
  ["Mongolia","976","MN","MNG",8,"Ulaanbaatar","Mongolian Tögrög","MNT","asia","Mon–Fri","Mongolian",3447157,1565000,17146470000],
  ["Montenegro","382","ME","MNE",1,"Podgorica","Euro","EUR","europe","Mon–Fri","Montenegrin",626485,14026,6229800000],
  ["Montserrat","1-664","MS","MSR",-4,"Plymouth","East Caribbean Dollar","XCD","americas","Mon–Fri","English",4386,102,129900000],
  ["Morocco","212","MA","MAR",1,"Rabat","Moroccan Dirham","MAD","africa","Mon–Fri","Arabic/French",37840044,446550,130912560000],
  ["Mozambique","258","MZ","MOZ",2,"Maputo","Mozambican Metical","MZN","africa","Mon–Fri","Portuguese",33897354,801590,18406840000],
  ["Myanmar","95","MM","MMR",6.5,"Naypyidaw","Myanmar Kyat","MMK","asia","Mon–Fri","Burmese",54577997,678500,62263470000],
  ["Namibia","264","NA","NAM",2,"Windhoek","Namibian Dollar","NAD","africa","Mon–Fri","English",2604172,825418,12914930000],
  ["Nauru","674","NR","NRU",12,"Yaren","Australian Dollar","AUD","oceania","Mon–Fri","Nauruan/English",12780,21,151650000],
  ["Nepal","977","NP","NPL",5.75,"Kathmandu","Nepalese Rupee","NPR","asia","Sun–Fri","Nepali",30896590,140800,40828250000],
  ["Netherlands","31","NL","NLD",1,"Amsterdam","Euro","EUR","europe","Mon–Fri","Dutch",17618299,41526,1009398720000],
  ["Netherlands Antilles","599","AN","ANT",-4,"Willemstad","Netherlands Antillean Guilder","ANG","americas","Mon–Fri","Dutch/Papiamento",null,960,21183],
  ["New Caledonia","687","NC","NCL",11,"Nouméa","CFP Franc","XPF","oceania","Mon–Fri","French",292991,19060,9623320000],
  ["New Zealand","64","NZ","NZL",12,"Wellington","New Zealand Dollar","NZD","oceania","Mon–Fri","English/Maori",5228100,268680,248101710000],
  ["Nicaragua","505","NI","NIC",-6,"Managua","Nicaraguan Córdoba","NIO","americas","Mon–Fri","Spanish",7050000,129494,15671580000],
  ["Niger","227","NE","NER",1,"Niamey","West African Franc","XOF","africa","Mon–Fri","French",27200000,1267000,15342280000],
  ["Nigeria","234","NG","NGA",1,"Abuja","Nigerian Naira","NGN","africa","Mon–Fri","English",224000000,923768,472624600000],
  ["Niue","683","NU","NIU",-11,"Alofi","New Zealand Dollar","NZD","oceania","Mon–Fri","Niuean/English",1940,260,10800000],
  ["North Korea","850","KP","PRK",9,"Pyongyang","North Korean Won","KPW","asia","Mon–Sat","Korean",26160821,120540,28500000000],
  ["Northern Mariana Islands","1-670","MP","MNP",10,"Saipan","US Dollar","USD","oceania","Mon–Fri","English/Chamorro",null,477,858000000],
  ["Norway","47","NO","NOR",1,"Oslo","Norwegian Krone","NOK","europe","Mon–Fri","Norwegian",5474360,324220,593348980000],
  ["Oman","968","OM","OMN",4,"Muscat","Omani Rial","OMR","mideast","Sun–Thu","Arabic",4644384,212460,114667360000],
  ["Pakistan","92","PK","PAK",5,"Islamabad","Pakistani Rupee","PKR","asia","Mon–Fri","Urdu/English",240000000,803940,374697370000],
  ["Palau","680","PW","PLW",9,"Ngerulmud","US Dollar","USD","oceania","Mon–Fri","Palauan/English",18058,458,232900000],
  ["Palestine","970","PS","PSE",2,"Ramallah","Israeli Shekel","ILS","mideast","Sun–Thu","Arabic",5371230,5970,14460000000],
  ["Panama","507","PA","PAN",-5,"Panama City","Panamanian Balboa","PAB","americas","Mon–Fri","Spanish",4468087,78200,76522510000],
  ["Papua New Guinea","675","PG","PNG",10,"Port Moresby","Papua New Guinean Kina","PGK","oceania","Mon–Fri","English/Tok Pisin",10329931,462840,31603620000],
  ["Paraguay","595","PY","PRY",-4,"Asunción","Paraguayan Guaraní","PYG","americas","Mon–Fri","Spanish/Guaraní",6861524,406750,41722300000],
  ["Peru","51","PE","PER",-5,"Lima","Peruvian Sol","PEN","americas","Mon–Fri","Spanish",34400000,1285220,242631570000],
  ["Philippines","63","PH","PHL",8,"Manila","Philippine Peso","PHP","asia","Mon–Fri","Filipino/English",117000000,300000,404284330000],
  ["Pitcairn","64","PN","PCN",-8,"Adamstown","New Zealand Dollar","NZD","oceania","Mon–Fri","English",44,47,5000000],
  ["Poland","48","PL","POL",1,"Warsaw","Polish Złoty","PLN","europe","Mon–Fri","Polish",41026067,312685,688125010000],
  ["Portugal","351","PT","PRT",0,"Lisbon","Euro","EUR","europe","Mon–Fri","Portuguese",10247605,92391,255196660000],
  ["Puerto Rico","1-787","PR","PRI",-4,"San Juan","US Dollar","USD","americas","Mon–Fri","Spanish/English",3260314,9104,113434800000],
  ["Qatar","974","QA","QAT",3,"Doha","Qatari Riyal","QAR","mideast","Sun–Thu","Arabic",2716391,11437,236258300000],
  ["Republic of the Congo","242","CG","COG",1,"Brazzaville","Central African Franc","XAF","africa","Mon–Fri","French",5762717,342000,9520000000],
  ["Reunion","262","RE","REU",4,"Saint-Denis","Euro","EUR","africa","Mon–Fri","French",981796,2517,3500000000],
  ["Romania","40","RO","ROU",2,"Bucharest","Romanian Leu","RON","europe","Mon–Fri","Romanian",19892812,237500,300691350000],
  ["Russia","7","RU","RUS",3,"Moscow","Russian Ruble","RUB","europe","Mon–Fri","Russian",144000000,17100000,2240422430000],
  ["Rwanda","250","RW","RWA",2,"Kigali","Rwandan Franc","RWF","africa","Mon–Fri","Kinyarwanda/French/English",14094683,26338,13311490000],
  ["Saint Barthelemy","590","BL","BLM",-4,"Gustavia","Euro","EUR","americas","Mon–Fri","French",10994,21,300000000],
  ["Saint Helena","290","SH","SHN",0,"Jamestown","Saint Helena Pound","SHP","africa","Mon–Fri","English",5314,410,31100000],
  ["Saint Kitts and Nevis","1-869","KN","KNA",-4,"Basseterre","East Caribbean Dollar","XCD","americas","Mon–Fri","English",47755,261,965640000],
  ["Saint Lucia","1-758","LC","LCA",-4,"Castries","East Caribbean Dollar","XCD","americas","Mon–Fri","English",180251,616,2343700000],
  ["Saint Martin","590","MF","MAF",-4,"Marigot","Euro","EUR","americas","Mon–Fri","French",32077,53,649210000],
  ["Saint Pierre and Miquelon","508","PM","SPM",-3,"Saint-Pierre","Euro","EUR","americas","Mon–Fri","French",5840,242,215400000],
  ["Saint Vincent and the Grenadines","1-784","VC","VCT",-4,"Kingstown","East Caribbean Dollar","XCD","americas","Mon–Fri","English",111475,389,948560000],
  ["Samoa","685","WS","WSM",13,"Apia","Samoan Tālā","WST","oceania","Mon–Fri","Samoan/English",225681,2944,832950000],
  ["San Marino","378","SM","SMR",1,"San Marino City","Euro","EUR","europe","Mon–Fri","Italian",33642,61,1855380000],
  ["Sao Tome and Principe","239","ST","STP",0,"São Tomé","São Tomé and Príncipe Dobra","STN","africa","Mon–Fri","Portuguese",231856,1001,542690000],
  ["Saudi Arabia","966","SA","SAU",3,"Riyadh","Saudi Riyal","SAR","mideast","Sun–Thu","Arabic",36947025,1960582,1108571520000],
  ["Senegal","221","SN","SEN",0,"Dakar","West African Franc","XOF","africa","Mon–Fri","French",17763163,196190,27684260000],
  ["Serbia","381","RS","SRB",1,"Belgrade","Serbian Dinar","RSD","europe","Mon–Fri","Serbian",7149077,88361,63563400000],
  ["Seychelles","248","SC","SYC",4,"Victoria","Seychellois Rupee","SCR","africa","Mon–Fri","Creole/English/French",107660,455,1588440000],
  ["Sierra Leone","232","SL","SLE",0,"Freetown","Sierra Leonean Leone","SLL","africa","Mon–Fri","English",8791092,71740,4094560000],
  ["Singapore","65","SG","SGP",8,"Singapore","Singapore Dollar","SGD","asia","Mon–Fri","English/Malay/Mandarin/Tamil",6014723,693,466788430000],
  ["Sint Maarten","1-721","SX","SXM",-4,"Philipsburg","Netherlands Antillean Guilder","ANG","americas","Mon–Fri","Dutch/English",44222,34,1537090000],
  ["Slovakia","421","SK","SVK",1,"Bratislava","Euro","EUR","europe","Mon–Fri","Slovak",5795199,48845,115461710000],
  ["Solomon Islands","677","SB","SLB",11,"Honiara","Solomon Islands Dollar","SBD","oceania","Mon–Fri","English",740424,28450,1597200000],
  ["Somalia","252","SO","SOM",3,"Mogadishu","Somali Shilling","SOS","africa","Sun–Thu","Somali/Arabic",18143378,637657,10419540000],
  ["South Africa","27","ZA","ZAF",2,"Pretoria","South African Rand","ZAR","africa","Mon–Fri","English",60414495,1219912,405270850000],
  ["South Korea","82","KR","KOR",9,"Seoul","South Korean Won","KRW","asia","Mon–Fri","Korean",51784059,98480,1800000000000],
  ["South Sudan","211","SS","SSD",3,"Juba","South Sudanese Pound","SSP","africa","Mon–Fri","English",11088796,644329,11997800000],
  ["Spain","34","ES","ESP",1,"Madrid","Euro","EUR","europe","Mon–Fri","Spanish",47519628,504782,1417800470000],
  ["Sri Lanka","94","LK","LKA",5.5,"Colombo","Sri Lankan Rupee","LKR","asia","Mon–Fri","Sinhala/Tamil",21893579,65610,74403580000],
  ["Sudan","249","SD","SDN",3,"Khartoum","Sudanese Pound","SDG","africa","Sun–Thu","Arabic",48109006,1861484,51662240000],
  ["Suriname","597","SR","SUR",-3,"Paramaribo","Surinamese Dollar","SRD","americas","Mon–Fri","Dutch",623236,163270,3220000000],
  ["Svalbard and Jan Mayen","47","SJ","SJM",1,"Longyearbyen","Norwegian Krone","NOK","europe","Mon–Fri","Norwegian",2667,62049,null],
  ["Swaziland","268","SZ","SWZ",2,"Mbabane","Swazi Lilangeni","SZL","africa","Mon–Fri","Swati/English",1148056,17363,3620990000],
  ["Sweden","46","SE","SWE",1,"Stockholm","Swedish Krona","SEK","europe","Mon–Fri","Swedish",10612086,449964,591718140000],
  ["Switzerland","41","CH","CHE",1,"Bern","Swiss Franc","CHF","europe","Mon–Fri","German/French/Italian",8796669,41290,818426550000],
  ["Syria","963","SY","SYR",2,"Damascus","Syrian Pound","SYP","mideast","Sun–Thu","Arabic",23227014,185180,8969510000],
  ["Taiwan","886","TW","TWN",8,"Taipei","New Taiwan Dollar","TWD","asia","Mon–Fri","Mandarin",23923276,35980,741800000000],
  ["Tajikistan","992","TJ","TJK",5,"Dushanbe","Tajikistani Somoni","TJS","asia","Mon–Fri","Tajik",10143543,143100,10492120000],
  ["Tanzania","255","TZ","TZA",3,"Dodoma","Tanzanian Shilling","TZS","africa","Mon–Fri","Swahili/English",67438106,945087,75732310000],
  ["Thailand","66","TH","THA",7,"Bangkok","Thai Baht","THB","asia","Mon–Fri","Thai",71801279,514000,495423340000],
  ["Togo","228","TG","TGO",0,"Lomé","West African Franc","XOF","africa","Mon–Fri","French",9053799,56785,8341230000],
  ["Tokelau","690","TK","TKL",13,"Fakaofo","New Zealand Dollar","NZD","oceania","Mon–Fri","English/Tokelauan",1893,10,10000000],
  ["Tonga","676","TO","TON",13,"Nuku'alofa","Tongan Paʻanga","TOP","oceania","Mon–Fri","English/Tongan",107773,748,469230000],
  ["Trinidad and Tobago","1-868","TT","TTO",-4,"Port of Spain","Trinidad and Tobago Dollar","TTD","americas","Mon–Fri","English",1534937,5128,30053580000],
  ["Tunisia","216","TN","TUN",1,"Tunis","Tunisian Dinar","TND","africa","Mon–Fri","Arabic/French",12458223,163610,46303550000],
  ["Turkey","90","TR","TUR",3,"Ankara","Turkish Lira","TRY","europe","Mon–Fri","Turkish",85816199,780580,907118440000],
  ["Turkmenistan","993","TM","TKM",5,"Ashgabat","Turkmenistani Manat","TMT","asia","Mon–Fri","Turkmen",6516100,488100,56542860000],
  ["Turks and Caicos Islands","1-649","TC","TCA",-5,"Cockburn Town","US Dollar","USD","americas","Mon–Fri","English",46062,430,1138810000],
  ["Tuvalu","688","TV","TUV",12,"Funafuti","Australian Dollar","AUD","oceania","Mon–Fri","English/Tuvaluan",11396,26,59070000],
  ["U.S. Virgin Islands","1-340","VI","VIR",-4,"Charlotte Amalie","US Dollar","USD","americas","Mon–Fri","English",98750,352,3830000000],
  ["Uganda","256","UG","UGA",3,"Kampala","Ugandan Shilling","UGX","africa","Mon–Fri","English/Swahili",48582334,236040,45567300000],
  ["Ukraine","380","UA","UKR",2,"Kyiv","Ukrainian Hryvnia","UAH","europe","Mon–Fri","Ukrainian",36744634,603700,160502740000],
  ["United Arab Emirates","971","AE","ARE",4,"Abu Dhabi","UAE Dirham","AED","mideast","Mon–Fri","Arabic",9516871,82880,507063970000],
  ["United Kingdom","44","GB","GBR",0,"London","British Pound","GBP","europe","Mon–Fri","English",67736802,244820,3089072720000],
  ["United States","1","US","USA",-5,"Washington D.C.","US Dollar","USD","americas","Mon–Fri","English",340000000,9629091,25439700000000],
  ["Uruguay","598","UY","URY",-3,"Montevideo","Uruguayan Peso","UYU","americas","Mon–Fri","Spanish",3423108,176220,71177150000],
  ["Uzbekistan","998","UZ","UZB",5,"Tashkent","Uzbekistani Som","UZS","asia","Mon–Fri","Uzbek",35163944,447400,80391850000],
  ["Vatican","379","VA","VAT",1,"Vatican City","Euro","EUR","europe","Mon–Fri","Italian/Latin",805,null,300000000],
  ["Venezuela","58","VE","VEN",-4,"Caracas","Venezuelan Bolívar","VES","americas","Mon–Fri","Spanish",28838499,912050,482359320000],
  ["Vietnam","84","VN","VNM",7,"Hanoi","Vietnamese Đồng","VND","asia","Mon–Fri","Vietnamese",98858950,329560,408802380000],
  ["Wallis and Futuna","681","WF","WLF",12,"Mata-Utu","CFP Franc","XPF","oceania","Mon–Fri","French",11502,274,200000000],
  ["Western Sahara","212","EH","ESH",1,"El Aaiún","Moroccan Dirham","MAD","africa","Mon–Fri","Arabic",587259,266000,1000000000],
  ["Yemen","967","YE","YEM",3,"Sana'a","Yemeni Rial","YER","mideast","Sun–Thu","Arabic",34449825,527970,21606160000],
  ["Zambia","260","ZM","ZMB",2,"Lusaka","Zambian Kwacha","ZMW","africa","Mon–Fri","English",20569737,752614,29163780000],
  ["Zimbabwe","263","ZW","ZWE",2,"Harare","Zimbabwean Dollar","ZWL","africa","Mon–Fri","English",16665409,390580,27366630000],
]

export const COUNTRIES: CountryData[] = RAW.map(
  ([name, dialCode, isoCode2, isoCode3, utcOffset, capital, currency, currencyCode, region, workingDays, language, population, areaKm2, gdpUsd]) => ({
    name,
    slug: nameToSlug(name),
    dialCode,
    isoCode2,
    isoCode3,
    utcOffset,
    capital,
    currency,
    currencyCode,
    region,
    workingDays,
    language,
    population,
    areaKm2,
    gdpUsd,
  })
)

export function getAllCountrySlugs(): string[] {
  return COUNTRIES.map((c) => c.slug)
}

export function getCountryBySlug(slug: string): CountryData | undefined {
  return COUNTRIES.find((c) => c.slug === slug)
}

export function getRelatedCountries(slug: string, limit = 12): CountryData[] {
  const country = getCountryBySlug(slug)
  if (!country) return []
  return COUNTRIES.filter((c) => c.slug !== slug && c.region === country.region).slice(0, limit)
}

export function formatPopulation(pop: number | null): string {
  if (!pop) return "N/A"
  if (pop >= 1_000_000_000) return `${(pop / 1_000_000_000).toFixed(1)}B`
  if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`
  if (pop >= 1_000) return `${(pop / 1_000).toFixed(0)}K`
  return pop.toString()
}

export function formatGDP(gdp: number | null): string {
  if (!gdp) return "N/A"
  if (gdp >= 1_000_000_000_000) return `$${(gdp / 1_000_000_000_000).toFixed(1)}T`
  if (gdp >= 1_000_000_000) return `$${(gdp / 1_000_000_000).toFixed(0)}B`
  return `$${(gdp / 1_000_000).toFixed(0)}M`
}

// ─── Length-aware meta builders ────────────────────────────────────────────
// Country names and capitals vary from 4 chars ("Chad", "Iowa"-scale) to 30+
// ("Saint Vincent and the Grenadines"), so a single fixed template can't hit
// 50-60 (title) / 150-160 (description) for every country. These pick the
// longest candidate/clause combination that still fits, verified against all
// 237 real entries in COUNTRIES (see audit report #3, finding 4).

/** Greedily appends small independent clauses to `core` until length is in [min, max]. */
function fillToRange(core: string, clauses: string[], min: number, max: number): string {
  let text = core
  if (text.length > max) return text.slice(0, max)
  const remaining = [...clauses].sort((a, b) => b.length - a.length)
  while (text.length < min && remaining.length) {
    let used = -1
    for (let i = 0; i < remaining.length; i++) {
      const next = text + remaining[i]
      if (next.length <= max) {
        text = next
        used = i
        break
      }
    }
    if (used === -1) break
    remaining.splice(used, 1)
  }
  return text
}

export function buildCountryPageMeta(name: string, dial: string, capital: string): { title: string; description: string } {
  const titleCandidates = [
    `${name} Country Code ${dial}: Virtual Phone Numbers | Rozper`,
    `${name} Country Code ${dial} · Virtual Numbers | Rozper`,
    `${name} Country Code ${dial} | Rozper Virtual Numbers`,
    `${name} Country Code ${dial} | Rozper`,
    `${name} Country Code ${dial} · Virtual Numbers`,
    `Get a ${name} Virtual Number | Rozper`,
    `${name} Virtual Number | Rozper`,
    `${name} Virtual Number`,
  ]
  const title =
    titleCandidates.find((c) => c.length >= 50 && c.length <= 60) ?? titleCandidates[titleCandidates.length - 1]!

  const core = `${name} country code is ${dial}, with ${capital} as the capital.`
  const clauses = [
    " Get a virtual number and connect from anywhere.",
    " Check the best calling times before you dial.",
    " No physical office is required to get started.",
    " Rozper backs every line with 99.999% uptime.",
    " Activate in minutes and start calling today.",
    " Talk to Rozper.",
    " Learn more today.",
    " See how it works.",
    " Start your call.",
    " Try it now.",
    " Sign up free.",
    " Get started.",
    " It's easy.",
    " No fees.",
    " Fast setup.",
  ]
  const description = fillToRange(core, clauses, 150, 160)

  return { title, description }
}

export function buildBestTimeToCallMeta(name: string, dial: string, capital: string): { title: string; description: string } {
  const titleCandidates = [
    `Best Time to Call ${name} from the US | ${dial} Dial Code`,
    `Call ${name} from the US: ${dial} Dial Code | Rozper`,
    `Call ${name} from the US: ${dial} Dial Code`,
    `${name} Calling Times & Tips | Rozper`,
    `${name} Calling Times | Rozper`,
  ]
  const title =
    titleCandidates.find((c) => c.length >= 50 && c.length <= 60) ?? titleCandidates[titleCandidates.length - 1]!

  const core = `Best time to call ${name} (country code ${dial}) from the US, covering ${capital}'s business hours.`
  const clauses = [
    " Includes the timezone gap and calling etiquette.",
    " Plan ahead for a live answer, not voicemail.",
    " Rozper routes calls with 99.999% uptime.",
    " Works from any device, anywhere in the world.",
    " Learn the best time to dial.",
    " Plan your call today.",
    " Check before you dial.",
    " See the full guide.",
    " Read on for details.",
    " Full guide below.",
    " Dial smart.",
    " Get the timing right.",
    " Plan ahead.",
    " Do it right.",
    " Know before you call.",
    " Call now.",
    " Dial in.",
  ]
  const description = fillToRange(core, clauses, 150, 160)

  return { title, description }
}
