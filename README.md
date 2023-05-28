## frontend

### Restore packages
```
yarn
```

### Start development server
```
yarn dev
```

**Note**: There are a few environment variables that need to be set in order to run the development server. See the [`.env.dist`](.env.dist) file for more details.

For example, this project has a pre-configured mocks via [Faker](https://fakerjs.dev/) and [Mock Service Worker](https://mswjs.io/). To enable them, set `VITE_MOCKS` to `true` in your `.env` file.

### Compiles and minifies for production
```
yarn build
```
