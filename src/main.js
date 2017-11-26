var Helper = {
  isToEnd: function ($viewport, $in) {
    return $viewport.height() + $viewport.scrollTop() +10 > $in.height()
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
    $node.find('a').attr('href',movie.alt)
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

var homepage = {
  init:function(){
    this.num = 0
    this.$container = $('main')
    this.$fa_c = $('#top250')
    this.$content = $('.content')
    this.isFinish = false
    this.isLoading = false
    this.start()
    this.bind()
  },
  start:function(){
    var _this = this
    this.getData(function(data){
      _this.render(data)
    })
  },
  getData:function(callback){
    var _this = this
    if(_this.isLoading) return
    _this.isLoading = true
    _this.$fa_c.find('.loading').show()
    $.ajax({
      url: 'https://api.douban.com/v2/movie/top250',
      method: 'GET',
      data: {
          start: this.num,
          count: 20
      },
      dataType: 'jsonp',
  }).done(function (ret) {
      if(_this.index >= ret.total){
        _this.isFinish = true
      }
      callback(ret)
      _this.num += 20
  }).fail(function () {
      console.log('error...')
  }).always(function(){
    _this.isLoading = false
    _this.$fa_c.find('.loading').hide()
  })       
  },
  render:function(data){
    var _this = this
    data.subjects.forEach(function(movie){
      _this.$content.append(Helper.creatItem(movie))
    })
  },
  bind:function(){
    var _this = this
    this.$container.scroll(function(){
      if(Helper.isToEnd(_this.$container,_this.$fa_c)){
        _this.start()
      }
    })
  }
}

var beimei = {
  init:function(){
    this.$fa_c = $('#beimei')
    this.start()
  },
  start:function(){
    var _this = this
    this.getData(function(data){
      _this.render(data)
    })
  },
  getData:function(callback){
    var _this = this
    _this.$fa_c.find('.loading').show()
    $.ajax({
      url: 'https://api.douban.com/v2/movie/us_box',
      dataType: 'jsonp'
    }).done(function(ret){
      callback(ret)
    }).fail(function(){
      console.log('err...')
    }).always(function(){
      _this.$fa_c.find('.loading').hide()
    })

  },
  render:function(data){
    var _this = this
    data.subjects.forEach(function(movie){
      _this.$fa_c.append(Helper.creatItem(movie.subject))
    })
  }
}

var searchBox = {
  init:function(){
    this.$container = $('#search')
    this.$input = this.$container.find('input')
    this.$btn = this.$container.find('.button')
    this.$content = this.$container.find('.search-result')
    this.bind()
  },
  bind:function(){
    var _this = this
    this.$btn.click(function(){
      _this.$content.find('.item').remove()
      _this.getData(_this.$input.val(), function(data){
        _this.render(data)
      })
    })
  },
  getData:function(keyword,callback){
    var _this = this
    _this.$content.find('.loading').show()
    $.ajax({
      url:'https://api.douban.com/v2/movie/search',
      data:{
        q:keyword
      },
      dataType:'jsonp'
    }).done(function(ret){
      callback(ret)
    }).fail(function(){
      console.log('fail...')
    }).always(function(){
      _this.$content.find('.loading').hide()
    })
  },
  render:function(data){
    var _this = this
    data.subjects.forEach(function(item){
      _this.$content.append(Helper.creatItem(item))
    })
  }
}
var app = {
  init: function () {
    this.bind()
    homepage.init()
    beimei.init()
    searchBox.init()
  },
  bind: function () {
    $('footer>div').click(function(){
      $(this).addClass('active').siblings().removeClass('active')
      $('section').eq($(this).index()).show().siblings().hide()
    })
  }
}
app.init()
