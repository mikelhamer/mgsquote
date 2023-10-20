const tmi = require('tmi.js');
require('dotenv').config();

// Define configuration options
const opts = {
  identity: {
    username: 'mgsquotebot',
    password: `oauth:${process.env.TWITCH_OAUTH_TOKEN}`
  },
  channels: [
    'madollamike'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// List of quotes
const quotes = [
  'Kept you waiting, huh?',
  'I\'m no hero, never was, never will be. I\'m just an old killer, hired to do some wet work.',
  'War has changed.',
  'SNAAAAAAKKKKEEEEE!!!!!!',
  'If You Ask Me, There’s No Happiness To Be Found In Death… No Peace, Either. I’m leaving here alive',
  'At Least I Always Fought For What I Believed In…',
  'HURT ME MORE!!!!',
  'That stance…',
  'You\'re pretty good.',
  'I\'m Lightning. The Rain Transformed.',
  'I\'m already a demon.',
  'I NEED SCISSORS! 61!',
  'THE LA LI LU LE LO!?',
  'I\'m an Otaku too.',
  'Hal...I miss you..',
  'Snakes don’t belong in Alaska',
  'Kuwabara kuwabara',
  'Only a fool trust his life to a weapon',
  'I am…Shalashaska',
  'I hear it’s amazing when the famous purple stuffed worm in flap-jaw space with the tuning fork does a raw blink on Hara-Kiri Rock. I need scissors! 61!',,
  'Ooohhhhh.... my stomach!',
  'I was born on the battlefield. Conflict and victory were my parents',
  'Hey. Shut up in there will ya!',
  'What is this fairy disguise?',
  'I FEEL ASLEEP',
  'I... I can walk just fine. I can even run...',
  'Laugh and grow fat!',

  // Add more quotes here
];


// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!mgsquote') {
    const quote = getRandomQuote();
    client.say(target, `"${quote}"`);
    console.log(`* Executed ${commandName} command`);
  }
}

// Function to get a random quote
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}