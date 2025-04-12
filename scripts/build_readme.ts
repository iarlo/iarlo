interface Repository {
    name: string;
    description: string;
    html_url: string;
    language: string;
    owner: { avatar_url: string; html_url: string };
}

interface APIError {
    message?: string;
    documentation_url?: string;
}

const buildReadme = async () => {
    const user = "iarlo";
    try {
        const response = await fetch(`https://api.github.com/users/${user}/repos`);
        const data: Repository[] = await response.json();

        if (!data || (data as APIError).message) return;

        const emojiRegex = /^([\p{Emoji_Presentation}\u200d]{1,4})/u;
        const filtered = data?.filter(repo => repo.description?.match(emojiRegex));

        const projects = filtered.map(repo => {
            const emojis = emojiRegex.exec(repo.description)?.join('') || '';
            return `* [${emojis?.slice(0, emojis.length / 2)} ${repo.name} | ${repo.description.slice(emojis.length / 2 + 3)}](https://github.com/${user}/${repo.name})`;
        })

        const model = await Bun.file("./scripts/readme_model.md");
        await Bun.write("./README.md", await model.text() + "\n\n### Meus projetos\n" + projects?.join("\n"));
    } catch (error) {
        console.log(error);
    }

}

buildReadme();