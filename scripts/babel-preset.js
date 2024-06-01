const BABEL_ENV = process.env.BABEL_ENV;
const isCommonJs = BABEL_ENV !== undefined && BABEL_ENV === "cjs";
const isEsm = BABEL_ENV !== undefined && BABEL_ENV === "esm";

module.exports = () => ({
    presets: [
        ["@babel/preset-typescript"],
        [
            "@babel/env",
            {
                bugfixes: true,
                loose: true,
                modules: isCommonJs ? "commonjs" : false,
                targets: {
                    esmodules: isEsm ? true : undefined,
                    chrome: 70,
                },
            },
        ],
    ],
});
