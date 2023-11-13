var capitalize = require("underscore.string/capitalize");

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