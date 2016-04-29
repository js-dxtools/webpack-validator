# Contributing

**Working on your first Pull Request?** You can learn how from this *free* series
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

## Project structure

This project uses babel's [monorepo approach](https://github.com/babel/babel/blob/master/doc/design/monorepo.md); it also uses the monorepo bootstrapping tool [lerna](https://github.com/kittens/lerna) that the babel repo uses. This allows rather painless modularization without duplicating test / infra each time a new module is added.

Basically, each npm package we publish has a folder beneath `packages`. Publishing is done manually by incrementing the version in the `VERSION` file and running `npm run publish` (for more info about this visit the [lerna README](https://github.com/kittens/lerna)). We'll see how this works out. :)

## Setup
1. Fork and clone the repo
2. `$ npm run bootstrap` to set everything up and validate the setup is working
3. Create a branch for your PR

### Testing workflow
Have a look at `test/README.md` to see how testing works. Run `npm run watch:test` while developing. Have fun! :)

## Editor setup

Please install [editorconfig plugin](http://editorconfig.org/#download) for your preferred editor.

## Committing and Pushing changes

We follow [a convention](https://github.com/stevemao/conventional-changelog-angular/blob/master/convention.md)
for commit messages. Please follow this convention for your commit messages.

You can use `commitizen` to help you to follow [the convention](https://github.com/stevemao/conventional-changelog-angular/blob/master/convention.md)

Once you are ready to commit the changes, please use the below commands

1. `git add <files to be comitted>`
2. `$ npm run commit`

... and follow the instruction of the interactive prompt.
