# Semantic UI Customizations #

This repository contains custom styling to be used across all our applications i.e. accelerate and the front-end applications

## Setup ##

- Ensure you have cloned this repository following the [directory structure](https://github.com/masschallenge/standards/blob/master/set_up_development_environment.md#installation) specified.

- From inside the cloned repo, run

      npm  install

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
