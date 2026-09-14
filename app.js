// ============= STATE =============
let currentLang = localStorage.getItem ? 'en' : 'en'; // no localStorage use per artifact rules; keep in-memory
let currentLangMem = 'en';
let currentTheme = 'light';

function t(key){
  const dict = I18N[currentLangMem] || I18N.en;
  return dict[key] || I18N.en[key] || key;
}

// ============= CROP DATA (12 crops) =============
const CROPS = [
  {id:'wheat', icon:'🌾', category:'cereal', img:'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&q=80',
    name:{en:'Wheat',hi:'गेहूं',pa:'ਕਣਕ',mr:'गहू',gu:'ઘઉં',bn:'গম'},
    season:{en:'Rabi (Oct–Nov sowing)',hi:'रबी (अक्टूबर–नवंबर बुवाई)',pa:'ਹਾੜੀ (ਅਕਤੂਬਰ–ਨਵੰਬਰ ਬਿਜਾਈ)',mr:'रब्बी (ऑक्टोबर–नोव्हेंबर पेरणी)',gu:'રવિ (ઓક્ટોબર–નવેમ્બર વાવણી)',bn:'রবি (অক্টোবর–নভেম্বর বপন)'},
    soil:{en:'Loamy, well-drained',hi:'दोमट, अच्छी जल निकासी वाली',pa:'ਲੋਮੀ, ਚੰਗੀ ਨਿਕਾਸੀ ਵਾਲੀ',mr:'चिकणमाती, चांगला निचरा',gu:'ગોરાડુ, સારી નિતારવાળી',bn:'দোআঁশ, ভালো নিষ্কাশনযুক্ত'}},
  {id:'rice', icon:'🌾', category:'cereal', img:'https://images.unsplash.com/photo-1536054695850-9ff0b58d55ba?w=500&q=80',
    name:{en:'Rice',hi:'चावल',pa:'ਚੌਲ',mr:'तांदूळ',gu:'ચોખા',bn:'ধান'},
    season:{en:'Kharif (Jun–Jul sowing)',hi:'खरीफ (जून–जुलाई बुवाई)',pa:'ਸਾਉਣੀ (ਜੂਨ–ਜੁਲਾਈ ਬਿਜਾਈ)',mr:'खरीप (जून–जुलै पेरणी)',gu:'ખરીફ (જૂન–જુલાઈ વાવણી)',bn:'খরিফ (জুন–জুলাই বপন)'},
    soil:{en:'Clayey, water-retentive',hi:'चिकनी, जल धारण करने वाली',pa:'ਚੀਕਣੀ, ਪਾਣੀ ਰੋਕਣ ਵਾਲੀ',mr:'चिकणमाती, पाणी धरून ठेवणारी',gu:'ચીકણી, પાણી જાળવી રાખતી',bn:'কর্দমাক্ত, জল ধারণকারী'}},
  {id:'maize', icon:'🌽', category:'cereal', img:'https://images.unsplash.com/photo-1601472491733-1dfb2210bfb0?w=500&q=80',
    name:{en:'Maize',hi:'मक्का',pa:'ਮੱਕੀ',mr:'मका',gu:'મકાઈ',bn:'ভুট্টা'},
    season:{en:'Kharif & Rabi',hi:'खरीफ और रबी',pa:'ਸਾਉਣੀ ਅਤੇ ਹਾੜੀ',mr:'खरीप आणि रब्बी',gu:'ખરીફ અને રવિ',bn:'খরিফ ও রবি'},
    soil:{en:'Well-drained sandy loam',hi:'अच्छी जल निकासी वाली बलुई दोमट',pa:'ਚੰਗੀ ਨਿਕਾਸੀ ਵਾਲੀ ਰੇਤਲੀ ਲੋਮੀ',mr:'चांगला निचरा असलेली वाळू मिश्रित माती',gu:'સારી નિતારવાળી રેતાળ ગોરાડુ',bn:'ভালো নিষ্কাশনযুক্ত বেলে দোআঁশ'}},
  {id:'soybean', icon:'🫘', category:'oilseed', img:'https://images.unsplash.com/photo-1620200423727-8127f75d7f53?w=500&q=80',
    name:{en:'Soybean',hi:'सोयाबीन',pa:'ਸੋਇਆਬੀਨ',mr:'सोयाबीन',gu:'સોયાબીન',bn:'সয়াবিন'},
    season:{en:'Kharif (Jun sowing)',hi:'खरीफ (जून बुवाई)',pa:'ਸਾਉਣੀ (ਜੂਨ ਬਿਜਾਈ)',mr:'खरीप (जून पेरणी)',gu:'ખરીફ (જૂન વાવણી)',bn:'খরিফ (জুন বপন)'},
    soil:{en:'Well-drained black soil',hi:'अच्छी जल निकासी वाली काली मिट्टी',pa:'ਚੰਗੀ ਨਿਕਾਸੀ ਵਾਲੀ ਕਾਲੀ ਮਿੱਟੀ',mr:'चांगला निचरा असलेली काळी माती',gu:'સારી નિતારવાળી કાળી માટી',bn:'ভালো নিষ্কাশনযুক্ত কালো মাটি'}},
  {id:'tomato', icon:'🍅', category:'vegetable', img:'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500&q=80',
    name:{en:'Tomato',hi:'टमाटर',pa:'ਟਮਾਟਰ',mr:'टोमॅटो',gu:'ટામેટાં',bn:'টমেটো'},
    season:{en:'Year-round (region dep.)',hi:'साल भर (क्षेत्र पर निर्भर)',pa:'ਸਾਲ ਭਰ (ਖੇਤਰ ਅਨੁਸਾਰ)',mr:'वर्षभर (प्रदेशानुसार)',gu:'આખું વર્ષ (વિસ્તાર પ્રમાણે)',bn:'সারা বছর (অঞ্চল অনুযায়ী)'},
    soil:{en:'Sandy loam, pH 6–7',hi:'बलुई दोमट, pH 6–7',pa:'ਰੇਤਲੀ ਲੋਮੀ, pH 6–7',mr:'वाळू मिश्रित माती, pH 6–7',gu:'રેતાળ ગોરાડુ, pH 6–7',bn:'বেলে দোআঁশ, pH 6–7'}},
  {id:'mustard', icon:'🌼', category:'oilseed', img:'https://images.unsplash.com/photo-1595855759920-86582396756c?w=500&q=80',
    name:{en:'Mustard',hi:'सरसों',pa:'ਸਰੋਂ',mr:'मोहरी',gu:'સરસવ',bn:'সরিষা'},
    season:{en:'Rabi (Oct sowing)',hi:'रबी (अक्टूबर बुवाई)',pa:'ਹਾੜੀ (ਅਕਤੂਬਰ ਬਿਜਾਈ)',mr:'रब्बी (ऑक्टोबर पेरणी)',gu:'રવિ (ઓક્ટોબર વાવણી)',bn:'রবি (অক্টোবর বপন)'},
    soil:{en:'Well-drained loam',hi:'अच्छी जल निकासी वाली दोमट',pa:'ਚੰਗੀ ਨਿਕਾਸੀ ਵਾਲੀ ਲੋਮੀ',mr:'चांगला निचरा असलेली चिकणमाती',gu:'સારી નિતારવાળી ગોરાડુ',bn:'ভালো নিষ্কাশনযুক্ত দোআঁশ'}},
  {id:'cotton', icon:'☁️', category:'cash', img:'https://images.unsplash.com/photo-1594179047519-f347310d3322?w=500&q=80',
    name:{en:'Cotton',hi:'कपास',pa:'ਕਪਾਹ',mr:'कापूस',gu:'કપાસ',bn:'তুলা'},
    season:{en:'Kharif (Apr–May sowing)',hi:'खरीफ (अप्रैल–मई बुवाई)',pa:'ਸਾਉਣੀ (ਅਪ੍ਰੈਲ–ਮਈ ਬਿਜਾਈ)',mr:'खरीप (एप्रिल–मे पेरणी)',gu:'ખરીફ (એપ્રિલ–મે વાવણી)',bn:'খরিফ (এপ্রিল–মে বপন)'},
    soil:{en:'Black cotton soil',hi:'काली कपास मिट्टी',pa:'ਕਾਲੀ ਕਪਾਹ ਮਿੱਟੀ',mr:'काळी कापूस माती',gu:'કાળી કપાસ માટી',bn:'কালো তুলা মাটি'}},
  {id:'sugarcane', icon:'🎋', category:'cash', img:'https://images.unsplash.com/photo-1605027990121-3b2651d3a5d1?w=500&q=80',
    name:{en:'Sugarcane',hi:'गन्ना',pa:'ਗੰਨਾ',mr:'ऊस',gu:'શેરડી',bn:'আখ'},
    season:{en:'Feb–Mar planting',hi:'फरवरी–मार्च रोपण',pa:'ਫਰਵਰੀ–ਮਾਰਚ ਬਿਜਾਈ',mr:'फेब्रुवारी–मार्च लागवड',gu:'ફેબ્રુઆરી–માર્ચ વાવેતર',bn:'ফেব্রুয়ারি–মার্চ রোপণ'},
    soil:{en:'Deep loamy, good irrigation',hi:'गहरी दोमट, अच्छी सिंचाई',pa:'ਡੂੰਘੀ ਲੋਮੀ, ਚੰਗੀ ਸਿੰਚਾਈ',mr:'खोल चिकणमाती, चांगली सिंचन',gu:'ઊંડી ગોરાડુ, સારી સિંચાઈ',bn:'গভীর দোআঁশ, ভালো সেচ'}},
  {id:'groundnut', icon:'🥜', category:'oilseed', img:'https://images.unsplash.com/photo-1567892737950-30c4db37cd89?w=500&q=80',
    name:{en:'Groundnut',hi:'मूंगफली',pa:'ਮੂੰਗਫਲੀ',mr:'भुईमूग',gu:'મગફળી',bn:'চীনাবাদাম'},
    season:{en:'Kharif (Jun sowing)',hi:'खरीफ (जून बुवाई)',pa:'ਸਾਉਣੀ (ਜੂਨ ਬਿਜਾਈ)',mr:'खरीप (जून पेरणी)',gu:'ખરીફ (જૂન વાવણી)',bn:'খরিফ (জুন বপন)'},
    soil:{en:'Sandy loam',hi:'बलुई दोमट',pa:'ਰੇਤਲੀ ਲੋਮੀ',mr:'वाळू मिश्रित माती',gu:'રેતાળ ગોરાડુ',bn:'বেলে দোআঁশ'}},
  {id:'potato', icon:'🥔', category:'vegetable', img:'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80',
    name:{en:'Potato',hi:'आलू',pa:'ਆਲੂ',mr:'बटाटा',gu:'બટાકા',bn:'আলু'},
    season:{en:'Rabi (Oct–Nov planting)',hi:'रबी (अक्टूबर–नवंबर रोपण)',pa:'ਹਾੜੀ (ਅਕਤੂਬਰ–ਨਵੰਬਰ ਬਿਜਾਈ)',mr:'रब्बी (ऑक्टोबर–नोव्हेंबर लागवड)',gu:'રવિ (ઓક્ટોબર–નવેમ્બર વાવેતર)',bn:'রবি (অক্টোবর–নভেম্বর রোপণ)'},
    soil:{en:'Sandy loam, well-drained',hi:'बलुई दोमट, अच्छी जल निकासी',pa:'ਰੇਤਲੀ ਲੋਮੀ, ਚੰਗੀ ਨਿਕਾਸੀ',mr:'वाळू मिश्रित, चांगला निचरा',gu:'રેતાળ ગોરાડુ, સારી નિતાર',bn:'বেলে দোআঁশ, ভালো নিষ্কাশন'}},
  {id:'onion', icon:'🧅', category:'vegetable', img:'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=500&q=80',
    name:{en:'Onion',hi:'प्याज',pa:'ਪਿਆਜ਼',mr:'कांदा',gu:'ડુંગળી',bn:'পেঁয়াজ'},
    season:{en:'Rabi & Kharif',hi:'रबी और खरीफ',pa:'ਹਾੜੀ ਅਤੇ ਸਾਉਣੀ',mr:'रब्बी आणि खरीप',gu:'રવિ અને ખરીફ',bn:'রবি ও খরিফ'},
    soil:{en:'Well-drained loamy',hi:'अच्छी जल निकासी वाली दोमट',pa:'ਚੰਗੀ ਨਿਕਾਸੀ ਵਾਲੀ ਲੋਮੀ',mr:'चांगला निचरा असलेली चिकणमाती',gu:'સારી નિતારવાળી ગોરાડુ',bn:'ভালো নিষ্কাশনযুক্ত দোআঁশ'}},
  {id:'chili', icon:'🌶️', category:'vegetable', img:'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=500&q=80',
    name:{en:'Chili',hi:'मिर्च',pa:'ਮਿਰਚ',mr:'मिरची',gu:'મરચાં',bn:'লঙ্কা'},
    season:{en:'Kharif (Jun–Jul sowing)',hi:'खरीफ (जून–जुलाई बुवाई)',pa:'ਸਾਉਣੀ (ਜੂਨ–ਜੁਲਾਈ ਬਿਜਾਈ)',mr:'खरीप (जून–जुलै पेरणी)',gu:'ખરીફ (જૂન–જુલાઈ વાવણી)',bn:'খরিফ (জুন–জুলাই বপন)'},
    soil:{en:'Well-drained loam, pH 6–7',hi:'अच्छी जल निकासी वाली दोमट, pH 6–7',pa:'ਚੰਗੀ ਨਿਕਾਸੀ ਵਾਲੀ ਲੋਮੀ, pH 6–7',mr:'चांगला निचरा असलेली माती, pH 6–7',gu:'સારી નિતારવાળી ગોરાડુ, pH 6–7',bn:'ভালো নিষ্কাশনযুক্ত দোআঁশ, pH 6–7'}},
];
const CROP_CATEGORIES = [
  {id:'all', label:{en:'All',hi:'सभी',pa:'ਸਾਰੇ',mr:'सर्व',gu:'બધા',bn:'সব'}},
  {id:'cereal', label:{en:'Cereals',hi:'अनाज',pa:'ਅਨਾਜ',mr:'तृणधान्ये',gu:'અનાજ',bn:'শস্য'}},
  {id:'oilseed', label:{en:'Oilseeds',hi:'तिलहन',pa:'ਤੇਲ ਬੀਜ',mr:'तेलबिया',gu:'તેલીબિયાં',bn:'তৈলবীজ'}},
  {id:'vegetable', label:{en:'Vegetables',hi:'सब्जियां',pa:'ਸਬਜ਼ੀਆਂ',mr:'भाज्या',gu:'શાકભાજી',bn:'সবজি'}},
  {id:'cash', label:{en:'Cash Crops',hi:'नकदी फसल',pa:'ਨਕਦੀ ਫ਼ਸਲਾਂ',mr:'नगदी पिके',gu:'રોકડિયો પાક',bn:'অর্থকরী ফসল'}},
];
let activeCategory = 'all';

