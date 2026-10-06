# ALLN.dev

Node.js 22.15 or newer is required for the build tooling.

## Local development

Install the locked dependencies and start the development server:

```sh
npm ci
npm start
```

The development server watches the HTML, JavaScript, and Sass source files and refreshes the browser as they change.
It binds to `127.0.0.1`, so it is not exposed to the public network.

## Production build

Create the deployable website with:

```sh
npm ci
npm run build
```

Webpack recreates `dist/` on every production build. The generated `dist/` directory is committed so the built site can be deployed from the repository.

To check the production output locally, run:

```sh
npm run preview
```

## Hosting

The website document root must point to the generated `dist/` directory. If the repository is checked out at `public_html`, configure the domain's document root as `public_html/dist`.

Do not use the repository root as the public document root: its `index.html` and `js/app.js` files are source files and require webpack processing.
