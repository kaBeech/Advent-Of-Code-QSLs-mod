import { component$ } from "@builder.io/qwik";
import { type DocumentHead, type RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = (event) => {
  throw event.redirect(302, `/game/1`);
};

export default component$(() => {
  return (
    <div>
      Oh! Looks like the redirect didn't work. Maybe try{" "}
      <a class="link" href="game/1">
        this link
      </a>
      ?
    </div>
  );
});

export const head: DocumentHead = {
  title: "Xtreme Xmas - Game   Viewer",
  meta: [
    {
      name: "description",
      content:
        "Xtreme Xmas - an invigorating twist on your favorite advent calendar",
    },
  ],
};
