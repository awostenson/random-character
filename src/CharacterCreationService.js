import characteristics from "./characteristics.json";
import personalityTraits from "./personalityTraits.json";
var capitalize = require("underscore.string/capitalize");

class CharacterCreationService {}

export function createCharacter() {
  return {
    "world": createWorld(),
    "town": createHometown(),
    "family": createFamily(),
    "backstory": createBackstory(),
    "character": createCharacterInfo(),
    "pronouns": setPronouns()
  };
} 

function createWorld() {
  var world = characteristics.world;
  return {
    "conflict": choose(world.conflict),
    "geography": {
      "borders": choose(world.geography.borders),
      "climate": choose(world.geography.climate)
    },
    "government": {
      "descriptor": choose(world.government.descriptor),
      "type": choose(world.government.type)
    },
    "technology": {
      "energySource": choose(world.technology.energySource),
      "level": choose(world.technology.level)
    }
  }
}

function createHometown() {
  var town = characteristics.hometown;
  return {
    "size": choose(town.size),
    "specialty": choose(town.specialty)
  }
}

function createFamily() {
  var family = characteristics.family;
  var wealthCoefficient = Math.floor(Math.random() * 100);
  return {
    "birthOrder": choose(family.birthOrder[Math.floor((Math.random() * 5) + 1)]),
    "prosperity": setProsperity(wealthCoefficient),
    "parentalOccupation": setParentalOccupation(wealthCoefficient),
    "history": chooseWithDisadvantage(family.history, 2)
  }
}

function setProsperity(wealth) {
  var prosperityLevels = characteristics.family.prosperity;
  if (wealth > 94) {
    return prosperityLevels[prosperityLevels.length - 1];
  } if (wealth > 75) {
    return prosperityLevels[prosperityLevels.length - 2];
  } if (wealth > 50) {
    return prosperityLevels[prosperityLevels.length - 3];
  } if (wealth > 30) {
    return prosperityLevels[prosperityLevels.length - 4];
  } if (wealth > 10) {
    return prosperityLevels[prosperityLevels.length - 5];
  }
  return prosperityLevels[prosperityLevels.length - 6];
}

function setParentalOccupation(wealth) {
  var occupationLength = characteristics.family.parentalOccupations.length;
  var baseGen = randomWithDisadvantage(occupationLength - 3);
  // a wealth of 100 is locked to the top 66% of jobs, etc
  var silverSpoonBonus = 0;
  if (wealth > 75) {
    silverSpoonBonus = Math.floor((wealth * 0.66 / (100 / occupationLength)));
  }
  var newGen = baseGen + silverSpoonBonus; 
  if (newGen >= occupationLength) {
    return "wealthy investor";
  }
  return characteristics.family.parentalOccupations[newGen];
}

function randomWithDisadvantage(max, nDice = 2) {
  var generations = [];
  for (let i = 0; i < nDice; i++) {
    generations.push(Math.floor(Math.random() * max));
  }
  return Math.floor(Math.min(...generations));
}

function chooseWithDisadvantage(options, nDice = 2) {
  return options[randomWithDisadvantage(options.length, nDice)];
}

function createBackstory() {
  var backstory = characteristics.backstory;
  return {
    "origin": {
      "birth": choose(backstory.origin.birth),
      "joinedFamily": chooseWithDisadvantage(backstory.origin.joinedFamily, 3)
    },
    "childhood": setChildhood(),
    "adventures": choose(backstory.adventures),
    "item": choose(backstory.item)
  };
}

function setChildhood() {
  if (Math.random() > 0.75) {
    return choose(characteristics.backstory.childhood.special);
  }
  return choose(characteristics.backstory.childhood.standard);
}

function createCharacterInfo() {
  var character = characteristics.character;
  return {
    "hobby": choose(character.hobby),
    "personality": createPersonality(),
    "looks": createLooks(),
    "favColor": choose(character.favColor), 
    "fatalFlaw": choose(character.fatalFlaw),
    "motivation": choose(character.motivation)
  };
}

function createPersonality() {
  return choose(personalityTraits.traits).toLowerCase() + 
  " and " + 
  choose(personalityTraits.traits).toLowerCase();
}

