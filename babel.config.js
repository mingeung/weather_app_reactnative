// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//   };
// };

// export default function () {
//   return {
//     presets: ["@babel/preset-typescript"],
//   };
// }

// module.expors = {
//   presets: [
//     [
//       "@babel/preset-env",
//       {
//         targets: {
//           node: "current",
//         },
//       },
//     ],
//   ],
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};
