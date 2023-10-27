import { getAllRanks } from "../db.ts";
import { Game } from "../generated/client/deno/index.d.ts";

interface GameControllerState {
  game: Game;
}

export const GameController = (
  game: Game,
) => {
  const state = {
    game,
  };

  return {
    ...nextDayStarter(state),
    ...currentDayCompleter(state),
    ...currentRerollTokensAdjuster(state),
    ...rerollTokenSpender(state),
    ...nameSetter(state),
    ...playerNameSetter(state),
    ...repositoryLinkSetter(state),
    ...progressSheetLinkSetter(state),
  };
};

const nextDayStarter = (state: GameControllerState) => ({
  startNextDay: () => {
    if (state.game.currentDay === 25) {
      throw new Error("It's already Christmas (Day 25)!!!");
    }
    if (state.game.currentDay !== 0 && !state.game.currentDayCompleted) {
      throw new Error(
        `Day ${state.game.currentDay} has not been completed yet`,
      );
    }
    state.game.currentDay += 1;
    currentDayCompletionStatusSetter(state).setCurrentDayCompletionStatus(
      false,
    );
    return state.game;
  },
});

const currentDayCompletionStatusSetter = (state: GameControllerState) => ({
  setCurrentDayCompletionStatus: (completed: boolean) => {
    state.game.currentDayCompleted = completed;
    return state.game;
  },
});

const rankAwarder = (state: GameControllerState) => ({
  awardRank: async () => {
    const ranks = await getAllRanks();
    const sortedRanks = ranks.sort((a, b) => b.minimumScore - a.minimumScore);
    for (let i = 0; state.game.rankId === null; i++) {
      if (state.game.score >= sortedRanks[i].minimumScore) {
        state.game.rankId = sortedRanks[i].id;
      }
    }
    return state.game;
  },
});

const currentDayCompleter = (state: GameControllerState) => ({
  completeCurrentDay: () => {
    if (state.game.currentDayCompleted === true) {
      throw new Error(
        `Current day (${state.game.currentDay}) already completed`,
      );
    }
    if (state.game.currentDay === 25) {
      rankAwarder(state).awardRank();
    }
    state.game = currentDayCompletionStatusSetter(state)
      .setCurrentDayCompletionStatus(true);
    return state.game;
  },
});

const currentRerollTokensAdjuster = (state: GameControllerState) => ({
  adjustCurrentRerollTokens: (amount: number) => {
    state.game.currentRerollTokens += amount;
    scoreCalculator(state).calculateScore();
    console.log("state.game.score", state.game.score);
    return state.game;
  },
});

const rerollTokenSpender = (state: GameControllerState) => ({
  spendRerollTokens: (
    amount: number,
    round2: boolean,
    tokensAlreadySpentDuringRound2: number,
  ) => {
    currentRerollTokensAdjuster(state).adjustCurrentRerollTokens(-amount);
    state.game.rerollTokensSpent += amount;
    if (round2) {
      state.game.rerollTokensSpentDuringPart2Raw += amount;
      state.game.rerollTokensSpentDuringPart2Limited += Math.min(
        amount,
        Math.max(
          2 - tokensAlreadySpentDuringRound2,
          0,
        ),
      );
    }
    return state.game;
  },
});

const nameSetter = (state: GameControllerState) => ({
  setName: (newName: string) => {
    if (newName.length > 24) {
      throw new Error("Name cannot be longer than 24 characters");
    }
    if (newName.length < 1) {
      throw new Error("Name cannot be empty");
    }
    state.game.name = newName;
    return state.game;
  },
});

const playerNameSetter = (state: GameControllerState) => ({
  setPlayerName: (newPlayerName: string) => {
    if (newPlayerName.length > 24) {
      throw new Error("Player name cannot be longer than 24 characters");
    }
    if (newPlayerName.length < 1) {
      throw new Error("Player name cannot be empty");
    }
    state.game.playerName = newPlayerName;
    return state.game;
  },
});

const repositoryLinkSetter = (state: GameControllerState) => ({
  setRepositoryLink: (newRepositoryLink: string) => {
    if (newRepositoryLink.length > 255) {
      throw new Error("Repository link cannot be longer than 255 characters");
    }
    state.game.repositoryLink = newRepositoryLink;
    return state.game;
  },
});

const progressSheetLinkSetter = (state: GameControllerState) => ({
  setProgressSheetLink: (newProgressSheetLink: string) => {
    if (newProgressSheetLink.length > 255) {
      throw new Error(
        "Progress sheet link cannot be longer than 255 characters",
      );
    }
    state.game.progressSheetLink = newProgressSheetLink;
    return state.game;
  },
});

const scoreCalculator = (state: GameControllerState) => ({
  calculateScore: () => {
    if (state.game.rerollTokensSpentDuringPart2Limited === 50) {
      const tokensSpentDuringPart1 = state.game.rerollTokensSpent -
        state.game.rerollTokensSpentDuringPart2Raw;
      state.game.score = 1120 + 10 * state.game.currentRerollTokens -
        10 * tokensSpentDuringPart1;
      return state.game.score;
    }
    let fewRerollsBonus = 0;
    if (state.game.dateCompleted) {
      fewRerollsBonus = Math.max(300 - 10 * state.game.rerollTokensSpent, 0);
    }
    const part2RerollBonus = 20 *
      state.game.rerollTokensSpentDuringPart2Limited;
    state.game.score = 10 * state.game.currentRerollTokens + part2RerollBonus +
      fewRerollsBonus;
    return state.game.score;
  },
});