function createLooks() {
  var looks = characteristics.character.looks;
  // indicates the overall 'variance' in color available to the character:
  // high numbers of dice will tend to skew towards darker pigment
  var nDice = Math.floor(Math.random() * 3) + 1
  return {
    "regionTypical": chooseWithDisadvantage(looks.regionTypical),
    "hairColor": chooseWithDisadvantage(looks.hairColor, nDice),
    "hairType": choose(looks.hairType),
    "eyeColor": chooseWithDisadvantage(looks.eyeColor, nDice),
    "skinTone": choose(looks.skinTone),      
    "build": chooseWithDisadvantage(looks.build),
    "height": chooseWithDisadvantage(looks.height) 
    };
}

function setPronouns() {
  var pronouns = characteristics.pronouns;
  // the subtraction makes binary pronouns more common
  var roll = Math.floor(Math.abs((Math.random() * pronouns.they.length) - 0.5));
  return {
    "they": pronouns.they[roll],
    "them": pronouns.them[roll],
    "their": pronouns.their[roll],
    "were": pronouns.were[roll]
  };
}

function choose(options) {
  return options[Math.floor(Math.random() * options.length)];
}

export function displayWorld(character) {
  return (
    <div>
      <div>{displayRegion(character)}</div>
      <div>{displayHometown(character)}</div>
    </div>
    );
}

function displayRegion(character) {
  var world = character.world;
  return [
    "The story takes place in a " + world.geography.borders +
    " region characterized by its " + world.geography.climate +
    " climate. It is a " + world.conflict + 
      " land overseen by a " + world.government.descriptor + 
      " " + world.government.type + ".", 
    <br />,
    <br />, 
    "People here use technology powered mainly by " + world.technology.energySource + 
    ". Compared to their neighbors, they have a " + world.technology.level + " level of advancement." ,
    <br />,
    <br />
  ];
}

function displayHometown(character) {
  var town = character.town;
  return [
    "Our central character grew up in " + town.size +
    ". " + capitalize(character.pronouns.their) + 
    " part of the region is known for its " + town.specialty + "."
  ]
}

export function displayCharacter(character) {
  var looks = character.character.looks;
  return [
    "The character might be described as " + character.character.personality +
    ". " + capitalize(character.pronouns.they) + " spent much of " + character.pronouns.their +
    " free time " + character.character.hobby + " prior to the story beginning. " +
    capitalize(character.pronouns.their) + " favorite color is " + character.character.favColor.name + ".",
    <br />, <br />,
    capitalize(character.pronouns.they) + " " + character.pronouns.were + " born with " + looks.hairType +
     " " + looks.hairColor + " hair, " + looks.eyeColor + " eyes, and " + 
    looks.skinTone + " features; additionally, " + character.pronouns.they + " " + character.pronouns.were 
    + " predisposed to a " + looks.build + ", " + looks.height + " build. " + 
    capitalize(character.pronouns.their) + " neighbors would consider " + character.pronouns.their + 
    " appearance "+ looks.regionTypical + "."
  ]
}

export function displayBackstory(character) {
  var pronouns = character.pronouns;
  return [
    "The character was born " + character.backstory.origin.birth +
    ", and joined " + pronouns.their + " family " + character.backstory.origin.joinedFamily +
     ". " + capitalize(pronouns.they) +
    " " + pronouns.were + " " + pronouns.their + " parents' " + character.family.birthOrder + ".", 
    <br />, <br />,
    capitalize(pronouns.their) + " family was " + character.family.prosperity + ", with the more influential of " + pronouns.their + " parents working as a " +
    character.family.parentalOccupation + ". The character grew up hearing stories of how " +
    pronouns.their + " family was " + character.family.history + "." ,
    <br />, <br />,
    "In " + pronouns.their + " childhood, the character " +
    character.backstory.childhood + ". Later in life, after some growth, " + pronouns.they + 
    " " + character.backstory.adventures + ". " + capitalize(pronouns.their) + " most treasured belonging is " + 
    character.backstory.item + "."
  ];
}