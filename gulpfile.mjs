import { readFileSync } from "fs";
import gulp from "gulp";
import { src, dest, watch } from "gulp";
import ts from "gulp-typescript";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import { deleteAsync as del } from "del";
import browserSync from "browser-sync";
import terser from "gulp-terser";
import cleanCSS from "gulp-clean-css";
import replace from "gulp-replace";

const pkg = JSON.parse(readFileSync("./package.json"));
const isProd = process.env.NODE_ENV === "production";

const tsProject = ts.createProject("tsconfig.json");
const sass = gulpSass(dartSass);

const paths = {
  styles: {
    src: "MiniProgram/**/*.scss",
    dest: "dist/",
  },
  scripts: {
    src: "MiniProgram/**/*.ts",
    dest: "dist/",
  },
  misc: {
    src: "MiniProgram/**/*{.js,.wxml,.json}",
    dest: "dist/",
  },
};

/*
 * For small tasks you can export arrow functions
 */
export const clean = () => del(["dist/**/*", "!dist"]);

/*
 * You can also declare named functions and export them as tasks
 */
export function styles() {
  const stream = src(paths.styles.src)
    .pipe(sass())
    .pipe(
      rename(function (path) {
        path.extname = ".wxss"; // Change extension from .css to .wxss
      })
    );

  if (isProd) {
    stream.pipe(cleanCSS());
  }

  return stream.pipe(dest(paths.styles.dest));
}

export function scripts() {
  const stream = src(paths.scripts.src)
    .pipe(tsProject())
    .js
    .pipe(replace("__VERSION__", pkg.version));

  if (isProd) {
    stream.pipe(terser({
      compress: true,
      mangle: true
    }));
  }

  return stream.pipe(dest(paths.scripts.dest));
}

export function miscs() {
  return src(paths.misc.src).pipe(dest(paths.misc.dest));
}

function watchFiles() {
  watch(paths.scripts.src, scripts);
  watch(paths.styles.src, styles);
  watch(paths.misc.src, miscs);
}
export { watchFiles as watch };

gulp.task("serve", () => {
  browserSync.init({ server: "./", open: false, notify: false });
});

const build = gulp.series(
  clean,
  gulp.parallel(styles, scripts, miscs),
  gulp.parallel(watchFiles, "serve"),
);

export default build;
