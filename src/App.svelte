<script lang="ts">
  import { derived, writable } from "svelte/store";
  import { onMount } from "svelte";
  import Paragraph from "./lib/Paragraph.svelte";

  interface Repository {
    name: string;
    description: string;
    html_url: string;
    language: string;
    owner: { avatar_url: string; html_url: string };
  }

  const user = "iarlo";
  const repositories = writable<Repository[]>([]);
  const links = derived(repositories, ($repo) => [
    $repo[0]?.owner.html_url,
    "https://instagram.com/mioj.otomatesuave",
    "mailto:iarlo.sa@dcomp.ufs.br",
  ]);

  onMount(async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${user}/repos`,
      );
      const data = await response.json();
      repositories.set(
        data.filter(
          (repo: Repository) =>
            repo.name !== user && repo.description?.match(/^\p{Emoji}/u),
        ),
      );
    } catch (error) {
      console.log(error);
    }
  });
</script>

<main class="max-w-2xl mx-auto pt-32 pb-16 flex max-md:flex-col">
  <section
    class="max-w-md mx-auto gap-2 [&_p]:text-xs [&_p]:text-justify [&_p]:text-white/50 grid grid-cols-[calc(var(--spacing)_*_40),_1fr] gap-x-6 md:max-w-40 md:flex md:flex-col"
  >
    <section class="w-40 h-40 col-auto row-span-2 bg-white/20 rounded-md">
      <img
        src={$repositories[0]?.owner.avatar_url}
        alt="Avatar"
        class="rounded-md grayscale-100"
        loading="lazy"
        decoding="async"
      />
    </section>
    <section class="inline-flex flex-col col-start-2">
      {#each $links as link}
        <a href={link} target="_blank" class="text-xs text-white/80 truncate"
          >{link}</a
        >
      {/each}
    </section>
    <section class="inline-flex flex-col col-start-2 row-start-2 gap-2">
      <p>JAVA KOTLIN JAVASCRIPT TYPESCRIPT C GO RUST SQL</p>
      <p>REACT SVELTE VUE FLUTTER NEXT TAILWINDCSS ZUSTAND</p>
      <p>
        BUN NODE NEST EXPRESS GRAPHQL POSTGRES SQLITE MYSQL MONGO DOCKER WSL AWS
        GCP AZURE
      </p>
    </section>
  </section>
  <section class="max-w-md mx-auto flex flex-col gap-5">
    <h1 class="text-2xl">Olá, sou {user}</h1>

    <Paragraph
      >Meu nome é Bruno Sá, tenho 21 anos e atualmente sou estudante de ciência
      da computação na Universidade Federal de Sergipe (UFS). Comecei a me
      apaixonar por programação aos 12 anos, e atualmente estou em um
      relacionamento sério com Typescript e C; geralmente tento encontrar
      soluções elegantes, mas funcionais para problemas reais. Gosto de músicas,
      séries e gatinhos.</Paragraph
    >
    <h2 class="text-xl">Meus projetos</h2>

    <Paragraph
      >Adoro desafios com propósitos criativos, e sempre estou disposto a
      aprender novas tecnologias. Meus projetos sintetizam bem minhas
      habilidades e conhecimentos atuais.</Paragraph
    >

    <ul class="gap-8 flex flex-col">
      {#each $repositories as repository}
        <li>
          <a
            href={repository.html_url}
            target="_blank"
            class="flex flex-col gap-2"
          >
            <section class="inline-flex items-center justify-between">
              <h3 class="text-md">{repository.name}</h3>
              <span class="text-xs text-white/80">{repository.language}</span>
            </section>
            <Paragraph size="xs">{repository.description}</Paragraph>
          </a>
        </li>
      {/each}
    </ul>
  </section>
</main>

<style>
  @font-face {
    font-family: "Red Hat Mono", monospace;
    src: url("./assets/RedHatMono-VariableFont_wght.ttf") format("truetype");
  }

  :root {
    font-family: "Red Hat Mono", monospace;
    font-size: 1rem;
    font-optical-sizing: auto;
    font-style: normal;
    color: white;
    background-color: black;
  }

  h1,
  h2,
  h3 {
    font-weight: bold;
  }

  h1,
  h2 {
    padding: 0.5rem 0;
  }
</style>
