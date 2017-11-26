var homepage = require('./homepage')
var beimei = require('./beimei')
var searchBox = require('./search')
var $ = require('jquery')

var app = {
  init: function () {
    this.bind()
    homepage.init()
    beimei.init()
    searchBox.init()
  },
  bind: function () {
    $('footer>div').click(function () {
      $(this).addClass('active').siblings().removeClass('active')
      $('section').eq($(this).index()).show().siblings().hide()
    })
  }
}

module.exports = app
