module.exports = {
  '**/*{.json,.graphql,.md,.css,.scss,.yml}': [`prettier --write`],
  '!(*generated)*.{js,ts,tsx}': [`prettier --write`],
};
