import type { Session } from "@auth/core/types";
import { Resource, component$, useResource$, useStore } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import type { LeaderboardGame } from "~/types";
import { serverFetcher } from "~/util/serverFetcher";
// import { getGithubUserIdFromUserImage } from "~/util/getGithubUserIdFromUserImage";
// import { useAuthSession } from "../plugin@auth";

let leaderboardGames: LeaderboardGame[] | null = null;

export const onRequest: RequestHandler = (event) => {
  const session: Session | null = event.sharedMap.get("session");
  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(302, `/login`);
  }
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
      <Resource
        value={leaderboardGamesResource}
        onPending={() => {
          return (
            <p>
              <strong>
                {" "}
                {!state.leaderboardGames ? (
                  `Loading...`
                ) : state.leaderboardGames.length < 1 ? (
                  <h2>No games currently recorded for this leaderboard</h2>
                ) : (
                  <ul>
                    {state.leaderboardGames.map(
                      (game: {
                        id: string;
                        playerName: string;
                        name: string;
                        number: number;
                        year: number;
                        score: number;
                        rank: number;
                        repositoryLink: string;
                      }) => (
                        <li key={`game-${game.id}`}>
                          {game.year} - {game.name} - {game.score} - {game.rank}{" "}
                          - {game.playerName} -{" "}
                          <a href={`repositoryLink`}>Repo Link</a>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </strong>
            </p>
          );
        }}
        onResolved={(leaderboardGamesData) => {
          console.log("leaderboardGamesData", leaderboardGamesData);
          if (leaderboardGamesData.length < 1) {
            return <h2>No games currently recorded for this leaderboard</h2>;
          }

          return (
            <ul>
              <li>
                Rank - Year - Game Name - Score - Title - Player Name - Repo
                Link
              </li>
              <br />
              {leaderboardGamesData.map(
                (
                  game: {
                    id: string;
                    playerName: string;
                    name: string;
                    number: number;
                    year: number;
                    score: number;
                    rank: number;
                    repositoryLink: string;
                  },
                  index: number
                ) => (
                  <li key={`game-${game.id}`}>
                    <em>
                      {index + 1} - {game.year} - {game.name} - {game.score} -{" "}
                      {game.rank ? game.rank : `Not Yet Completed`} -{" "}
                      {game.playerName} -{" "}
                      <a href={game.repositoryLink}>Repo Link</a>
                    </em>
                  </li>
                )
              )}
            </ul>
          );
        }}
      />
    </article>
  );
});
