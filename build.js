import esbuild from "esbuild";

const config = {
    bundle: true,
    entryPoints: ["src/index.ts"],
    external: [
        "dotenv",
        "grammy",
        "polka"
    ],
    format: "esm",
    minify: true,
    outdir: "./dist",
    platform: "node",
    target: "node16.17",
    tsconfig: "tsconfig.json"
}

esbuild
.build(config)
.catch( e => {
    console.error(e)
    process.exit(1)
})