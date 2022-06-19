module.exports = {
  schema: [
    {
      "http://localhost:8080/v1/graphql": {
        headers: {
          Authorization: "Bearer " + process.env.HASURA_ADMIN_KEY,
        },
      },
    },
  ],
  documents: ["./app/**/*.tsx", "./app/**/*.ts"],
  overwrite: true,
  generates: {
    "./app/data/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    "./app/data/graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
