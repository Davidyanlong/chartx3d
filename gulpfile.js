var gulp = require('gulp'),

watch = require('gulp-watch'),
 exec  = require('child_process').exec;

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});

 
gulp.task('watch', function (cb) {

    return watch('./src/**/*.js',function(){
        console.log('watching');
        exec('tnpm run rollup', (err, stdout, stderr) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(new Date());
            console.log(stdout);
           // cb(err);    
          });
    });
    
})

