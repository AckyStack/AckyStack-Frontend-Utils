import typescript from 'rollup-plugin-typescript2'
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs"
import json from '@rollup/plugin-json'
import nodePolyfills from 'rollup-plugin-node-polyfills';
import {terser} from "rollup-plugin-terser";

const plugins = [
    typescript({
        include: [
            "./src",
            "./**/*.ts+(|x)",
        ]
    }),
    json(),
    resolve({preferBuiltins: true, mainFields: ['browser']}),
    commonjs(),
    nodePolyfills(),

]


export default {
    input: "./src/index.ts",
    output: [
        {file: "./dist/ackystack-utils.bundle.js", sourcemap: true, name: "AckyStackUtils", format: 'iife'},
        {
            file: "./dist/ackystack-utils.min.js",
            sourcemap: true,
            name: "AckyStackUtils",
            format: 'iife',
            plugins: [terser()]
        },
    ],
    plugins,
}
