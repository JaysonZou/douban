var Helper = require('./helper')
var $ = require('jquery')

var searchBox = {
  init: function () {
    this.$container = $('#search')
    this.$input = this.$container.find('input')
    this.$btn = this.$container.find('.button')
    this.$content = this.$container.find('.search-result')
    this.bind()
  },
  bind: function () {
    var _this = this
    this.$btn.click(function () {
      _this.$content.find('.item').remove()
      _this.getData(_this.$input.val(), function (data) {
        _this.render(data)
      })
    })
  },
  getData: function (keyword, callback) {
    var _this = this
    _this.$content.find('.loading').show()
    $.ajax({
      url: 'https://api.douban.com/v2/movie/search',
      data: {
        q: keyword
      },
      dataType: 'jsonp'
    }).done(function (ret) {
      callback(ret)
    }).fail(function () {
      console.log('fail...')
    }).always(function () {
      _this.$content.find('.loading').hide()
    })
  },
  render: function (data) {
    var _this = this
    data.subjects.forEach(function (item) {
      _this.$content.append(Helper.creatItem(item))
    })
  }
}

module.exports = searchBox
