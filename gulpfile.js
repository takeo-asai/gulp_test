var gulp = require('gulp');
var typescript = require('gulp-typescript');
var plumber = require("gulp-plumber");
var uglify = require("gulp-uglify");
var browserify = require('gulp-browserify');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');


typescriptProject = typescript.createProject('tsconfig.json', function() {
  typescript: require('typescript')
});

gulp.task('ts', function() {
    gulp.src([
           './app/*/*.ts',
           '!./node_modules/**'//node_modules配下は除外する
         ])
        .pipe(plumber())
        .pipe(typescript(typescriptProject))
        .pipe(browserify({
          insertGlobals : true,
          debug : true
        }))
        .pipe(istanbul())
        .pipe(mocha())
        .pipe(uglify())
        .pipe(istanbul.writeReports('coverage'))
        .pipe(gulp.dest('./build'))
});

gulp.task('watch', function() {
  gulp.watch('app/*/*.ts', ['ts'])
});

gulp.task('default',function(){
    gulp.run('watch');
});