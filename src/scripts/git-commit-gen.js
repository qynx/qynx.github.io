const {generate} = await import('./git-commit-stats.js');
console.log(generate)
await generate()