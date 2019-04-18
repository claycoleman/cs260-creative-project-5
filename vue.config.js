module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        // TODO ensure this is the same port as in server.js
        target: 'http://localhost:3000',
      },
    }
  }
}
