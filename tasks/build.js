/*******************************
          Build Task
*******************************/

var // dependencies
  gulp = require("gulp-help")(require("gulp")),
  runSequence = require("run-sequence"),
  rename = require("gulp-rename"),
  // config
  config = require("./config/user"),
  install = require("./config/project/install"),
  // task sequence
  tasks = [];

// sub-tasks
if (config.rtl) {
  require("./collections/rtl")(gulp);
}
require("./collections/build")(gulp);

const themes = ["masschallenge", "staff"];

module.exports = function(callback) {
  tasks.push("build-javascript");
  tasks.push("build-assets");
  themes.forEach((theme) => {
    console.info(`Building Semantic ${theme}`);
    gulp.task(`copy theme ${theme}`, function() {
      return gulp
        .src(`./src/themes/${theme}/theme.config`)
        .pipe(gulp.dest("./src/"));
    });

    gulp.task(`build css ${theme}`, [`build-css`]);

    gulp.task(`rename css ${theme}`, () =>
      gulp
        .src("./dist/semantic.min.css")
        .pipe(rename(`semantic.${theme}.min.css`))
        .pipe(gulp.dest("./dist/"))
    );

    gulp.task(`copy output ${theme}`, [`build css ${theme}`], function() {
      return gulp.src(`./dist/**/*.css`).pipe(gulp.dest(`./dist/${theme}`));
    });

    if (!install.isSetup()) {
      console.error(
        'Cannot find semantic.json. Run "gulp install" to set-up Semantic'
      );
      return 1;
    }

    tasks.push(`copy theme ${theme}`);
    tasks.push(`rename css ${theme}`);
    tasks.push(`copy output ${theme}`);
  });

  runSequence(...tasks, callback);
};