// ============= MARKET DATA =============
const MARKET = [
  {crop:'Wheat', mandi:'Karnal, Haryana', min:2050, max:2210, modal:2180, trend:'up'},
  {crop:'Rice', mandi:'Karnal, Haryana', min:1980, max:2340, modal:2210, trend:'up'},
  {crop:'Mustard', mandi:'Alwar, Rajasthan', min:5100, max:5480, modal:5320, trend:'down'},
  {crop:'Maize', mandi:'Nashik, Maharashtra', min:1820, max:2050, modal:1960, trend:'up'},
  {crop:'Cotton', mandi:'Rajkot, Gujarat', min:6900, max:7350, modal:7150, trend:'down'},
  {crop:'Soybean', mandi:'Indore, MP', min:4200, max:4550, modal:4400, trend:'up'},
  {crop:'Onion', mandi:'Lasalgaon, Maharashtra', min:1100, max:1900, modal:1500, trend:'down'},
  {crop:'Potato', mandi:'Agra, UP', min:900, max:1250, modal:1080, trend:'up'},
];

// ============= WEATHER (10 day) =============
const WEATHER_ICONS = ['☀️','⛅','🌤️','🌦️','⛈️','🌥️'];
function buildForecast(){
  const days=[]; const today=new Date();
  const dayLabels = {en:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],hi:['रवि','सोम','मंगल','बुध','गुरु','शुक्र','शनि'],pa:['ਐਤ','ਸੋਮ','ਮੰਗਲ','ਬੁੱਧ','ਵੀਰ','ਸ਼ੁੱਕਰ','ਸ਼ਨੀ'],mr:['रवि','सोम','मंगळ','बुध','गुरु','शुक्र','शनि'],gu:['રવિ','સોમ','મંગળ','બુધ','ગુરુ','શુક્ર','શનિ'],bn:['রবি','সোম','মঙ্গল','বুধ','বৃহ','শুক্র','শনি']};
  for(let i=0;i<10;i++){
    const d=new Date(today); d.setDate(today.getDate()+i);
    const hi=26+Math.round(Math.sin(i)*4)+i%3;
    const lo=hi-8-Math.round(Math.cos(i));
    days.push({dow:d.getDay(), hi, lo, icon:WEATHER_ICONS[i%WEATHER_ICONS.length], labels:dayLabels});
  }
  return days;
}
const FORECAST = buildForecast();

