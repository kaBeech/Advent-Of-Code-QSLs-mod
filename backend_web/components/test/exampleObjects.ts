export const exampleUser = {
  "id": "1",
  "dateCreated": new Date(),
  "numberOfGames": 1,
  "serializedId": "42",
  "username": "exampleUser",
};

export const exampleGame = {
  "id": 1,
  "userId": "1",
  "number": 1,
  "year": 2022,
  "name": "Test Game",
  "playerName": "Me!",
  "currentDay": 0,
  "currentDayCompleted": false,
  "currentRerollTokens": 7,
  "rerollTokensSpent": 0,
  "rerollTokensSpentDuringPart2Raw": 0,
  "rerollTokensSpentDuringPart2Limited": 0,
  "repositoryLink": null,
  "progressSheetLink": null,
  "isPublic": false,
  "publicProfileId": null,
  "score": 0,
  "rankId": null,
  "dateCreated": new Date(),
  "dateCompleted": null,
};

export const exampleGameDay1 = {
  "id": 1,
  "userId": "1",
  "number": 1,
  "year": 2022,
  "name": "Test Game",
  "playerName": "Me!",
  "currentDay": 1,
  "currentDayCompleted": false,
  "currentRerollTokens": 7,
  "rerollTokensSpent": 0,
  "repositoryLink": null,
  "progressSheetLink": null,
  "isPublic": false,
  "publicProfileId": null,
  "score": 0,
  "rankId": null,
  "dateCreated": new Date(),
  "dateCompleted": null,
  "rerollTokensSpentDuringPart2Raw": 0,
  "rerollTokensSpentDuringPart2Limited": 0,
};

export const exampleDay = {
  "id": 1,
  "dateCreated": new Date(),
  "gameId": 1,
  "userId": "1",
  "gameNumber": 1,
  "number": 1,
  "challengeModifierId": null,
  "modifierOptionId": null,
  "dateFirstRolled": null,
  "part1Completed": null,
  "modifierWhenPart1CompletedId": null,
  "optionWhenPart1CompletedId": null,
  "part2Completed": null,
  "challengeModifierRerollsUsed": 0,
  "modifierOptionRerollsUsed": 0,
  "rerollTokensSpentDuringPart2": 0,
  "netScore": 0,
};

export const exampleChallengeModifiers = [
  // {
  //   "id": 1,
  //   "dateCreated": new Date(),
  //   "name": "new_codebase_language",
  //   "text": "in a programming language not yet used in this codebase",
  //   "hasOptions": false,
  //   "explanatoryUrl": null,
  //   "standard": true,
  //   "createdById": null,
  //   "isPublic": true,
  // },
  // {
  //   "id": 2,
  //   "dateCreated": new Date(),
  //   "name": "new_language",
  //   "text": "in a programming language you've never used before",
  //   "hasOptions": false,
  //   "explanatoryUrl": null,
  //   "standard": true,
  //   "createdById": null,
  //   "isPublic": true,
  // },
  // {
  //   "id": 3,
  //   "dateCreated": new Date(),
  //   "name": "quickly",
  //   "text": "as quickly as you can",
  //   "hasOptions": false,
  //   "explanatoryUrl": null,
  //   "standard": true,
  //   "createdById": null,
  //   "isPublic": true,
  // },
  // {
  //   "id": 4,
  //   "dateCreated": new Date(),
  //   "name": "language_box_1",
  //   "text": "using a random programming language from Language Box 1: ",
  //   "hasOptions": true,
  //   "explanatoryUrl": null,
  //   "standard": true,
  //   "createdById": null,
  //   "isPublic": true,
  // },
  {
    "id": 5,
    "dateCreated": new Date(),
    "name": "language_box_2",
    "text": "using a random programming language from Language Box 2: ",
    "hasOptions": true,
    "explanatoryUrl": null,
    "standard": true,
    "createdById": null,
    "isPublic": true,
  },
  // {
  //   "id": 6,
  //   "dateCreated": new Date(),
  //   "name": "language_box_3",
  //   "text": "using a random programming language from Language Box 3: ",
  //   "hasOptions": true,
  //   "explanatoryUrl": null,
  //   "standard": true,
  //   "createdById": null,
  //   "isPublic": true,
  // },
  {
    "id": 7,
    "dateCreated": new Date(),
    "name": "testing",
    "text": "with thorough testing",
    "hasOptions": false,
    "explanatoryUrl": null,
    "standard": true,
    "createdById": null,
    "isPublic": true,
  },
];

