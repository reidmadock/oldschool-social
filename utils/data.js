/*
 These are all names of LoL Champions
 Name data courtesy of Riot Games 
 https://developer.riotgames.com/docs/lol
*/
const names = [
'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Anivia', 'Annie', 'Aphelios', 'Ashe', 'AurelionSol', 'Azir',
'Bard','Belveth','Blitzcrank','Brand','Braum',
'Caitlyn','Camille','Cassiopeia','Chogath','Corki',
'Darius','Diana','Draven','DrMundo',
'Ekko','Elise','Evelynn','Ezreal',
'Fiddlesticks','Fiora','Fizz',
'Galio','Gangplank','Garen','Gnar','Gragas','Graves','Gwen',
'Hecarim','Heimerdinger',
'Illaoi','Irelia','Ivern',
'Janna','JarvanIV','Jax','Jayce','Jhin','Jinx',
'Kaisa','Kalista','Karma','Karthus','Kassadin','Katarina','Kayle','Kayn','Kennen','Khazix','Kindred','Kled','KogMaw','KSante',
'Leblanc','LeeSin','Leona','Lillia','Lissandra','Lucian','Lulu','Lux',
'Malphite','Malzahar','Maokai','MasterYi','Milio','MissFortune','MonkeyKing','Mordekaiser','Morgana',
'Nami','Nasus','Nautilus','Neeko','Nidalee','Nilah','Nocturne','Nunu',
'Olaf','Orianna','Ornn',
'Pantheon','Poppy','Pyke',
'Qiyana','Quinn',
'Rakan','Rammus','RekSai','Rell','Renata','Renekton','Rengar','Riven','Rumble','Ryze',
'Samira','Sejuani','Senna','Seraphine','Sett','Shaco','Shen','Shyvana','Singed','Sion','Sivir','Skarner','Sona','Soraka','Swain','Sylas','Syndra',
'TahmKench','Taliyah','Talon','Taric','Teemo','Thresh','Tristana','Trundle','Tryndamere','TwistedFate','Twitch',
'Udyr','Urgot',
'Varus','Vayne','Veigar','Velkoz','Vex','Vi','Viego','Viktor','Vladimir','Volibear',
'Warwick',
'Xayah','Xerath','XinZhao',
'Yasuo','Yone','Yorick','Yuumi',
'Zac','Zed','Zeri','Ziggs','Zilean','Zoe','Zyra'
];

const roles = [
    'top',
    'mid',
    'jungle',
    'bot',
    'support',
    'main'
];

const comments = [
  'Please don\'t read me',
  'I am tired',
  'The Duolingo bird scares me',
  'Diablo 3 wasn\'t a true successor to Diablo 2',
  'Bloons Tower Defense 6 is incredible',
  'Have you invested in cryptocurrency? I have and let me tell you bro, it\'s the future.',
  'Marvel movies are overrated',
  'Hello world',
  'Social media is a big waste of time',
  'I am not a real person, I am nothing more than an auto generated comment for seed data',
  'I love chicken sandwiches',
  'Graphics cards are too expensive.',
  'Chrome uses too much RAM',
  'Firefox is the best browser',
];

const lorum = [
    'lorem',
    'imsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'curabitur',
    'vel',
    'hendrerit',
    'libero',
    'eleifend',
    'blandit',
    'nunc',
    'ornare',
    'odio',
    'ut',
    'orci',
    'gravida',
    'imperdiet',
    'nullam',
    'purus',
    'lacinia',
    'a',
    'pretium',
    'quis',
];

const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

const getRandomWord = () => `${lorum[genRandomIndex(lorum)]}`;

const getRandomThought = (words) => {
  let post = '';
  for (let i = 0; i < words; i++) {
    post += ` ${getRandomWord()}`;
  }
  return post;
};

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username (don't need full names right now)
const getRandomUsername = () => `${getRandomArrItem(names)}_${getRandomArrItem(roles)}`;

const getNewUsername = (user) => `${user}_${getRandomArrItem(roles)}`;

const getRandomEmail = () => `${getRandomArrItem(names)}@lol.gg`;

const getRandomReactions = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        text: getRandomArrItem(comments),
        username: getRandomUsername().split(' ')[0],
      });
    }
    return results;
};

// Export the functions for use in seed.js
module.exports = {
    getRandomName,
    getRandomReactions,
    getRandomThought,
    genRandomIndex,
    getRandomUsername,
    getNewUsername,
    getRandomEmail
};
  