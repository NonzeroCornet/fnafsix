module.exports = {
  packagerConfig: {
    icon: "./icon.ico",
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        setupIcon: "./icon.ico",
      },
    },
  ],
};
