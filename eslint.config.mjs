import eslint from "@eslint/js";

export default [
    eslint.configs.recommended,
    {
        ignores: ["Resources/Private/*", "build.mjs"],
    },
];
