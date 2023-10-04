import { GameController } from "../../components/GameController.ts";
import { createDay, getGamesByUserId, updateGame } from "../../db.ts";

export const startNextDay = async (ctx: any) => {
  const { gameNumber, dayNumber } = ctx.params;
  const userId = ctx.state.session.get("userId") as string;
  const games = await getGamesByUserId(userId);
  const game = games.find((game) => game.number === +gameNumber);
  console.log(
    "user",
    userId,
    "games",
    games,
    "game",
    game,
    "gameNumber",
    gameNumber,
  );
  if (game!.currentDay !== dayNumber - 1) {
    throw new Error(
      `Requested to start Day ${dayNumber}, but current Day is ${
        game!.currentDay
      }`,
    );
  }
  const updatedGame = GameController(game!).startNextDay();
  const nextDay = await createDay(
    updatedGame.userId,
    updatedGame.id,
    updatedGame.number,
    updatedGame.currentDay,
  );
  await updateGame(updatedGame);
  ctx.response.body = nextDay;
};
