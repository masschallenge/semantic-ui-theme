/*******************************
          Build Task
*******************************/

var // dependencies
  gulp = require("gulp-help")(require("gulp")),
  runSequence = require("run-sequence"),
  rename = require("gulp-rename"),
  del = require("del"),
  // config
  config = require("./config/user"),
  install = require("./config/project/install"),
  // themes
  themes = require("../themes");
// task sequence
sequentialTasks = [];
parallelTasks = [];

// sub-tasks
if (config.rtl) {
  require("./collections/rtl")(gulp);
}
require("./collections/build")(gulp);

module.exports = function(callback) {
  parallelTasks.push("build-javascript");
  parallelTasks.push("build-assets");
  themes.forEach((theme) => {
    console.info(`Building Semantic ${theme}`);
    gulp.task(`copy theme ${theme}`, function() {
      return gulp
        .src(`./src/themes/${theme}/theme.config`)
        .pipe(gulp.dest("./src/"));
    });

    gulp.task(`build css ${theme}`, [`build-css`]);

    gulp.task(`rename css ${theme}`, [`build css ${theme}`], () =>
      gulp
        .src("./dist/semantic.min.css")
        .pipe(rename(`semantic.${theme}.min.css`))
        .pipe(gulp.dest("./dist/temp/"))
    );

    gulp.task(`copy output ${theme}`, function() {
      return gulp.src(`./dist/temp/*.css`).pipe(gulp.dest(`./dist/`));
    });

    if (!install.isSetup()) {
      console.error(
        'Cannot find semantic.json. Run "gulp install" to set-up Semantic'
      );
      return 1;
    }

    sequentialTasks.push(`copy theme ${theme}`);
    sequentialTasks.push(`rename css ${theme}`);
    sequentialTasks.push(`copy output ${theme}`);
  });
  gulp.task("clean", function() {
    return del("./dist/temp/**", { force: true });
  });

  runSequence(parallelTasks, ...sequentialTasks, ["clean"], callback);
};