export const exampleModifierOptions = [
  // {
  //   "id": 1,
  //   "dateCreated": new Date(),
  //   "challengeModifierId": 4,
  //   "name": "language_box_1_javascript",
  //   "text": "JavaScript",
  //   "explanatoryUrl": null,
  //   "standard": true,
  //   "createdById": null,
  //   "isPublic": true,
  // },
  // {
  //   "id": 2,
  //   "dateCreated": new Date(),
  //   "challengeModifierId": 4,
  //   "name": "language_box_1_typescript",
  //   "text": "TypeScript",
  //   "explanatoryUrl": null,
  //   "standard": true,
  //   "createdById": null,
  //   "isPublic": true,
  // },
  // {
  //   "id": 3,
  //   "dateCreated": new Date(),
  //   "challengeModifierId": 4,
  //   "name": "language_box_1_python",
  //   "text": "Python",
  //   "explanatoryUrl": null,
  //   "standard": true,
  //   "createdById": null,
  //   "isPublic": true,
  // },
  // {
  //   "id": 4,
  //   "dateCreated": new Date(),
  //   "challengeModifierId": 4,
  //   "name": "language_box_1_r",
  //   "text": "R",
  //   "explanatoryUrl": null,
  //   "standard": true,
  //   "createdById": null,
  //   "isPublic": true,
  // },
  // {
  //   "id": 5,
  //   "dateCreated": new Date(),
  //   "challengeModifierId": 4,
  //   "name": "language_box_1_ruby",
  //   "text": "Ruby",
  //   "explanatoryUrl": null,
  //   "standard": true,
  //   "createdById": null,
  //   "isPublic": true,
  // },
  // {
  //   "id": 6,
  //   "dateCreated": new Date(),
  //   "challengeModifierId": 4,
  //   "name": "language_box_1_java",
  //   "text": "Java",
  //   "explanatoryUrl": null,
  //   "standard": true,
  //   "createdById": null,
  //   "isPublic": true,
  // },
  // {
  //   "id": 7,
  //   "dateCreated": new Date(),
  //   "challengeModifierId": 4,
  //   "name": "language_box_1_c",
  //   "text": "C",
  //   "explanatoryUrl": null,
  //   "standard": true,
  //   "createdById": null,
  //   "isPublic": true,
  // },
  // {
  //   "id": 8,
  //   "dateCreated": new Date(),
  //   "challengeModifierId": 4,
  //   "name": "language_box_1_go",
  //   "text": "Go",
  //   "explanatoryUrl": null,
  //   "standard": true,
  //   "createdById": null,
  //   "isPublic": true,
  // },
  {
    "id": 9,
    "dateCreated": new Date(),
    "challengeModifierId": 5,
    "name": "language_box_2_cpp",
    "text": "C++",
    "explanatoryUrl": null,
    "standard": true,
    "createdById": null,
    "isPublic": true,
  },
  {
    "id": 10,
    "dateCreated": new Date(),
    "challengeModifierId": 5,
    "name": "language_box_2_rust",
    "text": "Rust",
    "explanatoryUrl": null,
    "standard": true,
    "createdById": null,
    "isPublic": true,
  },
];

export const exampleRanks = [
  {
    id: 1,
    name: "Champion",
    minimumScore: 0,
  },
  {
    id: 2,
    name: "Gnarly Champion",
    minimumScore: 200,
  },
  {
    id: 3,
    name: "Radical Champion",
    minimumScore: 400,
  },
  {
    id: 4,
    name: "Righteous Champion",
    minimumScore: 600,
  },
  {
    id: 5,
    name: "Epic Champion",
    minimumScore: 800,
  },
  {
    id: 6,
    name: "Flawless Champion",
    minimumScore: 920,
  },
  {
    id: 7,
    name: "Legendary Champion",
    minimumScore: 1000,
  },
  {
    id: 8,
    name: "Santaic Champion",
    minimumScore: 1120,
  },
  {
    id: 9,
    name: "Godlike Champion",
    minimumScore: 1240,
  },
];
