import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from "@builder.io/qwik";
import styles from "./day.css?inline";
import { serverFetcher } from "~/util/serverFetcher";
import type { DayInfo } from "~/types";
import {
  useLocation,
  type DocumentHead,
  type RequestHandler,
} from "@builder.io/qwik-city";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import DayViewer from "~/components/game/day/dayViewer";

let dayInfo: DayInfo | null;

export const onRequest: RequestHandler = (event) => {
  event.cookie.set("gameNumber", event.params.gameNumber, {
    path: "/",
    secure: true,
  });
  const dayInfoString = event.cookie.get("dayInfo")?.value || null;
  if (dayInfoString) {
    dayInfo = JSON.parse(dayInfoString);
  }
};

export default component$(() => {
  useStylesScoped$(styles);

  const gameId = useLocation().params.id;
  const dayNumber = useLocation().params.dayNumber;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [getYear, setYear] = useLocalStorage("year", 2014);

  const state = useStore({
    gameId,
    dayNumber,
    dayInfo,
  });

  const dayInfoDataResource = useResource$<any>(async ({ cleanup }) => {

    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));
    const gameData = await serverFetcher(`game/public/${gameId}/simple`, "GET");
    const dayData = await serverFetcher(`game/public/${gameId}/day/${dayNumber}`, "GET");
    let rerollTokensEarned = 0;
    if (dayData.modifierWhenPart1CompletedId) {
      rerollTokensEarned += 1;
    }
    if (dayData.part2Completed && dayData.challengeModifierId) {
      rerollTokensEarned += 1;
    }
    const dayInfoData = {
      year: gameData.year,
      gameName: gameData.name,
      dayNumber: dayData.number,
      username: gameData.User.username,
      oauthAvatarUrl: gameData.User.oauthAvatarUrl,
      repositoryLink: gameData.repositoryLink
        ? gameData.repositoryLink
        : "None",
      challengeModifier: dayData.challengeModifierId
        ? dayData.ChallengeModifier.text
        : "None",
      challengeModifierExplanatoryUrl: dayData.challengeModifierId
        ? dayData.ChallengeModifier.explanatoryUrl
          ? dayData.ChallengeModifier.explanatoryUrl
          : "None"
        : "None",
      modifierOption: dayData.modifierOptionId
        ? dayData.ModifierOption.text
        : "None",
      modifierOptionExplanatoryUrl: dayData.modifierOptionId
        ? dayData.ModifierOption.explanatoryUrl
          ? dayData.ModifierOption.explanatoryUrl
          : "None"
        : "None",
      rerollTokensSpentDuringPart1:
        dayData.challengeModifierRerollsUsed * 2 +
        dayData.modifierOptionRerollsUsed -
        dayData.rerollTokensSpentDuringPart2,
      rerollTokensSpentDuringPart2: dayData.rerollTokensSpentDuringPart2,
      currentRerollTokens: gameData.currentRerollTokens,
      score: dayData.score,
      currentDay: gameData.currentDay,
      currentDayCompleted: gameData.currentDayCompleted,
      part1Completed: dayData.part1Completed || null,
      modifierWhenPart1Completed: dayData.modifierWhenPart1CompletedId
        ? dayData.ModifierWhenPart1Completed.text
        : "None",
      modifierWhenPart1CompletedExplanatoryUrl:
        dayData.modifierWhenPart1CompletedId
          ? dayData.ModifierWhenPart1Completed.explanatoryUrl
            ? dayData.ModifierWhenPart1Completed.explanatoryUrl
            : "None"
          : "None",
      optionWhenPart1Completed: dayData.optionWhenPart1CompletedId
        ? dayData.OptionWhenPart1Completed.text
        : "None",
      optionWhenPart1CompletedExplanatoryUrl: dayData.optionWhenPart1CompletedId
        ? dayData.OptionWhenPart1Completed.explanatoryUrl
          ? dayData.OptionWhenPart1Completed.explanatoryUrl
          : "None"
        : "None",
      part2Completed: dayData.part2Completed || null,
      number: dayData.number,
      dateFirstRolled: dayData.dateFirstRolled || null,
      rerollTokensEarned,
      gameIsPublic: gameData.isPublic,
      gameId: gameData.id,
    };
    state.dayInfo = dayInfoData;
    return dayInfoData;
  });

  useVisibleTask$(async () => {
    const dayInfoData = await dayInfoDataResource.value;
    setYear(dayInfoData.year);
  });

  return (
    <article>
      <br />
      <Resource
        value={dayInfoDataResource}
        onPending={() => {
          if (state.dayInfo) {
            return (
              <DayViewer
                publicViewerData={{
                  username: state.dayInfo.username,
                  oauthAvatarUrl: state.dayInfo.oauthAvatarUrl,
                }}
                dayInfoData={{
                  gameName: state.dayInfo.gameName,
                  gameId: state.dayInfo.gameId,
                  dayNumber: state.dayInfo.number,
                  year: state.dayInfo.year,
                  repositoryLink: state.dayInfo.repositoryLink,
                  challengeModifier: state.dayInfo.challengeModifier,
                  challengeModifierExplanatoryUrl:
                    state.dayInfo.challengeModifierExplanatoryUrl,
                  modifierOption: state.dayInfo.modifierOption,
                  modifierOptionExplanatoryUrl:
                    state.dayInfo.modifierOptionExplanatoryUrl,
                  dateFirstRolled:
                    state.dayInfo.dateFirstRolled.toDateString() || null,
                  rerollTokensSpentDuringPart1:
                    state.dayInfo.rerollTokensSpentDuringPart1,
                  rerollTokensSpentDuringPart2:
                    state.dayInfo.rerollTokensSpentDuringPart2,
                  currentRerollTokens: state.dayInfo.currentRerollTokens,
                  score: state.dayInfo.score,
                  currentDay: state.dayInfo.currentDay,
                  currentDayCompleted: state.dayInfo.currentDayCompleted,
                  part1Completed:
                    state.dayInfo.part1Completed?.toDateString() || null,
                  modifierWhenPart1Completed:
                    state.dayInfo.modifierWhenPart1Completed,
                  modifierWhenPart1CompletedExplanatoryUrl:
                    state.dayInfo.modifierWhenPart1CompletedExplanatoryUrl,
                  optionWhenPart1Completed:
                    state.dayInfo.optionWhenPart1Completed,
                  optionWhenPart1CompletedExplanatoryUrl:
                    state.dayInfo.optionWhenPart1CompletedExplanatoryUrl,
                  part2Completed:
                    state.dayInfo.part2Completed?.toDateString() || null,
                  rerollTokensEarned: 0,
                }}
              />
            );
          } else {
            return (
              <DayViewer
                publicViewerData={{
                  username: "Loading...",
                  oauthAvatarUrl: "",
                }}
                dayInfoData={{
                  gameName: "Loading...",
                  gameId: "1",
                  dayNumber: 0,
                  year: 2015,
                  repositoryLink: "None",
                  challengeModifier: "Loading...",
                  challengeModifierExplanatoryUrl: "None",
                  modifierOption: "Loading...",
                  modifierOptionExplanatoryUrl: "None",
                  dateFirstRolled: null,
                  rerollTokensSpentDuringPart1: 0,
                  rerollTokensSpentDuringPart2: 0,
                  currentRerollTokens: 0,
                  score: 0,
                  currentDay: 0,
                  currentDayCompleted: false,
                  part1Completed: null,
                  modifierWhenPart1Completed: "Loading...",
                  modifierWhenPart1CompletedExplanatoryUrl: "None",
                  optionWhenPart1Completed: "Loading...",
                  optionWhenPart1CompletedExplanatoryUrl: "None",
                  part2Completed: null,
                  rerollTokensEarned: 0,
                }}
              />
            );
          }
        }}
        onResolved={(dayInfoData) => {
          if (+dayInfoData.numberOfGames < 1) {
            return (
              <p>
                Day not found - please try again or{" "}
                <a href="/new">°start a new game!°</a>
              </p>
            );
          }

          return (
            <DayViewer
              dayInfoData={dayInfoData}
              publicViewerData={{
                oauthAvatarUrl: dayInfoData.oauthAvatarUrl,
                username: dayInfoData.username,
              }}
            />
          );
        }}
      />
    </article>
  );
});

export const head: DocumentHead = {
  title: "Xtreme Xmas Code - Day Viewer",
  meta: [
    {
      name: "description",
      content:
        "Xtreme Xmas Code - an invigorating twist on your favorite advent calendar",
    },
  ],
};
