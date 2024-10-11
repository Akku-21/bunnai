import dts from "bun-plugin-dts";

const result  = await Bun.build({
    entrypoints: ["./src/index.ts"],
    outdir: "./dist",
    minify: true,
    target: "bun",
    plugins: [dts()],
});


if (!result.success) {
  console.error("Build failed");
  for (const message of result.logs) {
    // Bun will pretty print the message object
    console.error(message);
  }
}
