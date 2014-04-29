		// List of countries
		var countryList = new Array();
		// How many dollars equals one destination money
		var valueList = new Array();
		// How many destination moneys equals one dollar
		var finalList = new Array();
		
		// Catalog of the country, the value of this country's currency against the dollar, and the inverse
		countryList[0] = "abkhazia"; valueList[0] = .0324; finalList[0] = 30.822;
		countryList[1] = "afghanistan"; valueList[1] = .02; finalList[1] = 45;
		countryList[2] = "akrotiri and dhekelia"; valueList[2] = 1.4031; finalList[2] = .7127;
		countryList[3] = "alderney"; valueList[3] = 1.611; finalList[3] = .6207;
		countryList[4] = "algeria"; valueList[4] = .0136; finalList[4] = 73.43;
		countryList[5] = "andorra"; valueList[5] = 1.4031; finalList[5] = .7127;
		countryList[6] = "angola"; valueList[6] = .01; finalList[6] = 92.2;
		countryList[7] = "anguilla"; valueList[7] = .37; finalList[7] = 2.7;
		countryList[8] = "antigua and barbuda"; valueList[8] = .37; finalList[8] = 2.7;
		countryList[9] = "argentina"; valueList[9] = .2527; finalList[9] = 3.9565;
		countryList[10] = "armenia"; valueList[10] = .002785; finalList[10] = 359.11;
		countryList[11] = "aruba"; valueList[11] = .56; finalList[11] = 1.79;
		countryList[12] = "ascension island"; valueList[12] = .62; finalList[12] = 1.61;
		countryList[13] = "australia"; valueList[13] = 1.0002; finalList[13] = .9998;
		countryList[14] = "austria"; valueList[14] = 1.4031; finalList[14] = .7127;
		countryList[15] = "azerbaijan"; valueList[15] = 1.25; finalList[15] = .8;
		countryList[16] = "the bahamas"; valueList[16] = 1; finalList[16] = 1;
		countryList[17] = "bahrain"; valueList[17] = 2.65252; finalList[17] = .377;
		countryList[18] = "bangladesh"; valueList[18] = .01418; finalList[18] = 70.52;
		countryList[19] = "barbados"; valueList[19] = .5; finalList[19] = 2;
		countryList[20] = "belarus"; valueList[20] = .000332; finalList[20] = 3012;
		countryList[21] = "belgium"; valueList[21] = 1.4031; finalList[21] = .7127;
		countryList[22] = "belize"; valueList[22] = .518783; finalList[22] = 1.92759;
		countryList[23] = "benin"; valueList[23] = .002151; finalList[23] = 464.92;
		countryList[24] = "bermuda"; valueList[24] = 1; finalList[24] = 1;
		countryList[25] = "bhutan"; valueList[25] = .022566; finalList[25] = 44.315;
		countryList[26] = "bolivia"; valueList[26] = .143472; finalList[26] = 6.97;
		countryList[27] = "bonaire"; valueList[27] = .558847; finalList[27] = 1.7894;
		countryList[28] = "bosnia and herzegovina"; valueList[28] = .716389; finalList[28] = 1.39589;
		countryList[29] = "botswana"; valueList[29] = .1519; finalList[29] = 6.58328;
		countryList[30] = "brazil"; valueList[30] = .58713; finalList[30] = 1.7032;
		countryList[31] = "british indian ocean territory"; valueList[31] = 1; finalList[31] = 1;
		countryList[32] = "british virgin islands"; valueList[32] = 1; finalList[32] = 1;
		countryList[33] = "brunei"; valueList[33] = .776181; finalList[33] = 1.28836;
		countryList[34] = "bulgaria"; valueList[34] = .716399; finalList[34] = 1.39587;
		countryList[35] = "burkina faso"; valueList[35] = .002151; finalList[35] = 464.92;
		countryList[36] = "burundi"; valueList[36] = .0008076; finalList[36] = 1238.25;
		countryList[37] = "cambodia"; valueList[37] = .0002388; finalList[37] = 4187.85;
		countryList[38] = "cameroon"; valueList[38] = .002138; finalList[38] = 467.82;
		countryList[39] = "canada"; valueList[39] = .99975; finalList[39] = 1.0003;
		countryList[40] = "cape verde"; valueList[40] = .01279; finalList[40] = 78.1942;
		countryList[41] = "cayman islands"; valueList[41] = 1.2263; finalList[41] = .81546;
		countryList[42] = "central african republic"; valueList[42] = .002138; finalList[42] = 467.82;
		countryList[43] = "chad"; valueList[43] = .002138; finalList[43] = 467.82;
		countryList[44] = "chile"; valueList[44] = .002064; finalList[44] = 484.58;
		countryList[45] = "china"; valueList[45] = .14996; finalList[45] = 6.6685;
		countryList[46] = "cocos islands"; valueList[46] = .98449; finalList[46] = 1.0157;
		countryList[47] = "colombia"; valueList[47] = .0005466; finalList[47] = 1829.40;
		countryList[48] = "comoros"; valueList[48] = .00281; finalList[48] = 369.7149;
		countryList[49] = "democratic republic of the congo"; valueList[49] = .001117; finalList[49] = 895.26;
		countryList[50] = "republic of the congo"; valueList[50] = .002138; finalList[50] = 467.82;
		countryList[51] = "cook islands"; valueList[51] = .79551; finalList[51] = 1.2571;
		countryList[52] = "costa rica"; valueList[52] = .001920; finalList[52] = 520.92;
		countryList[53] = "cote d'ivoire"; valueList[53] = .002138; finalList[53] = 467.82;
		countryList[54] = "croatia"; valueList[54] = .19079; finalList[54] = 5.2412;
		countryList[55] = "cuba"; valueList[55] = .99649; finalList[55] = 1.0035;
		countryList[56] = "curacao"; valueList[56] = 1.8348; finalList[56] = .54503;
		countryList[57] = "cyprus"; valueList[57] = 1.4031; finalList[57] = .7127;
		countryList[58] = "czech republic"; valueList[58] = .05711; finalList[58] = 17.5112;
		countryList[59] = "denmark"; valueList[59] = .18804; finalList[59] = 5.3179;
		countryList[60] = "djibouti"; valueList[60] = .005653; finalList[60] = 176.88;
		countryList[61] = "dominica"; valueList[61] = .37037; finalList[61] = 2.7;
		countryList[62] = "dominican republic"; valueList[62] = .02681; finalList[62] = 37.3034;
		countryList[63] = "east timor"; valueList[63] = 1; finalList[63] = 1;
		countryList[64] = "ecuador"; valueList[64] = 1; finalList[64] = 1;
		countryList[65] = "egypt"; valueList[65] = .17462; finalList[65] = 5.7267;
		countryList[66] = "el salvador"; valueList[66] = 1; finalList[66] = 1;
		countryList[67] = "equatorial guinea"; valueList[67] = .002139; finalList[67] = 467.57;
		countryList[68] = "eritrea"; valueList[68] = .066667; finalList[68] = 15;
		countryList[69] = "estonia"; valueList[69] = .08966; finalList[69] = 11.153;
		countryList[70] = "ethiopia"; valueList[70] = .06017; finalList[70] = 16.6194;
		countryList[71] = "falkland islands"; valueList[71] = .62361; finalList[71] = 1.603566;
		countryList[72] = "faroe islands"; valueList[72] = .18804; finalList[72] = 5.3179;
		countryList[73] = "fiji"; valueList[73] = .54983; finalList[73] = 1.8187;
		countryList[74] = "finland"; valueList[74] = 1.4031; finalList[74] = .7127; 
		countryList[75] = "france"; valueList[75] = 1.4031; finalList[75] = .7127;
		countryList[76] = "french polynesia"; valueList[76] = .01176; finalList[76] = 85.0096;
		countryList[77] = "gabon"; valueList[77] = .002139; finalList[77] = 467.57;
		countryList[78] = "the gambia"; valueList[78] = .03487; finalList[78] = 28.6756;
		countryList[79] = "georgia"; valueList[79] = .564812; finalList[79] = 1.7705;
		countryList[80] = "germany"; valueList[80] = 1.4031; finalList[80] = .7127;
		countryList[81] = "ghana"; valueList[81] = .69163; finalList[81] = 1.4459;
		countryList[82] = "gibraltar"; valueList[82] = .62361; finalList[82] = 1.603566;
		countryList[83] = "greece"; valueList[83] = 1.4031; finalList[83] = .7127;
		countryList[84] = "grenada"; valueList[84] = .37037; finalList[84] = 2.7;
		countryList[85] = "guatemala"; valueList[85] = .12426; finalList[85] = 8.0473;
		countryList[86] = "guernsey"; valueList[86] = 1.6189; finalList[86] = .61771;
		countryList[87] = "guinea"; valueList[87] = .000146; finalList[87] = 6850;
		countryList[88] = "guinea-bissau"; valueList[88] = .002139; finalList[88] = 467.57;
		countryList[89] = "guyana"; valueList[89] = .004933; finalList[89] = 202.7;
		countryList[90] = "haiti"; valueList[90] = .025; finalList[90] = 39.995;
		countryList[91] = "honduras"; valueList[91] = .0526; finalList[91] = 19.0113;
		countryList[92] = "hong kong"; valueList[92] = .12902; finalList[92] = 7.7507;
		countryList[93] = "hungary"; valueList[93] = .005121; finalList[93] = 195.27;
		countryList[94] = "iceland"; valueList[94] = .009182; finalList[94] = 108.91;
		countryList[95] = "india"; valueList[95] = .02274; finalList[95] = 43.975;
		countryList[96] = "indonesia"; valueList[96] = .0001123; finalList[96] = 8905;
		countryList[97] = "iran"; valueList[97] = .0000955646; finalList[97] = 10464.12;
		countryList[98] = "iraq"; valueList[98] = .0008509; finalList[98] = 1175.2;
		countryList[99] = "ireland"; valueList[99] = 1.4031; finalList[99] = .7127;
		countryList[100] = "isle of man"; valueList[100] = 1.6189; finalList[100] = .61771;
		countryList[101] = "israel"; valueList[101] = .27848; finalList[101] = 3.591;
		countryList[102] = "italy"; valueList[102] = 1.4031; finalList[102] = .7127;
		countryList[103] = "jamaica"; valueList[103] = .01172; finalList[103] = 85.3121;
		countryList[104] = "japan"; valueList[104] = .01232; finalList[104] = 81.1963;
		countryList[105] = "jersey"; valueList[105] = 1.6192; finalList[105] = .6176;
		countryList[106] = "jordan"; valueList[106] = 1.4149; finalList[106] = .70678;
		countryList[107] = "kazakhstan"; valueList[107] = .006751; finalList[107] = 148.12;
		countryList[108] = "kenya"; valueList[108] = .0125; finalList[108] = 80.0043;
		countryList[109] = "kiribati"; valueList[109] = 1.0163; finalList[109] = .98394;
		countryList[110] = "north korea"; valueList[110] = .006989; finalList[110] = 143.079;
		countryList[111] = "south korea"; valueList[111] = 0.0009; finalList[111] = 1111.69;
		countryList[112] = "kosovo"; valueList[112] = 1.4031; finalList[112] = .7127; //euro
		countryList[113] = "kuwait"; valueList[113] = 3.5782; finalList[113] = .27947;
		countryList[114] = "kyrgyzstan"; valueList[114] = 46.775; finalList[114] = 46.775;
		countryList[115] = "laos"; valueList[115] = .0001242; finalList[115] = 8050.11;
		countryList[116] = "latvia"; valueList[116] = 1.9839; finalList[116] = .50405;
		countryList[117] = "lebanon"; valueList[117] = .0006647; finalList[117] = 1504.48;
		countryList[118] = "lesotho"; valueList[118] = .14582; finalList[118] = 6.858;
		countryList[119] = "liberia"; valueList[119] = .014025; finalList[119] = 71.3;
		countryList[120] = "libya"; valueList[120] = .83868; finalList[120] = 1.1923;
		countryList[121] = "liechtenstein"; valueList[121] = 1.0396; finalList[121] = .96193;
		countryList[122] = "lithuania"; valueList[122] = .40723; finalList[122] = 2.4556;
		countryList[123] = "luxembourg"; valueList[123] = 1.4031; finalList[123] = .7127;
		countryList[124] = "macau"; valueList[124] = .12465; finalList[124] = 8.0223;
		countryList[125] = "republic of macedonia"; valueList[125] = .02291; finalList[125] = 43.65;
		countryList[126] = "madagascar"; valueList[126] = .000505; finalList[126] = 1980;
		countryList[127] = "malawi"; valueList[127] = .006649; finalList[127] = 150.4;
		countryList[128] = "malaysia"; valueList[128] = .323939; finalList[128] = 3.087;
		countryList[129] = "maldives"; valueList[129] = .078125; finalList[129] = 12.8;
		countryList[130] = "mali"; valueList[130] = .002136; finalList[130] = 468.168;
		countryList[131] = "malta"; valueList[131] = 1.4031; finalList[131] = .7127;
		countryList[132] = "marshall islands"; valueList[132] = 1; finalList[132] = 1;
		countryList[133] = "mauritania"; valueList[133] = .003534; finalList[133] = 283;
		countryList[134] = "mauritius"; valueList[134] = .033788; finalList[134] = 29.596;
		countryList[135] = "mexico"; valueList[135] = .081355; finalList[135] = 12.2918;
		countryList[136] = "federated states of micronesia"; valueList[136] = 1; finalList[136] = 1;
		countryList[137] = "moldova"; valueList[137] = .08558; finalList[137] = 11.685;
		countryList[138] = "monaco"; valueList[138] = 1.4031; finalList[138] = .7127;
		countryList[139] = "mongolia"; valueList[139] = .000781; finalList[139] = 1280;
		countryList[140] = "montenegro"; valueList[140] = 1.4031; finalList[140] = .7127;
		countryList[141] = "montserrat"; valueList[141] = .37037; finalList[141] = 2.7;
		countryList[142] = "morocco"; valueList[142] = .124418; finalList[142] = 8.0374;
		countryList[143] = "mozambique"; valueList[143] = .027778; finalList[143] = 36;
		countryList[144] = "myanmar"; valueList[144] = .156006; finalList[144] = 6.41;
		countryList[145] = "nagorno-karabakh"; valueList[145] = .002771; finalList[145] = 360.84;
		countryList[146] = "namibia"; valueList[146] = .144976; finalList[146] = 6.89768;
		countryList[147] = "nauru"; valueList[147] = 1.0156; finalList[147] = .98459;
		countryList[148] = "nepal"; valueList[148] = .01424; finalList[148] = 70.2038;
		countryList[149] = "netherlands"; valueList[149] = 1.4031; finalList[149] = .7127;
		countryList[150] = "new caledonia"; valueList[150] = .01179; finalList[150] = 84.8192;
		countryList[151] = "new zealand"; valueList[151] = .771414; finalList[151] = 1.29632;
		countryList[152] = "nicaragua"; valueList[152] = .046072; finalList[152] = 21.705;
		countryList[153] = "niger"; valueList[153] = .002144; finalList[153] = 466.52;
		countryList[154] = "nigeria"; valueList[154] = .006667; finalList[154] = 150;
		countryList[155] = "niue"; valueList[155] = .79205; finalList[155] = 1.2625;
		countryList[156] = "northern cyprus"; valueList[156] = .71511; finalList[156] = 1.3984;
		countryList[157] = "northern mariana islands"; valueList[157] = 1; finalList[157] = 1;
		countryList[158] = "norway"; valueList[158] = .170912; finalList[158] = 5.85098;
		countryList[159] = "oman"; valueList[159] =  2.60078; finalList[159] = .3845;
		countryList[160] = "pakistan"; valueList[160] = .011682; finalList[160] = 85.6;
		countryList[161] = "palau"; valueList[161] = 1; finalList[161] = 1;
		countryList[162] = "palestine"; valueList[162] = .2784; finalList[162] = 3.592;
		countryList[163] = "panama"; valueList[163] = 1; finalList[163] = 1;
		countryList[164] = "papua new guinea"; valueList[164] = .3773; finalList[164] = 2.65041;
		countryList[165] = "paraguay"; valueList[165] = .000204; finalList[165] = 4910;
		countryList[166] = "peru"; valueList[166] = .358102; finalList[166] = 2.7925;
		countryList[167] = "philippines"; valueList[167] = .023496; finalList[167] = 42.56;
		countryList[168] = "pitcairn islands"; valueList[168] = .79135; finalList[168] = 1.2637;
		countryList[169] = "poland"; valueList[169] = .35929; finalList[169] = 2.7833;
		countryList[170] = "portugal"; valueList[170] = 1.4031; finalList[170] = .7127;
		countryList[171] = "qatar"; valueList[171] = .27474; finalList[171] = 3.6398;
		countryList[172] = "romania"; valueList[172] = .326403; finalList[172] = 3.0637;
		countryList[173] = "russia"; valueList[173] = .032481; finalList[173] = 30.7872;
		countryList[174] = "rwanda"; valueList[174] = .001698; finalList[174] = 589;
		countryList[175] = "saba"; valueList[175] = .55097; finalList[175] = 1.815;
		countryList[176] = "saint helena"; valueList[176] = 1.603373; finalList[176] = .623685;
		countryList[177] = "saint kitts and nevis"; valueList[177] = .37037; finalList[177] = 2.7;
		countryList[178] = "saint lucia"; valueList[178] = .37037; finalList[178] = 2.7;
		countryList[179] = "saint vincent and the grenadines"; valueList[179] = .37037; finalList[179] = 2.7;
		countryList[180] = "samoa"; valueList[180] = .412001; finalList[180] = 2.42718;
		countryList[181] = "san marino"; valueList[181] = 1.4031; finalList[181] = .7127;
		countryList[182] = "sao tome and principe"; valueList[182] = .0001; finalList[182] = 17414.5535;
		countryList[183] = "saudi arabia"; valueList[183] = .26666; finalList[183] = 3.7501;
		countryList[184] = "senegal"; valueList[184] = .002143; finalList[184] = 466.67;
		countryList[185] = "serbia"; valueList[185] = .01313; finalList[185] = 76.1475;
		countryList[186] = "seychelles"; valueList[186] = .085106; finalList[186] = 11.75;
		countryList[187] = "sierra leone"; valueList[187] = .000244; finalList[187] = 4100;
		countryList[188] = "singapore"; valueList[188] = .776187; finalList[188] = 1.28835;
		countryList[189] = "sint eustatius"; valueList[189] = .55097; finalList[189] = 1.815;
		countryList[190] = "sint maarten"; valueList[190] = .55097; finalList[190] = 1.815;
		countryList[191] = "slovakia"; valueList[191] = 1.4031; finalList[191] = .7127;
		countryList[192] = "slovenia"; valueList[192] = 1.4031; finalList[192] = .7127;
		countryList[193] = "solomon islands"; valueList[193] = .136126; finalList[193] = 7.34613;
		countryList[194] = "somalia"; valueList[194] = .000623; finalList[194] = 1605;
		countryList[195] = "somaliland"; valueList[195] = .000623; finalList[195] = 1605;
		countryList[196] = "south africa"; valueList[196] = .144989; finalList[196] = 6.89709;
		countryList[197] = "south georgia and the south sandwich islands"; valueList[197] = .61789; finalList[197] = 1.6184;
		countryList[198] = "south ossetia"; valueList[198] = .03277; finalList[198] = 30.5190;
		countryList[199] = "spain"; valueList[199] =  1.4031; finalList[199] = .7127;;
		countryList[200] = "sri lanka"; valueList[200] = .008955; finalList[200] = 111.67;
		countryList[201] = "sudan"; valueList[201] = .422565; finalList[201] = 2.3665;
		countryList[202] = "suriname"; valueList[202] = .369004; finalList[202] = 2.71;
		countryList[203] = "swaziland"; valueList[203] = .144989; finalList[203] = 6.89709;
		countryList[204] = "sweden"; valueList[204] = .150382; finalList[204] = 6.64973;
		countryList[205] = "switzerland"; valueList[205] = 1.019954; finalList[205] = .980436;
		countryList[206] = "syria"; valueList[206] = .021661; finalList[206] = 46.165;
		countryList[207] = "taiwan"; valueList[207] = .0329; finalList[207] = 30.3911;
		countryList[208] = "tajikistan"; valueList[208] = .227873; finalList[208] = 4.3884;
		countryList[209] = "tanzania"; valueList[209] = .000669; finalList[209] = 1495;
		countryList[210] = "thailand"; valueList[210] = .033613; finalList[210] = 29.7508;
		countryList[211] = "togo"; valueList[211] = .002142; finalList[211] = 466.87;
		countryList[212] = "tonga"; valueList[212] = .551; finalList[212] = 1.814882;
		countryList[213] = "transnistria"; valueList[213] = .1; finalList[213] = 10;
		countryList[214] = "trinidad and tobago"; valueList[214] = .158228; finalList[214] = 6.32;
		countryList[215] = "tristan da cunha"; valueList[215] = 1.6175; finalList[215] = .61824;
		countryList[216] = "tunisia"; valueList[216] = .72247; finalList[216] = 1.3841;
		countryList[217] = "turkey"; valueList[217] = .708516; finalList[217] = 1.4114;
		countryList[218] = "turkmenistan"; valueList[218] = .350877; finalList[218] = 2.85;
		countryList[219] = "turks and caicos islands"; valueList[219] = 1; finalList[219] = 1;
		countryList[220] = "tuvalu"; valueList[220] = .997208; finalList[220] = 1.0028;
		countryList[221] = "uganda"; valueList[221] = .000439; finalList[221] = 2280;
		countryList[222] = "ukraine"; valueList[222] = .125786; finalList[222] = 7.95;
		countryList[223] = "united arab emirates"; valueList[223] = .27232; finalList[223] = 3.6722;
		countryList[224] = "united kingdom"; valueList[224] = 1.6166; finalList[224] = .61856;
		countryList[225] = "united states"; valueList[225] = 1; finalList[225] = 1;
		countryList[226] = "uruguay"; valueList[226] = .050378; finalList[226] = 19.85;
		countryList[227] = "uzbekistan"; valueList[227] = .0006144; finalList[227] = 1627.64;
		countryList[228] = "vanuatu"; valueList[228] = .010875; finalList[228] = 91.95;
		countryList[229] = "vatican city"; valueList[229] = 1.4031; finalList[229] = .7127;
		countryList[230] = "venezuela"; valueList[230] = .232558; finalList[230] = 4.3;
		countryList[231] = "vietnam"; valueList[231] = .000051; finalList[231] = 19480;
		countryList[232] = "wallis and futuna"; valueList[232] = .01177; finalList[232] = 84.943;
		countryList[233] = "western sahara"; valueList[233] = .12435; finalList[233] = 8.042;
		countryList[234] = "yemen"; valueList[234] = .004684; finalList[234] = 213.5;
		countryList[235] = "zambia"; valueList[235] = .000215; finalList[235] = 4660;
		countryList[236] = "zimbabwe"; valueList[236] = 1; finalList[236] = 1;
		
		// variations on United States
		countryList[237] = "usa"; valueList[237] = 1; finalList[237] = 1;
		countryList[238] = "america"; valueList[238] = 1; finalList[238] = 1;
		countryList[239] = "united states of america"; valueList[239] = 1; finalList[239] = 1;
		
		// variations on United Kingdom
		countryList[240] = "scotland"; valueList[240] = 1.6166; finalList[240] = .61856;
		countryList[241] = "wales"; valueList[241] = 1.6166; finalList[241] = .61856;
		countryList[242] = "england"; valueList[242] = 1.6166; finalList[242] = .61856;
		countryList[243] = "northern ireland"; valueList[243] = 1.6166; finalList[243] = .61856;

	
		function clearInput(whatId){
			// clears out the text field
			$(whatId).value = "";
			$(whatId).style.color = "#000000";
		}
		
		function clearConversion(){
			// clears out the conversion table
			$("left1").innerHTML = ""; $("right1").innerHTML = "";
			$("left2").innerHTML = ""; $("right2").innerHTML = "";
			$("left3").innerHTML = ""; $("right3").innerHTML = "";
			$("left4").innerHTML = ""; $("right4").innerHTML = "";
			$("left5").innerHTML = ""; $("right5").innerHTML = "";
			$("left6").innerHTML = ""; $("right6").innerHTML = "";
			$("left7").innerHTML = ""; $("right7").innerHTML = "";
			$("left8").innerHTML = ""; $("right8").innerHTML = "";
			$("left9").innerHTML = ""; $("right9").innerHTML = "";
			$("left10").innerHTML = ""; $("right10").innerHTML = "";
			$("left11").innerHTML = ""; $("right11").innerHTML = "";
			$("left12").innerHTML = ""; $("right12").innerHTML = "";
		}
		
		function generate(thelocation, destination, cash){
			$("errorMessage").innerHTML = "";
			//generates left column of cheat sheet
			var amt = parseInt($(cash).value);
			var dA = 2; // divide amount
			if(isNaN(amt) == false){
				if(amt < 1050){ // these two if statements ensure that most values produce a sensical left column
					dA = 1.5;
				}
				if(amt < 77){
					dA = 1.3;
				}
				$("left2").innerHTML = 1;
				$("left3").innerHTML = parseInt(amt/dA/dA/dA/dA/dA/dA/dA/dA/dA);
				$("left4").innerHTML = parseInt(amt/dA/dA/dA/dA/dA/dA/dA/dA);
				$("left5").innerHTML = parseInt(amt/dA/dA/dA/dA/dA/dA/dA);
				$("left6").innerHTML = parseInt(amt/dA/dA/dA/dA/dA/dA);
				$("left7").innerHTML = parseInt(amt/dA/dA/dA/dA/dA);
				$("left8").innerHTML = parseInt(amt/dA/dA/dA/dA);
				$("left9").innerHTML = parseInt(amt/dA/dA/dA);
				$("left10").innerHTML = parseInt(amt/dA/dA);
				$("left11").innerHTML = parseInt(amt/dA);
				$("left12").innerHTML = parseInt(amt);
			}
			else{
				$("errorMessage").innerHTML = "Please be sure to use valid numbers for amount!";
				clearConversion();
				return;
			}
			
			// sets thelocation and destination as the value input into the associated text boxes, and makes them lowercase
			// in an effort to get rid of case sensitivity in looking up countries
			thelocation = $("thelocation").value.toLowerCase();
			destination = $("destination").value.toLowerCase();
			
			// generates right column of cheat sheet (provided that both countries are on country list with proper formatting)
			if(countryList.indexOf(thelocation) != -1 && countryList.indexOf(destination) != -1){
				$("errorMessage").innerHTML = "";
				$("left1").innerHTML = thelocation;
				$("right1").innerHTML = destination;
				$("right2").innerHTML = parseInt($("left2").innerHTML * valueList[countryList.indexOf(thelocation)] * finalList[countryList.indexOf(destination)]);
				$("right3").innerHTML = parseInt($("left3").innerHTML * valueList[countryList.indexOf(thelocation)] * finalList[countryList.indexOf(destination)]);
				$("right4").innerHTML = parseInt($("left4").innerHTML * valueList[countryList.indexOf(thelocation)] * finalList[countryList.indexOf(destination)]);
				$("right5").innerHTML = parseInt($("left5").innerHTML * valueList[countryList.indexOf(thelocation)] * finalList[countryList.indexOf(destination)]);
				$("right6").innerHTML = parseInt($("left6").innerHTML * valueList[countryList.indexOf(thelocation)] * finalList[countryList.indexOf(destination)]);
				$("right7").innerHTML = parseInt($("left7").innerHTML * valueList[countryList.indexOf(thelocation)] * finalList[countryList.indexOf(destination)]);
				$("right8").innerHTML = parseInt($("left8").innerHTML * valueList[countryList.indexOf(thelocation)] * finalList[countryList.indexOf(destination)]);
				$("right9").innerHTML = parseInt($("left9").innerHTML * valueList[countryList.indexOf(thelocation)] * finalList[countryList.indexOf(destination)]);
				$("right10").innerHTML = parseInt($("left10").innerHTML * valueList[countryList.indexOf(thelocation)] * finalList[countryList.indexOf(destination)]);
				$("right11").innerHTML = parseInt($("left11").innerHTML * valueList[countryList.indexOf(thelocation)] * finalList[countryList.indexOf(destination)]);
				$("right12").innerHTML = parseInt($("left12").innerHTML * valueList[countryList.indexOf(thelocation)] * finalList[countryList.indexOf(destination)]);
			}
			else{
				$("errorMessage").innerHTML = "Please be sure to use valid countries!";
				clearConversion();
				return;
			}
			
		}
		
		function makePrintable(){
			// generates new window with smaller, wallet sized conversion sheet for printing
			var generator = window.open('','name','height=274,width=156');
			generator.document.write("<link rel='stylesheet' type='text/css' href='styles.css'>");
			generator.document.write("<div id = 'conversionTitleSmall'>Conversion Sheet<\/div>");
			generator.document.write("<div class = 'conversionItemLeftSmall'>" + $("left1").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemRightSmall'>" + $("right1").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemLeftSmall' style = 'top:53px'>" + $("left2").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemRightSmall' style = 'top:53px'>" + $("right2").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemLeftSmall' style = 'top:73px'>" + $("left3").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemRightSmall' style = 'top:73px'>" + $("right3").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemLeftSmall' style = 'top:93px'>" + $("left4").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemRightSmall' style = 'top:93px'>" + $("right4").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemLeftSmall' style = 'top:113px'>" + $("left5").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemRightSmall' style = 'top:113px'>" + $("right5").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemLeftSmall' style = 'top:133px'>" + $("left6").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemRightSmall' style = 'top:133px'>" + $("right6").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemLeftSmall' style = 'top:153px'>" + $("left7").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemRightSmall' style = 'top:153px'>" + $("right7").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemLeftSmall' style = 'top:173px'>" + $("left8").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemRightSmall' style = 'top:173px'>" + $("right8").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemLeftSmall' style = 'top:193px'>" + $("left9").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemRightSmall' style = 'top:193px'>" + $("right9").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemLeftSmall' style = 'top:213px'>" + $("left10").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemRightSmall' style = 'top:213px'>" + $("right10").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemLeftSmall' style = 'top:233px'>" + $("left11").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemRightSmall' style = 'top:233px'>" + $("right11").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemLeftSmall' style = 'top:253px'>" + $("left12").innerHTML + "<\/div>");
			generator.document.write("<div class = 'conversionItemRightSmall' style = 'top:253px'>" + $("right12").innerHTML + "<\/div>");
		}