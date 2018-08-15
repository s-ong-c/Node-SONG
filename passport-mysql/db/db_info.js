module.exports = (function () {
  return {
    local: { // localhost
      host: '13.125.9.121',
      port: '3306',
      user: 'study',
      password: '1111',
      database: 'studydb'
    },
    real: { // real server db info
      host: '',
      port: '',
      user: '',
      password: '!',
      database: ''
    },
    dev: { // dev server db info
      host: '',
      port: '',
      user: '',
      password: '',
      database: ''
    }
  }
})();
