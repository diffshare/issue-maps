gulp = require "gulp"
$ = require("gulp-load-plugins")()
mainBowerFiles = require "main-bower-files"
source = require "vinyl-source-stream"
browserify = require "browserify"
fs = require "fs"
aws = JSON.parse fs.readFileSync("aws.json")

files =
  slim: "src/**/*.slim"
  coffee: "src/**/*.coffee"
  sass: "src/**/*.sass"
  #bower: "bower_components/**/*"
  bower: [
    "./bower_components/moment/locale/ja.js",
    "./bower_components/angular-scroll/angular-scroll.js"
  ]

gulp.task "slim", ->
  gulp.src files.slim
  .pipe $.slim
    pretty: true
  .pipe gulp.dest "bin"
  .pipe $.connect.reload()

gulp.task "coffee", ->
  browserify
    entries: ["./src/app.coffee"]
    extensions: [".coffee", ".js"]
    debug: true
  .transform "coffeeify"
  .bundle()
  .pipe source "app.js"
  .pipe gulp.dest "bin/js"
  ###
  gulp.src files.coffee
  .pipe $.coffee()
  .pipe gulp.dest "bin/js"
  .pipe $.connect.reload()
  ###

gulp.task "vendor", ->
  gulp.src mainBowerFiles().concat files.bower
  .pipe $.concat("vendor.js")
  .pipe gulp.dest "bin/js"

  gulp.src ["bower_components/onsenui/build/css/**"]
  .pipe gulp.dest "bin/css"

gulp.task "sass", ->
  gulp.src files.sass
  .pipe $.rubySass()
  .pipe gulp.dest "bin/css"
  .pipe $.connect.reload()

gulp.task "bower", ->
  gulp.src files.bower
  .pipe gulp.dest "bin/bower_components"

gulp.task "s3", ["build"], ->
  gulp.src "bin/**"
  .pipe $.s3(aws)

gulp.task "build", ["slim", "coffee", "sass", "vendor"]

gulp.task "watch", ["build"], ->
  gulp.watch files.slim, ["slim"]
  gulp.watch files.coffee, ["coffee"]
  gulp.watch files.sass, ["sass"]

gulp.task "connect", ->
  $.connect.server(
    root: "bin"
    port: 8000
    livereload: true
  )

gulp.task "default", ["watch", "connect"]
