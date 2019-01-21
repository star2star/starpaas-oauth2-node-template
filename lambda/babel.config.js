const config = {
  presets : [
    [
      "@babel/preset-env",
      {
        "targets" : {
          "node": "8.14.0"
        },
        "useBuiltIns": "usage",
        "debug": true,
        "modules": "commonjs"
      }
      
    ]
  ]
};

module.exports = config;
