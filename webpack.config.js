const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',  // O arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'),  // O diretório de saída
    filename: 'bundle.js',  // O nome do arquivo de saída
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Permite importar arquivos .js e .jsx sem especificar a extensão
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,  // Arquivos .js e .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  // Usando Babel para transpilar os arquivos JS/JSX
        },
      },
      {
        test: /\.css$/,  // Para lidar com arquivos CSS
        use: ['style-loader', 'css-loader'],  // Primeiro adiciona o CSS à página, depois carrega o CSS
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',  // O template HTML para gerar a página inicial
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,  // Porta do servidor de desenvolvimento
  },
};
