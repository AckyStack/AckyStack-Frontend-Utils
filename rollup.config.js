import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import nodeResolve from "@rollup/plugin-node-resolve";
import pkg from './package.json'
import path from 'path'
//import {terser} from "rollup-plugin-terser";

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts'];
const resolve = (...args) => {
    return path.resolve(__dirname, ...args)
};
const plugins = [
    typescript({
        tsconfig: 'tsconfig.json',
        removeComments: true,
        useTsconfigDeclarationDir: true,
    }),
    nodeResolve({
        extensions,
        modulesOnly: true
    }),
    babel({
        exclude: 'node_modules/**',
        extensions
    }),
    //terser(),
]

export default {
    input: resolve('src/index.ts'),
    // output: [
    //     {file: 'dist/ackystack-utils.js', format: 'umd', name: 'AckyStackUtils', sourcemap: true},
    //     {file: 'dist/ackystack-utils.esm.js', format: 'esm', sourcemap: true},
    //     {file: 'dist/ackystack-utils.iife.js', format: 'iife', sourcemap: true}
    // ],
    output: {file: resolve('./', pkg.main), format: 'esm'},
    plugins,
}
