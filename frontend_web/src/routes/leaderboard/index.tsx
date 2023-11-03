// import type { Session } from "@auth/core/types";
import { Resource, component$, useResource$, useStore } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import type { LeaderboardGame } from "~/types";
import { serverFetcher } from "~/util/serverFetcher";
// import { getGithubUserIdFromUserImage } from "~/util/getGithubUserIdFromUserImage";
// import { useAuthSession } from "../plugin@auth";

let leaderboardGames: LeaderboardGame[] | null = null;

export const onRequest: RequestHandler = (event) => {
  const leaderboardGamesString =
    event.cookie.get("leaderboardGames")?.value || null;
  if (leaderboardGamesString) {
    leaderboardGames = JSON.parse(leaderboardGamesString);
  }
};

export default component$(() => {
  // const session = useAuthSession();
  // const userId = getGithubUserIdFromUserImage(session.value!.user!.image!);
  const state = useStore({
    leaderboardGames,
  });

  const leaderboardGamesResource = useResource$<any>(
    async ({ track, cleanup }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const leaderboardGames = track(() => state.leaderboardGames);

      const abortController = new AbortController();
      cleanup(() => abortController.abort("cleanup"));
      const leaderboardGamesData: LeaderboardGame[] = await serverFetcher(
        `leaderboard`,
        "GET"
      );
      state.leaderboardGames = leaderboardGamesData;
      return leaderboardGamesData;
    }
  );

  return (
    <article>
      <h1>Leaderboard</h1>
      <p>
        <em>Under Construction!</em>
      </p>
      <ul>
        <li>
          Rank - Year - Game Name - Score - Title - Player Name - Repo Link
        </li>
        <Resource
          value={leaderboardGamesResource}
          onPending={() => {
            return (
              <>
                {" "}
                {!state.leaderboardGames ? (
                  <li>Loading...</li>
                ) : state.leaderboardGames.length < 1 ? (
                  <li>No games currently recorded for this leaderboard</li>
                ) : (
                  <>
                    {state.leaderboardGames.map((game: LeaderboardGame) => (
                      <li key={`game-${game.id}`}>
                        {game.year} - {game.name} - {game.score} -{" "}
                        {game.Rank.name} - {game.playerName} -{" "}
                        <a href={`repositoryLink`}>°Repo Link°</a>
                      </li>
                    ))}
                  </>
                )}
              </>
            );
          }}
          onResolved={(leaderboardGamesData) => {
            if (leaderboardGamesData.length < 1) {
              return <li>No games currently recorded for this leaderboard</li>;
            }
            return (
              <>
                {leaderboardGamesData.map(
                  (game: LeaderboardGame, index: number) => (
                    <li key={`game-${game.id}`}>
                      <em>
                        {index + 1} - {game.year} -{" "}
                        <a href={`/game/public/${game.id}`}>°{game.name}°</a> -{" "}
                        {game.score} -{" "}
                        {game.Rank ? game.Rank.name : `Not Yet Completed`} -{" "}
                        {game.playerName} -{" "}
                        <a href={game.repositoryLink}>°Repo Link°</a>
                      </em>
                    </li>
                  )
                )}
              </>
            );
          }}
        />
      </ul>
    </article>
  );
});
