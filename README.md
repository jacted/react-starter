# React Starter

Sample app using React, Redux, and Webpack 2.

## Contains

- [x] [Webpack 2.2](https://webpack.github.io)
- [x] [React](https://facebook.github.io/react/)
- [x] [Redux](http://redux.js.org/)
- [x] [Babel](https://babeljs.io/)

## Structure

```
scripts/
  create_actions.js     # Node script for scaffolding actions
src/
  actions/
    Auth/               # Each action folder will have its own index.js with actions and reducer.js
      index.js
      reducer.js
  components/
    Button/             # Each component will have its own index.js and index.scss
      index.js
      index.scss
  containers/           
    App/
      index.js          # Main container
  scenes/               # Where all the pages will be stored
    Auth/
      scenes/           # Grouping scenes under Auth
        Login/
          index.js
        Register/       # Each scene can have index.js and index.scss
          index.js      
          index.scss
    NoMatch/
      index.js          # Single scene, not grouped like Auth
  store
    index.js
    reducers.js         # This is where all the reducers will be imported and combined.
  styles/               # Styles that is global to the application
    main.scss
  utils/                
    auth.js
  index.html
  index.js
  routes.js             # Routes will be defined here
```

## Add a reducer

Example name: Messages

1. `$ yarn create:action Messages`
2. Open `src/store/reducers.js` and `import messagesReducer from 'actions/Messages/reducer'`
3. Add `messages: messagesReducer` to `combineReducers`

## Setup

```
$ yarn
```

## Running in dev mode

```
$ yarn start
```

## Running in production mode

```
$ yarn prod
```

## Build (production)

```
$ yarn build
```

# License

[MIT](LICENSE.md)
