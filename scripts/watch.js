const path = require("path");
const gulp = require("gulp");
const requireDotFile = require("require-dot-file");
const execSync = require("child_process").execSync;
const cwd = process.cwd();
const config = requireDotFile(path.join(cwd, "semantic.json"));
const source = config.paths.source;

gulp.watch(
  [
    source.config,
    source.definitions + "/**/*.less",
    source.site + "/**/*.{overrides,variables}",
    source.themes + "/**/*.{overrides,variables}",
    source.themes + "/../theme-configs/*.config"
  ],
  function(file) {
    console.info("Changed: " + file.path);
    console.info("Rebuilding theme...");
    execSync("yarn run build");
    console.info("Done...");
  }
);
