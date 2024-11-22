module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'classic', // changed automatic to classic
      },
    ],
    '@babel/preset-typescript',
  ],
};
