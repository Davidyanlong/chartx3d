var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var resolve = require('rollup-plugin-node-resolve');
var json = require('rollup-plugin-json');
var { uglify } = require('rollup-plugin-uglify');
var  { terser }  = require('rollup-plugin-terser');


// output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
// amd – 使用像requirejs一样的银木块定义
// cjs – CommonJS，适用于node和browserify / Webpack
// es6 (default) – 保持ES6的格式
// iife – 使用于<script> 标签引用的方式
// umd – 适用于CommonJs和AMD风格通用模式


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
let output = [];
if (process.env.NODE_ENV == "production") {
    output = [{
        file: "dist/chartx.js",
        name: "Chartx3d",
        format: "iife"
    },
    {
        file: "dist/cjs.js",
        name: "Chartx3d",
        format: "cjs"
    }, {
        file: "dist/amd.js",
        name: "Chartx3d",
        format: "amd"
    }, {
        file: "dist/es.js",
        name: "Chartx3d",
        format: "es"
    }, {
        file: "dist/umd.js",
        name: "Chartx3d",
        format: "umd"
    }];
} else {
    output = [{
        file: "dist/chartx.js",
        name: "Chartx3d",
        format: "iife"
    }]
}
let plugins = [
    glsl(),
    json(),
    resolve({ jsnext: true, main: true, browser: true }),
    commonjs()
];
if (process.env.NODE_ENV == "production") {
    plugins.push(babel({
        exclude: /node_modules\/(?!.*@(mmvis|mmgl)\/).*/,
        externalHelpers: true,
        babelrc: false,
        presets: [
            [
                "@babel/preset-env",
                {
                    "modules": false
                }
            ]
        ],
        plugins: [
            "@babel/plugin-external-helpers"
        ]
    }))

}else{
    //plugins.push(terser())
}
//plugins.push(uglify())


export default {
    input: 'src/index.js',
    output,
    plugins
}









// var rollup = require('rollup');
// var babel = require('rollup-plugin-babel');
// var commonjs = require('rollup-plugin-commonjs');
// var resolve = require('rollup-plugin-node-resolve');
// var uglify = require('rollup-plugin-uglify');
// var json = require('rollup-plugin-json');
// var babelCore = require("babel-core");

// var fs = require('fs');
// var Terser = require('terser');
// // var earcut = require("earcut");
// // import earcut from  "earcut"


// console.log("NODE_ENV", process.env.NODE_ENV);




// rollup.rollup({
//     input: 'src/index.js',
//     plugins: [
//         glsl(),
//         json(),

//         resolve({
//             jsnext: true,
//             main: true,
//             browser: true
//         }),

//         commonjs(),
//         //babel()
//         // babel({
//         //     //babelrc: true,
//         //     //presets: ["es2015-loose-rollup"],
//         //      exclude: '/node_modules\/((?!mmgl).)*$/',
//         //     //exclude: 'node_modules/**'
//         // }),

//         //uglify()
//     ]

// }).then(function (bundle) {

//     // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
//     // amd – 使用像requirejs一样的银木块定义
//     // cjs – CommonJS，适用于node和browserify / Webpack
//     // es6 (default) – 保持ES6的格式
//     // iife – 使用于<script> 标签引用的方式
//     // umd – 适用于CommonJs和AMD风格通用模式

//     if (process.env.NODE_ENV == "production") {
//         bundle.write({
//             format: 'iife',
//             name: 'Chartx3d',
//             file: 'dist/chartx_es6.js',
//             //sourceMap: 'inline'
//         }).then(() => {

//             let result = babelCore.transformFileSync("dist/chartx_es6.js", {
//                 compact: true
//             });
//             //压缩
//             // var res = Terser.minify(result.code);
//             // console.log(res.error||""); // runtime error, or `undefined` if no error
//             // console.log(res.code);  // 

//             fs.writeFileSync('dist/chartx.js', result.code);
//             fs.unlink('dist/chartx_es6.js', () => {
//                 console.log('\n\n 打包完毕\n\n');
//             })

//         })
//     }
//     if (process.env.NODE_ENV == "dev") {
//         bundle.write({
//             format: 'iife',
//             name: 'Chartx3d',
//             file: 'dist/chartx.js',
//             //sourceMap: 'inline'
//         })
//     }



//     // bundle.write({
//     //     format: 'amd',
//     //     name: 'Chartx',
//     //     file: 'dist/amd/chartx.js',
//     //     //sourceMap: 'inline'
//     // });

//     // bundle.write({
//     //     format: 'umd',
//     //     name: 'Chartx',
//     //     file: 'dist/umd/chartx.js',
//     //     //sourceMap: 'inline'
//     // });


//     // bundle.write({
//     //     format: 'cjs',
//     //     name: 'Chartx',
//     //     file: 'dist/cjs/chartx.js',
//     //     //sourceMap: 'inline'
//     // });

// });