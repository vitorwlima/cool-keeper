<h1 align="center">Cool Keeper</h1>

<p align="center">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/vitorwlima/cool-keeper?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/vitorwlima/cool-keeper?color=56BEB8">

  <img alt="Github issues" src="https://img.shields.io/github/issues/vitorwlima/cool-keeper?color=56BEB8" />

  <img alt="Github forks" src="https://img.shields.io/github/forks/vitorwlima/cool-keeper?color=56BEB8" />

  <img alt="Github stars" src="https://img.shields.io/github/stars/vitorwlima/cool-keeper?color=56BEB8" />
</p>

<!-- Status -->

<!-- <h4 align="center"> 
	🚧  Cool Keeper 🚀 Under construction...  🚧
</h4> 

<hr> -->

## :dart: About ##

Cool keeper is the modern password manager we have been looking for. Built using the latest technologies from the web development world, it's goal is to provide the users a safe place to store their passwords with a great UX and beautiful UI (work in progress). The idea is to achieve this by building a highly interactive open source environment where people can contribute adding features and fixing bugs.

## :rocket: Technologies ##

The following tools were used in this project:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [tRPC](https://trpc.io/)
- [Planetscale](https://planetscale.com/)
- [NextAuth](https://next-auth.js.org/)

## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com), [Node](https://nodejs.org/en/) and [PnpM](https://pnpm.io/) installed.

## :checkered_flag: Contributing ##

Clone the project:

```bash
# Clone this project
$ git clone https://github.com/vitorwlima/cool-keeper

# Access
$ cd cool-keeper

# Install dependencies
$ pnpm install

# Run the project
$ pnpm run dev

# The server will initialize in the <http://localhost:3000>
```

Setup your .env file:

```typescript
DATABASE_URL=your_planetscale_db_url
PASSWORD_HASH=random_string
```

> The DB section is optional, and you can make it run locally while developing if that is better for you.

After that, you are ready to start working on the project. Feel free to pick any open issues or open new ones that you feel are important. The flow is standard: you need to create a separate branch and then create a pull request into `main` branch. Also, when commiting it is recommended to use [this convention](https://dev.to/i5han3/git-commit-message-convention-that-you-can-follow-1709).

## :memo: License ##

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.


Made with :heart: by <a href="https://github.com/vitorwlima" target="_blank">Vitor Lima</a>

&#xa0;

<a href="#top">Back to top</a>
