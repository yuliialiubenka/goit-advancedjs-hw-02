# Advanced JavaScript Homework 2

Multi-page vanilla JavaScript project prepared for the Timer and Snackbar homework tasks.
The timer uses `flatpickr` for date selection and both tasks use `iziToast` for notifications.

## Project structure

```text
src/
├── css/
│   ├── base.css
│   ├── home.css
│   ├── reset.css
│   ├── snackbar.css
│   ├── styles.css
│   └── timer.css
├── img/
├── js/
│   ├── 1-timer.js
│   └── 2-snackbar.js
├── 1-timer.html
├── 2-snackbar.html
└── index.html
```

## Getting started

Make sure that the LTS version of [Node.js](https://nodejs.org/) is installed, then run:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. The available pages are:

- `/` - home page;
- `/1-timer.html` - timer task;
- `/2-snackbar.html` - snackbar task.

## Available commands

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the development server.         |
| `npm run build`   | Create a production build in `dist`.  |
| `npm run preview` | Preview the production build locally. |

The development server reloads the page whenever you save a source file.

## Features

- Timer page with a cross-browser date and time picker, countdown display, and validation
  for dates in the future.
- Snackbar page with fulfilled and rejected promises based on the selected delay and state.
- Shared CSS variables and base styles, with page-specific styles imported through
  `src/css/styles.css`.
