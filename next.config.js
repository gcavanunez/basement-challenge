/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules = config.module.rules.map((row) => {
      return row.loader == "next-image-loader"
        ? {
            ...row,
            test: /^(?!.*icon\.svg).*\.(png|jpg|jpeg|gif|webp|ico|bmp|svg)$/i,
          }
        : row;
    });
    config.module.rules.push({
      test: /\.icon.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },

      use: ["@svgr/webpack"],
    });

    return config;
  },
};
