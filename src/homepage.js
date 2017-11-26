var Helper = require('./helper')
var $ = require('jquery')

var homepage = {
  init: function () {
    this.num = 0
    this.$container = $('main')
    this.$fa_c = $('#top250')
    this.$content = $('.content')
    this.isFinish = false
    this.isLoading = false
    this.start()
    this.bind()
  },
  start: function () {
    var _this = this
    this.getData(function (data) {
      _this.render(data)
    })
  },
  getData: function (callback) {
    var _this = this
    if (_this.isLoading) return
    _this.isLoading = true
    _this.$fa_c.find('.loading').show()
    $.ajax({
      url: 'https://api.douban.com/v2/movie/top250',
      method: 'GET',
      data: {
        start: this.num,
        count: 20
      },
      dataType: 'jsonp'
    }).done(function (ret) {
      if (_this.index >= ret.total) {
        _this.isFinish = true
      }
      callback(ret)
      _this.num += 20
    }).fail(function () {
      console.log('error...')
    }).always(function () {
      _this.isLoading = false
      _this.$fa_c.find('.loading').hide()
    })
  },
  render: function (data) {
    var _this = this
    data.subjects.forEach(function (movie) {
      _this.$content.append(Helper.creatItem(movie))
    })
  },
  bind: function () {
    var _this = this
    this.$container.scroll(function () {
      if (Helper.isToEnd(_this.$container, _this.$fa_c)) {
        _this.start()
      }
    })
  }
}

module.exports = homepage
