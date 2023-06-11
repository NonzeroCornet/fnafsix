module.exports = {
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        icon: "./src/assets/images/icon.png",
        setupIcon: "./src/assets/images/icon.png",
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: "./src/assets/images/icon.png",
        },
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: "./src/assets/images/icon.png",
      },
    },
  ],
};
