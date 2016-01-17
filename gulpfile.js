'use strict';
var del             = require('del');
var gulp            = require('gulp');
var git             = require('gulp-git');
var all             = require('gulp-all');
var sass            = require('gulp-sass');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var cssnano         = require('gulp-cssnano');
var htmlmin         = require('gulp-htmlmin');
var nodemon         = require('gulp-nodemon');
var gulpSequence    = require('gulp-sequence');
var sourcemaps      = require('gulp-sourcemaps');
var styleInject     = require('gulp-style-inject');

gulp.task('default', ['RunServer'], function()
{
    return all
    (
        gulp.watch(["./fonts/**", "./images/**"], ['SetUpResources']),
        gulp.watch(["./themes/**", "./css/**/**"], ['SeqUpdCSS']),
        gulp.watch("./static/**/**", ['SetUpHTML']),
        gulp.watch("./sass/**/**", ['SeqUpdSass']),
        gulp.watch('./js/*.js', ['SetUpJS'])
   );
});

gulp.task('SeqUpdSass', function (CB){ gulpSequence('SetUpCSS', 'SetUpHTML', CB); });
gulp.task('SeqUpdCSS', function (CB){ gulpSequence('ConcatCSS', 'SetUpHTML', CB); });

gulp.task('init', function()
{
    return git.init(function (err) 
    { if (err) throw err; });
});

gulp.task('add', ['init'], function()
{
    return gulp.src(['./*.js', './*.json', './css', './fonts', './images', './js', './sass', './static', './themes'])
    .pipe(git.add());
});

gulp.task('commit', ['add'], function()
{
    return gulp.src(['./*.js', './*.json', './css', './fonts', './images', './js', './sass', './static', './themes'])
    .pipe(git.commit('initial commit'));
});

gulp.task('push', ['commit'], function()
{ 
    return git.push('origin', 'master', function (err)
    { if (err) throw err; });
});

gulp.task('RunServer', ['SeqSetUp'], function()
{ return nodemon({ script: 'node.js' }); });

gulp.task('SeqSetUp', function (CB){ gulpSequence(['SetUpJS', 'SetUpCSS', 'SetUpResources'], 'SetUpHTML', CB); });

gulp.task('SetUpJS', ['MinifyJS'], function()
{
    return gulp.src(['./public_html/static/js/jquery.js', './public_html/static/js/materialize.js', './public_html/static/js/scrollbar.js', './public_html/static/js/index.js'])
    .pipe(concat('index_all.js'))
    .pipe(gulp.dest('./public_html/static/js'));
});

gulp.task('MinifyJS', ['CleanJS'], function()
{
    return gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public_html/static/js'));
});

gulp.task('CleanJS', function()
{ return del('./public_html/static/js/**'); });

gulp.task('SetUpCSS', function(CB)
{ gulpSequence('CleanCSS', 'CompileSass', 'ConcatCSS', CB); });

gulp.task('CleanCSS', function()
{ return del('./public_html/static/css/**'); });

gulp.task('CompileSass', function()
{
    return gulp.src(['./sass/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./css'));
});

gulp.task('ConcatCSS', function()
{
    return gulp.src(['./css/*.css', './css/*.cxs', './themes/verde.css'])
    .pipe(cssnano())
    .pipe(gulp.dest('./public_html/static/css'))
    .pipe(concat('index_all.css'))
    .pipe(gulp.dest('./public_html/static/css'));
});

gulp.task('SetUpHTML', function()
{
    return gulp.src(["./static/*.html"], {base: "./"})
    .pipe(styleInject())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./public_html/'));
});
  
gulp.task('SetUpResources', ['CleanResources'], function()
{
    return gulp.src(["./fonts/**", "./images/**"], {base: "./"})
    .pipe(gulp.dest('./public_html/static/'));
});

gulp.task('CleanResources', function()
{ return del(['./public_html/static/fonts/**', './public_html/static/images/**', './public_html/static/*.html']); });

gulp.task('Clean', function()
{ return del('./public_html/**'); });