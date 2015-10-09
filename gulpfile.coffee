gulp = require "gulp"
$ = require("gulp-load-plugins")()
del = require "del"
fs = require "fs"
packageJson = require "./package.json"

#browserify = require "browserify"
#watchify = require "watchify"
watchify = require "gulp-watchify"
source = require "vinyl-source-stream"

gulp.task "build", [
  "build:browserify"
  "build:slim"
  "build:sass"
  "build:static"
  "build:bower"
]
gulp.task "build:pre", [
  #"build:coffee"
  "build:ts"
]

gulp.task "build:coffee", ->
  gulp.src "src/js/**/*.coffee"
  .pipe $.coffee()
  .pipe gulp.dest("lib")

gulp.task "build:ts", ->
  gulp.src "src/js/**/*.ts"
  .pipe $.typescript
    target:"es6"
    module:"commonjs"
    sortOutput: true
    experimentalAsyncFunctions: true
  .pipe $.babel
    optional: ["runtime"]
  .pipe gulp.dest("lib")

watching = false
gulp.task "enable-watch-mode", -> watching = true

gulp.task "build:browserify", ["build:pre"], watchify (watchify)->
  gulp.src "./lib/Application.js"
  .pipe watchify
    watch: watching
  .pipe gulp.dest "public/js"

gulp.task "build:slim", ->
  gulp.src "src/html/**/*.slim"
  .pipe $.slim()
  .pipe gulp.dest("public")

gulp.task "build:sass", ->
  gulp.src "src/css/**/*.sass"
  .pipe $.rubySass()
  .pipe gulp.dest("public/css")

gulp.task "build:bower", ->
  gulp.src "bower_components/**/*"
  .pipe gulp.dest "public/bower_components"

gulp.task "build:static", ->
  gulp.src "src/assets/**/*"
  .pipe gulp.dest "public/assets"

gulp.task "connect", ->
  console.log $.connect
  $.connect.server
    root: "public"
    host: "0.0.0.0"
    port: 80
    livereload: true

gulp.task "electron", ->
  gulp.src ""
  .pipe $.electron
    src: "./public"
    packageJson: packageJson
    release: "./release"
    cache: "./cache"
    version: "v0.33.0"
    packaging: true
    platforms: ["win32-ia32"]
    platformResources:
      win:
        "version-string": packageJson.version
        "file-version": packageJson.version
        "product-version": packageJson.version
  .pipe gulp.dest ""

gulp.task "watch", ["build", "enable-watch-mode", "connect"], ->
  #gulp.watch "./src/js/**/*.coffee", ["build:coffee"]
  gulp.watch "./src/js/**/*.ts",      ["build:ts"]
  gulp.watch "./src/html/**/*.slim",    ["build:slim"]
  gulp.watch "./src/css/**/*.sass",    ["build:sass"]

gulp.task "default", ["build"]

gulp.task "clean", del.bind(null, ["lib/*", "public/*"])

gulp.task "s3", ["build"], ->
  aws = JSON.parse fs.readFileSync("aws.json")
  gulp.src "public/**"
  .pipe $.s3(aws)
