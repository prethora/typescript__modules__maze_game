# Escape The Abyss

## Prerequisites

* NodeJS Version 16

## Install

```bash
npm install
```

## Run in development mode

```bash
npm start
```

## Build for production

```bash
npm run build
```

Will output to the `dist` directory.

## Configuring in production 

Edit the object at the top of the `index.html` file:

```javascript
{
    playerVisibilityRadius: 3,
    lanternVisibilityRadius: 5,
    stepsPerMaze: 150,
    lanternsPerMaze: 2,
    gameOverFlashCount: 3  //set to -1 to flash indefinitely
}
```

## Configuring in development mode

Edit the object at the top of the `play/index.html.ejs` file.

(See object above).