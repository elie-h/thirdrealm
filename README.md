# ThirdRealm

### Motivation

Third Realm is an exploration of an idea: A platform which hosts token gated social spaces with programmatic rules of engagement and discovery based on token ownership.

Communication across web3 communities is currently disjointed as discord/telegram servers are not contextual to user wallets and the tokens they hold. They are also plagued with spam, scammers and are quite disorganised. It’s also difficult to find and reach fellow holders of a token and find official announcements from the project maintainers.

Usecase examples:

Social:

- Bob wants to chat with other Bored Ape NFT owners ONLY - he connects his wallet and joins the Bored Ape chat room which verifies his membership via NFT ownership
- Dan is a maintainer of a DAO and wants to announce something to the community. He uses the platform to broadcast a signed message to all the holders of a token. Only the verified token holders receive the message and can verify that the message came from a DAO managed wallet address.

Discovery:

- Web3 Corp wants to hire a developer. The use the platform to search for wallet addresses which are open to contribute/interview AND have specific badges (nfts) indicating relevant qualifications
- Alice wants to buy a specific NFT, she uses the platform to reach out to the current owner to make a case and bid (potentially a trade) for that token

[Demo (Staging)](https://thirdrealm-staging.fly.dev/)

## The Stack

- [Multi-region Fly app deployment](https://fly.io/docs/reference/scaling/) with [Docker](https://www.docker.com/)
- [Multi-region Fly PostgreSQL Cluster](https://fly.io/docs/getting-started/multi-region-databases/)
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments
- Sign in with ethereum authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage) based on spruce.id
- Database ORM with [Prisma](https://prisma.io), multiregional postgres instance deployed on fly.io
- Styling with [Tailwind](https://tailwindcss.com/)
- End-to-end testing with [Cypress](https://cypress.io)
- Local third party request mocking with [MSW](https://mswjs.io)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

## Development

- Start the Postgres Database in [Docker](https://www.docker.com/get-started):

  ```sh
  npm run docker
  ```

  > **Note:** The npm script will complete while Docker sets up the container in the background. Ensure that Docker has finished and your container is running before proceeding.

- Initial setup:

  ```sh
  npm run setup
  ```

- Run the first build:

  ```sh
  npm run build
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.
