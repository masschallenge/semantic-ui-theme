// Inspired by: https://github.com/semantic-ui-forest/forest-themes/blob/master/scripts/build.js
const fse = require("fs-extra");
const path = require("path");
const execSync = require("child_process").execSync;

const output_dir = "dist";
fse.ensureDirSync(path.join(output_dir, "semantic-ui"));

const cwd = process.cwd();
const semantic_ui_dir = path.join(cwd, "node_modules/semantic-ui");
const semantic_ui_backup_dir = path.join(
  cwd,
  "node_modules/semantic-ui-backup"
);

// backup `node_modules/semantic-ui`
fse.removeSync(semantic_ui_backup_dir);
fse.copySync(semantic_ui_dir, semantic_ui_backup_dir);
fse.copySync("semantic.json", path.join(semantic_ui_dir, "semantic.json"));

fse.copySync(
  "src/themes/masschallenge",
  path.join(semantic_ui_dir, "src/themes/masschallenge")
);

fse.copySync(
  "src/theme-configs/masschallenge.theme.config",
  path.join(semantic_ui_dir, "src/theme.config")
);

process.chdir(semantic_ui_dir);

process.stdout.write(`building MassChallenge theme...`);
execSync("gulp build-css");
process.stdout.write(`done.\n`);

fse.copySync(
  path.join("dist", "semantic.css"),
  path.join(cwd, output_dir, `semantic.masschallenge.css`)
);
fse.copySync(
  path.join("dist", "semantic.min.css"),
  path.join(cwd, output_dir, `semantic.masschallenge.min.css`)
);

process.chdir(cwd);

// restore `node_modules/semantic-ui`
fse.removeSync(semantic_ui_dir);
fse.copySync(semantic_ui_backup_dir, semantic_ui_dir);
fse.removeSync(semantic_ui_backup_dir);

process.chdir(cwd);
