module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
  
        if (oneOfRule) {
          // Удаляем файл .less из обработки другими загрузчиками
          oneOfRule.oneOf = oneOfRule.oneOf.map((rule) => {
            if (rule.test && rule.test.toString().includes('css|scss')) {
              rule.exclude = /\.less$/;
            }
            return rule;
          });
  
          // Добавляем правило для обработки .less файлов
          oneOfRule.oneOf.unshift({
            test: /\.less$/,
            use: [
              require.resolve('style-loader'),
              require.resolve('css-loader'),
              {
                loader: require.resolve('less-loader'),
                options: {
                  lessOptions: {
                    javascriptEnabled: true,
                  },
                },
              },
            ],
          });
        }
  
        return webpackConfig;
      },
    },
  };
  