// ============= RENTAL EQUIPMENT =============
const RENTAL = [
  {name:{en:'Mahindra Tractor 575',hi:'महिंद्रा ट्रैक्टर 575',pa:'ਮਹਿੰਦਰਾ ਟਰੈਕਟਰ 575',mr:'महिंद्रा ट्रॅक्टर 575',gu:'મહિન્દ્રા ટ્રેક્ટર 575',bn:'মাহিন্দ্রা ট্র্যাক্টর 575'}, price:1200, unit:'day', img:'https://images.unsplash.com/photo-1605338198864-9ea1a2c3187f?w=500&q=80', owner:'Suresh, Karnal'},
  {name:{en:'Combine Harvester',hi:'कंबाइन हार्वेस्टर',pa:'ਕੰਬਾਈਨ ਹਾਰਵੈਸਟਰ',mr:'कंबाइन हार्वेस्टर',gu:'કમ્બાઇન હાર્વેસ્ટર',bn:'কম্বাইন হারভেস্টার'}, price:3500, unit:'day', img:'https://images.unsplash.com/photo-1591123720164-a2d0a5e2d0a8?w=500&q=80', owner:'Rajbir, Kurukshetra'},
  {name:{en:'Rotavator',hi:'रोटावेटर',pa:'ਰੋਟਾਵੇਟਰ',mr:'रोटाव्हेटर',gu:'રોટાવેટર',bn:'রোটাভেটর'}, price:600, unit:'day', img:'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500&q=80', owner:'Devinder, Patiala'},
  {name:{en:'Seed Drill Machine',hi:'सीड ड्रिल मशीन',pa:'ਸੀਡ ਡ੍ਰਿਲ ਮਸ਼ੀਨ',mr:'सीड ड्रिल मशीन',gu:'સીડ ડ્રિલ મશીન',bn:'সীড ড্রিল মেশিন'}, price:450, unit:'day', img:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80', owner:'Manoj, Meerut'},
  {name:{en:'Water Pump Set',hi:'वाटर पंप सेट',pa:'ਵਾਟਰ ਪੰਪ ਸੈੱਟ',mr:'वॉटर पंप सेट',gu:'વોટર પંપ સેટ',bn:'ওয়াটার পাম্প সেট'}, price:250, unit:'day', img:'https://images.unsplash.com/photo-1620200423727-8127f75d7f53?w=500&q=80', owner:'Iqbal, Ludhiana'},
  {name:{en:'Power Tiller',hi:'पावर टिलर',pa:'ਪਾਵਰ ਟਿਲਰ',mr:'पॉवर टिलर',gu:'પાવર ટિલર',bn:'পাওয়ার টিলার'}, price:700, unit:'day', img:'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&q=80', owner:'Ramesh, Hisar'},
  {name:{en:'Sprayer Drone',hi:'स्प्रेयर ड्रोन',pa:'ਸਪਰੇਅਰ ਡਰੋਨ',mr:'स्प्रेअर ड्रोन',gu:'સ્પ્રેયર ડ્રોન',bn:'স্প্রেয়ার ড্রোন'}, price:1800, unit:'day', img:'https://images.unsplash.com/photo-1508614999368-9260051292e5?w=500&q=80', owner:'Anil, Yamunanagar'},
  {name:{en:'Thresher Machine',hi:'थ्रेशर मशीन',pa:'ਥਰੈਸ਼ਰ ਮਸ਼ੀਨ',mr:'थ्रेशर मशीन',gu:'થ્રેશર મશીન',bn:'থ্রেশার মেশিন'}, price:900, unit:'day', img:'https://images.unsplash.com/photo-1595855759920-86582396756c?w=500&q=80', owner:'Baljit, Sangrur'},
];

// ============= SCHEMES =============
const SCHEMES = [
  {name:'PM-KISAN', body:{en:'₹6,000 per year direct income support to eligible farmer families, paid in three instalments.',hi:'पात्र किसान परिवारों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता, तीन किस्तों में दी जाती है।',pa:'ਯੋਗ ਕਿਸਾਨ ਪਰਿਵਾਰਾਂ ਨੂੰ ਸਾਲਾਨਾ ₹6,000 ਦੀ ਸਿੱਧੀ ਆਮਦਨ ਸਹਾਇਤਾ, ਤਿੰਨ ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ।',mr:'पात्र शेतकरी कुटुंबांना दरवर्षी ₹6,000 थेट उत्पन्न सहाय्य, तीन हप्त्यांमध्ये दिले जाते.',gu:'પાત્ર ખેડૂત પરિવારોને વાર્ષિક ₹6,000ની સીધી આવક સહાય, ત્રણ હપ્તામાં આપવામાં આવે છે.',bn:'যোগ্য কৃষক পরিবারকে বছরে ₹6,000 সরাসরি আয় সহায়তা, তিন কিস্তিতে প্রদান করা হয়।'}},
  {name:'PMFBY (Fasal Bima Yojana)', body:{en:'Crop insurance scheme protecting farmers against crop loss from natural calamities, pests and diseases.',hi:'प्राकृतिक आपदाओं, कीटों और बीमारियों से फसल हानि के खिलाफ किसानों की रक्षा करने वाली फसल बीमा योजना।',pa:'ਕੁਦਰਤੀ ਆਫ਼ਤਾਂ, ਕੀੜਿਆਂ ਅਤੇ ਬਿਮਾਰੀਆਂ ਤੋਂ ਫ਼ਸਲ ਦੇ ਨੁਕਸਾਨ ਤੋਂ ਕਿਸਾਨਾਂ ਦੀ ਰੱਖਿਆ ਕਰਨ ਵਾਲੀ ਫ਼ਸਲ ਬੀਮਾ ਯੋਜਨਾ।',mr:'नैसर्गिक आपत्ती, कीड आणि रोगांमुळे होणाऱ्या पीक नुकसानीपासून शेतकऱ्यांचे संरक्षण करणारी पीक विमा योजना.',gu:'કુદરતી આફતો, જીવાતો અને રોગોથી પાક નુકસાન સામે ખેડૂતોનું રક્ષણ કરતી પાક વીમા યોજના.',bn:'প্রাকৃতিক দুর্যোগ, পোকামাকড় ও রোগ থেকে ফসলের ক্ষতির বিরুদ্ধে কৃষকদের রক্ষা করে এমন ফসল বীমা প্রকল্প।'}},
  {name:'Kisan Credit Card (KCC)', body:{en:'Easy, low-interest short-term credit for crop production, post-harvest expenses and farm assets.',hi:'फसल उत्पादन, कटाई के बाद के खर्च और कृषि संपत्ति के लिए आसान, कम ब्याज वाला अल्पकालिक ऋण।',pa:'ਫ਼ਸਲ ਉਤਪਾਦਨ, ਵਾਢੀ ਤੋਂ ਬਾਅਦ ਦੇ ਖਰਚੇ ਅਤੇ ਖੇਤੀ ਸੰਪਤੀਆਂ ਲਈ ਆਸਾਨ, ਘੱਟ ਵਿਆਜ ਵਾਲਾ ਥੋੜ੍ਹੇ ਸਮੇਂ ਦਾ ਕਰਜ਼ਾ।',mr:'पीक उत्पादन, कापणीनंतरचा खर्च आणि शेती मालमत्तेसाठी सोपे, कमी व्याजाचे अल्पकालीन कर्ज.',gu:'પાક ઉત્પાદન, લણણી પછીના ખર્ચ અને ખેત સંપત્તિ માટે સરળ, ઓછા વ્યાજનું ટૂંકા ગાળાનું ધિરાણ.',bn:'ফসল উৎপাদন, ফসল কাটার পরের খরচ এবং কৃষি সম্পদের জন্য সহজ, স্বল্প সুদের স্বল্পমেয়াদী ঋণ।'}},
  {name:'Soil Health Card Scheme', body:{en:'Free soil testing every 2 years with crop-wise nutrient and fertiliser recommendations.',hi:'फसल-वार पोषक तत्व और उर्वरक सिफारिशों के साथ हर 2 साल में मुफ्त मिट्टी परीक्षण।',pa:'ਫ਼ਸਲ-ਅਨੁਸਾਰ ਪੌਸ਼ਟਿਕ ਤੱਤ ਅਤੇ ਖਾਦ ਸਿਫ਼ਾਰਸ਼ਾਂ ਨਾਲ ਹਰ 2 ਸਾਲਾਂ ਵਿੱਚ ਮੁਫ਼ਤ ਮਿੱਟੀ ਜਾਂਚ।',mr:'पीकानुसार पोषक व खत शिफारशींसह दर 2 वर्षांनी मोफत माती परीक्षण.',gu:'પાક મુજબ પોષક તત્વો અને ખાતરની ભલામણો સાથે દર 2 વર્ષે મફત જમીન પરીક્ષણ.',bn:'ফসল অনুযায়ী পুষ্টি ও সার সুপারিশ সহ প্রতি ২ বছরে বিনামূল্যে মাটি পরীক্ষা।'}},
  {name:'PM Krishi Sinchai Yojana', body:{en:'Support for micro-irrigation (drip/sprinkler) to improve water-use efficiency on farms.',hi:'खेतों पर जल उपयोग दक्षता में सुधार के लिए सूक्ष्म सिंचाई (ड्रिप/स्प्रिंकलर) के लिए सहायता।',pa:'ਖੇਤਾਂ ਵਿੱਚ ਪਾਣੀ ਦੀ ਵਰਤੋਂ ਦੀ ਕੁਸ਼ਲਤਾ ਸੁਧਾਰਨ ਲਈ ਸੂਖਮ ਸਿੰਚਾਈ (ਡ੍ਰਿਪ/ਸਪ੍ਰਿੰਕਲਰ) ਲਈ ਸਹਾਇਤਾ।',mr:'शेतातील पाणी वापर कार्यक्षमता सुधारण्यासाठी सूक्ष्म सिंचन (ठिबक/तुषार) साठी सहाय्य.',gu:'ખેતરોમાં પાણીના વપરાશની કાર્યક્ષમતા સુધારવા માટે સૂક્ષ્મ સિંચાઈ (ડ્રિપ/સ્પ્રિંકલર) માટે સહાય.',bn:'জমিতে জলের ব্যবহার দক্ষতা উন্নত করতে মাইক্রো-সেচ (ড্রিপ/স্প্রিংকলার) এর জন্য সহায়তা।'}},
  {name:'e-NAM (National Agri Market)', body:{en:'Online trading platform connecting farmers to buyers across mandis for better price discovery.',hi:'बेहतर मूल्य खोज के लिए मंडियों में किसानों को खरीदारों से जोड़ने वाला ऑनलाइन ट्रेडिंग प्लेटफॉर्म।',pa:'ਬਿਹਤਰ ਕੀਮਤ ਖੋਜ ਲਈ ਮੰਡੀਆਂ ਵਿੱਚ ਕਿਸਾਨਾਂ ਨੂੰ ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਜੋੜਨ ਵਾਲਾ ਆਨਲਾਈਨ ਟ੍ਰੇਡਿੰਗ ਪਲੇਟਫਾਰਮ।',mr:'चांगल्या किंमत शोधण्यासाठी बाजारांमध्ये शेतकऱ्यांना खरेदीदारांशी जोडणारे ऑनलाइन ट्रेडिंग प्लॅटफॉर्म.',gu:'સારી કિંમત શોધ માટે બજારોમાં ખેડૂતોને ખરીદદારો સાથે જોડતું ઓનલાઇન ટ્રેડિંગ પ્લેટફોર્મ.',bn:'উন্নত মূল্য নির্ধারণের জন্য বাজারে কৃষকদের ক্রেতাদের সাথে সংযুক্ত করে এমন অনলাইন ট্রেডিং প্ল্যাটফর্ম।'}},
];

// ============= COMMUNITY POSTS =============
let POSTS = [
  {name:'Ramesh Kumar, Haryana', avatar:'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=100&q=80', time:'2h', text:'This year I used drip irrigation for my cotton field and saved almost 30% water. Highly recommend for anyone in a low-rainfall area.', likes:24, liked:false},
  {name:'Sunita Devi, Punjab', avatar:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80', time:'5h', text:'Does anyone know a good source for certified wheat seeds near Ludhiana? Last year my yield was lower than expected.', likes:11, liked:false},
  {name:'Vijay Patil, Maharashtra', avatar:'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&q=80', time:'1d', text:'Rented a rotavator through this app last week from a farmer 8km away. Saved a lot compared to buying one. This equipment rental feature is genuinely useful.', likes:38, liked:false},
];

// ============= RENDER FUNCTIONS =============
function renderCrops(){
  const grid = document.getElementById('cropGrid');
  const q = (document.getElementById('cropSearch').value||'').toLowerCase();
  const filtered = CROPS.filter(c=>{
    const matchesCat = activeCategory==='all' || c.category===activeCategory;
    const matchesQ = !q || c.name.en.toLowerCase().includes(q) || (c.name[currentLangMem]||'').toLowerCase().includes(q);
    return matchesCat && matchesQ;
  });
  grid.innerHTML = filtered.map(c=>`
    <div class="card">
      <div class="imgwrap"><img src="${c.img}" alt="${c.name.en}" loading="lazy" onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:2.5rem;background:var(--green-500)\\'>${c.icon}</div>'"></div>
      <div class="body">
        <h3>${c.icon} ${c.name[currentLangMem]||c.name.en}</h3>
        <p><b>${t('cropSearchPh').split(' ')[0]==='Search'?'Season':''}</b></p>
        <p style="margin-top:6px">🗓️ ${c.season[currentLangMem]||c.season.en}</p>
        <p style="margin-top:4px">🌱 ${c.soil[currentLangMem]||c.soil.en}</p>
      </div>
    </div>
  `).join('') || `<p style="color:var(--text-soft)">No crops found.</p>`;
}

function renderCropFilters(){
  const row = document.getElementById('cropFilters');
  row.innerHTML = CROP_CATEGORIES.map(cat=>`
    <button class="pill ${activeCategory===cat.id?'active':''}" data-cat="${cat.id}">${cat.label[currentLangMem]||cat.label.en}</button>
  `).join('');
  row.querySelectorAll('.pill').forEach(btn=>{
    btn.addEventListener('click', ()=>{ activeCategory = btn.dataset.cat; renderCropFilters(); renderCrops(); });
  });
}

function renderMarket(){
  const tbody = document.getElementById('marketTable');
  tbody.innerHTML = MARKET.map(m=>`
    <tr>
      <td>${m.crop}</td>
      <td>${m.mandi}</td>
      <td>₹${m.min.toLocaleString('en-IN')}</td>
      <td>₹${m.max.toLocaleString('en-IN')}</td>
      <td>₹${m.modal.toLocaleString('en-IN')}</td>
      <td class="${m.trend==='up'?'price-up':'price-down'}">${m.trend==='up'?'▲':'▼'} ${m.trend==='up'?'2.4%':'1.8%'}</td>
    </tr>
  `).join('');
}

function renderForecast(){
  const row = document.getElementById('forecastRow');
  row.innerHTML = FORECAST.map((d,i)=>`
    <div class="fday">
      <div>${i===0?t('weatherTitle').split(' ')[0]==='10-Day'?'Today':'Today':d.labels[currentLangMem][d.dow]}</div>
      <div class="ic">${d.icon}</div>
      <div class="hi">${d.hi}°</div>
      <div class="lo">${d.lo}°</div>
    </div>
  `).join('');
}

function renderRental(){
  const grid = document.getElementById('rentalGrid');
  grid.innerHTML = RENTAL.map(r=>`
    <div class="card">
      <div class="imgwrap"><img src="${r.img}" alt="${r.name.en}" loading="lazy" onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:2.5rem;background:var(--green-500)\\'>🚜</div>'"></div>
      <div class="body">
        <span class="avail">${currentLangMem==='en'?'Available':t('rentNow')}</span>
        <h3 style="margin-top:6px">${r.name[currentLangMem]||r.name.en}</h3>
        <p>${r.owner}</p>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px">
          <span class="rent-price">₹${r.price}${t('perDay')}</span>
          <button class="btn btn-primary" style="padding:7px 12px;font-size:.8rem" onclick="alert('${t('rentNow')}: ${r.name[currentLangMem]||r.name.en}')">${t('rentNow')}</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderSchemes(){
  const grid = document.getElementById('schemesGrid');
  grid.innerHTML = SCHEMES.map(s=>`
    <div class="card scheme-card">
      <h3>${s.name}</h3>
      <p style="margin-top:8px">${s.body[currentLangMem]||s.body.en}</p>
      <a href="#" style="display:inline-block;margin-top:12px;font-weight:700;color:var(--green-600)" onclick="return false">${t('learnMore')}</a>
    </div>
  `).join('');
}

function renderPosts(){
  const feed = document.getElementById('postsFeed');
  feed.innerHTML = POSTS.map((p,i)=>`
    <div class="post">
      <div class="post-head">
        <div class="avatar"><img src="${p.avatar}" alt="${p.name}" onerror="this.parentElement.innerHTML='👤'"></div>
        <div>
          <div class="post-name">${p.name}</div>
          <div class="post-time">${p.time} ago</div>
        </div>
      </div>
      <p>${p.text}</p>
      <div class="post-actions">
        <button class="${p.liked?'liked':''}" onclick="toggleLike(${i})">${p.liked?'❤️':'🤍'} ${t('like')} · ${p.likes}</button>
        <button>💬 ${t('comment')}</button>
        <button>↗ ${t('share')}</button>
      </div>
    </div>
  `).join('');
}
function toggleLike(i){
  POSTS[i].liked = !POSTS[i].liked;
  POSTS[i].likes += POSTS[i].liked ? 1 : -1;
  renderPosts();
}

function renderUpdates(){
  const grid = document.getElementById('updatesGrid');
  const updates = [
    {img:'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&q=80', tag:'Weather', en:'Heavy rain expected in North India this week — plan irrigation accordingly.'},
    {img:'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&q=80', tag:'Market', en:'Wheat prices rise 4% across Haryana and Punjab mandis this week.'},
    {img:'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500&q=80', tag:'Scheme', en:'PM-KISAN 18th instalment release date announced — check your eligibility.'},
  ];
  grid.innerHTML = updates.map(u=>`
    <div class="card">
      <div class="imgwrap"><img src="${u.img}" loading="lazy" alt=""></div>
      <div class="body"><span class="tag">${u.tag}</span><p>${u.en}</p></div>
    </div>
  `).join('');
}

// ============= NAVIGATION =============
function goPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  document.querySelectorAll('nav.mainnav a').forEach(a=>a.classList.toggle('active', a.dataset.page===name));
  document.getElementById('mainnav').classList.remove('open');
  window.scrollTo({top:0, behavior:'smooth'});
}
document.querySelectorAll('nav.mainnav a').forEach(a=>{
  a.addEventListener('click', e=>{ e.preventDefault(); goPage(a.dataset.page); });
});
document.getElementById('hambBtn').addEventListener('click', ()=>{
  document.getElementById('mainnav').classList.toggle('open');
});

// ============= THEME =============
function applyTheme(){
  document.body.setAttribute('data-theme', currentTheme);
  document.getElementById('themeToggle').textContent = currentTheme==='light' ? '🌙' : '☀️';
}
document.getElementById('themeToggle').addEventListener('click', ()=>{
  currentTheme = currentTheme==='light' ? 'dark' : 'light';
  applyTheme();
});

// ============= LANGUAGE =============
function applyLanguage(){
  document.querySelectorAll('[data-i]').forEach(el=>{
    const key = el.getAttribute('data-i');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i-ph]').forEach(el=>{
    const key = el.getAttribute('data-i-ph');
    el.setAttribute('placeholder', t(key));
  });
  document.documentElement.lang = currentLangMem;
  renderCropFilters(); renderCrops(); renderForecast(); renderRental(); renderSchemes(); renderPosts();
}
document.getElementById('langSelect').addEventListener('change', e=>{
  currentLangMem = e.target.value;
  applyLanguage();
});

// ============= AUTH TABS =============
document.getElementById('tabLogin').addEventListener('click', ()=>{
  document.getElementById('tabLogin').classList.add('active');
  document.getElementById('tabSignup').classList.remove('active');
  document.getElementById('loginForm').style.display='block';
  document.getElementById('signupForm').style.display='none';
});
document.getElementById('tabSignup').addEventListener('click', ()=>{
  document.getElementById('tabSignup').classList.add('active');
  document.getElementById('tabLogin').classList.remove('active');
  document.getElementById('signupForm').style.display='block';
  document.getElementById('loginForm').style.display='none';
});
function handleAuth(e){
  e.preventDefault();
  alert(t('authSuccess'));
  goPage('home');
  return false;
}

// ============= NEW POST =============
document.getElementById('postBtn').addEventListener('click', ()=>{
  const val = document.getElementById('newPostText').value.trim();
  if(!val) return;
  POSTS.unshift({name:'You', avatar:'', time:'now', text:val, likes:0, liked:false});
  document.getElementById('newPostText').value='';
  renderPosts();
});

// ============= CROP SEARCH =============
document.getElementById('cropSearch').addEventListener('input', renderCrops);

// ============= INIT =============
applyTheme();
renderCropFilters();
renderCrops();
renderMarket();
renderForecast();
renderRental();
renderSchemes();
renderPosts();
renderUpdates();
applyLanguage();
