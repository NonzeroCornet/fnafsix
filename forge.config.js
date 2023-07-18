module.exports = {
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        icon: "icon.png",
        setupIcon: "icon.png",
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: "icon.png",
        },
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: "icon.png",
      },
    },
  ],
};
