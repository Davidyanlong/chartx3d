var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var resolve = require('rollup-plugin-node-resolve');
var uglify = require('rollup-plugin-uglify');
var json = require('rollup-plugin-json');
var babelCore = require("babel-core");

var fs = require('fs');
var Terser = require('terser');
// var earcut = require("earcut");
// import earcut from  "earcut"


console.log("NODE_ENV", process.env.NODE_ENV);

function glsl() {

    return {

        transform(code, id) {

            if (/\.glsl$/.test(id) === false) return;

            var transformedCode = 'export default ' + JSON.stringify(
                code
                    .replace(/[ \t]*\/\/.*\n/g, '') // remove //
                    .replace(/[ \t]*\/\*[\s\S]*?\*\//g, '') // remove /* */
                    .replace(/\n{2,}/g, '\n') // # \n+ to \n
            ) + ';';
            return {
                code: transformedCode,
                map: { mappings: '' }
            };

        }

    };

}


rollup.rollup({
    input: 'src/index.js',
    plugins: [
        glsl(),
        json(),

        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),

        commonjs({ include: 'node_modules/**' }),
        //babel()
        // babel({
        //     //babelrc: true,
        //     //presets: ["es2015-loose-rollup"],
        //      exclude: '/node_modules\/((?!mmgl).)*$/',
        //     //exclude: 'node_modules/**'
        // }),

        //uglify()
    ]

}).then(function (bundle) {

    // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
    // amd – 使用像requirejs一样的银木块定义
    // cjs – CommonJS，适用于node和browserify / Webpack
    // es6 (default) – 保持ES6的格式
    // iife – 使用于<script> 标签引用的方式
    // umd – 适用于CommonJs和AMD风格通用模式

    if (process.env.NODE_ENV == "production") {
        bundle.write({
            format: 'iife',
            name: 'Chartx3d',
            file: 'dist/chartx_es6.js',
            //sourceMap: 'inline'
        }).then(() => {

            let result = babelCore.transformFileSync("dist/chartx_es6.js", {
                compact: true
            });
            //压缩
            // var res = Terser.minify(result.code);
            // console.log(res.error||""); // runtime error, or `undefined` if no error
            // console.log(res.code);  // 

            fs.writeFileSync('dist/chartx.js', result.code);
            fs.unlink('dist/chartx_es6.js', () => {
                console.log('\n\n 打包完毕\n\n');
            })

        })
    }
    if (process.env.NODE_ENV == "dev") {
        bundle.write({
            format: 'iife',
            name: 'Chartx3d',
            file: 'dist/chartx.js',
            //sourceMap: 'inline'
        })
    }



    // bundle.write({
    //     format: 'amd',
    //     name: 'Chartx',
    //     file: 'dist/amd/chartx.js',
    //     //sourceMap: 'inline'
    // });

    // bundle.write({
    //     format: 'umd',
    //     name: 'Chartx',
    //     file: 'dist/umd/chartx.js',
    //     //sourceMap: 'inline'
    // });


    // bundle.write({
    //     format: 'cjs',
    //     name: 'Chartx',
    //     file: 'dist/cjs/chartx.js',
    //     //sourceMap: 'inline'
    // });

});