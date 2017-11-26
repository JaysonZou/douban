var Helper = require('./helper')
var $ = require('jquery')

var beimei = {
  init: function () {
    this.$fa_c = $('#beimei')
    this.start()
  },
  start: function () {
    var _this = this
    this.getData(function (data) {
      _this.render(data)
    })
  },
  getData: function (callback) {
    var _this = this
    _this.$fa_c.find('.loading').show()
    $.ajax({
      url: 'https://api.douban.com/v2/movie/us_box',
      dataType: 'jsonp'
    }).done(function (ret) {
      callback(ret)
    }).fail(function () {
      console.log('err...')
    }).always(function () {
      _this.$fa_c.find('.loading').hide()
    })
  },
  render: function (data) {
    var _this = this
    data.subjects.forEach(function (movie) {
      _this.$fa_c.append(Helper.creatItem(movie.subject))
    })
  }
}

module.exports = beimei
