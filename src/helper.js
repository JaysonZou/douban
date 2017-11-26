var $ = require('jquery')

var Helper = {
  isToEnd: function ($viewport, $in) {
    return $viewport.height() + $viewport.scrollTop() + 10 > $in.height()
  },
  creatItem: function (movie) {
    var tpl = `<div class="item">
    <a href="#">
        <div class="cover">
            <img src="" alt="">
        </div>
        <div class="detail">
            <h2></h2>
            <div>评分：<span class="score"></span><span class="collection"></span>收藏</div>
            <div><span class="year"></span><span class="type"></span></div>
            <div>导演：<span class="director"></span></div>
            <div>主演：<span class="cast"></span></div>
        </div>
    </a> 
</div>`
    var $node = $(tpl)
    $node.find('a').attr('href', movie.alt)
    $node.find('.cover img').attr('src', movie.images.medium)
    $node.find('h2').text(movie.title)
    $node.find('.score').text(movie.rating.average)
    $node.find('.collection').text(movie.collect_count)
    $node.find('.year').text(movie.year + ' / ')
    $node.find('.type').text(movie.genres.join(' / '))
    $node.find('.director').text(function () {
      var aDirector = []
      movie.directors.forEach(function (val) {
        aDirector.push(val.name)
      })
      return aDirector.join(' / ')
    })
    $node.find('.cast').text(function () {
      var aCast = []
      movie.casts.forEach(function (val) {
        aCast.push(val.name)
      })
      return aCast.join(' / ')
    })
    return $node
  }
}

module.exports = Helper
