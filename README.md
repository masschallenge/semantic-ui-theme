# Semantic UI Customizations #

This repository contains custom styling to be used across all our applications i.e. accelerate and the front-end applications

## Prerequisites ##

### Node ###

- Confirm you have node installed by running `node -v`. Any version above or equal to 8 is known to work just fine. If a version number is not printed, go to the next step.

- If you didn't get a version number above, [install node](https://nodejs.org/en/download/) and confirm with a `node -v` once the install is complete.

### Gulp ###

- Confirm you have gulp globally installed by running `gulp -v`. A positive result is seeing a `CLI` and `Local` version printed

- If you don't have gulp installed, run `npm install --global gulp`. Confirm it has installed successfully with the step before this.

## Setup ##

- Ensure you have cloned this repository following the [directory structure](https://github.com/masschallenge/standards/blob/master/set_up_development_environment.md#installation) specified.

- From inside the cloned repo, run

      npm  install

- The `npm install`, as of this writing, will warn of vulnerable packages installed

      added 891 packages from 454 contributors and audited 9790 packages in 67.378s
      found 5 vulnerabilities (1 low, 4 high)
  - This is a known and expected issue that we don't have control over.

- You should be able to run `gulp build` and `gulp watch`

## What does what ##

- `gulp build`
  - This takes every theme based on the `theme.config` file and creates (or populates) a `dist` directory with `font`, `image` `css` and `js` assets for every component in semantic.
  - It also builds general `css` and `js` assets (both minified and pretty) containing styling and behaviour for every component
  - This is great for generating production asseets.

- `gulp watch`
  - This keeps track of your `src` folder, any changes made in it automatically triggers a build on the components and themes affected.
  - This is perfect for development.

## Where is what ##

- src/themes/masschallenge
  - This contains our custom theme

- src/theme.config
  - This is where we define what our custom styles will apply to i.e. buttons, modals, checkboxes

- dist/
  - Output js and css to be used on web pages are built into this directory
