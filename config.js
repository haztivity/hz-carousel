System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*",
    "bitbucket:*": "jspm_packages/bitbucket/*",
    "local:*": "jspm_packages/local/*"
  }
});
