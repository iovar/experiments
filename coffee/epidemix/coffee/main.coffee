window.isMobile =\
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i\
  .test navigator.userAgent
window.isPhonegap =\
  (document.URL.indexOf('http://') == -1 &&\
  document.URL.indexOf('https://') == -1)

document.location.hash = ''

first_time = true if localStorage.getItem 'app_first_load' != 'true'
app_starttime = Date.now()

window.main = ->
  if !first_time
    $.mobile.loading "show",
      text: "Loading game data, please wait",
      textVisible: true,
      theme: "a",
      html: ""

  window.app = new App window.isMobile
  $(document).on 'pagechange', (e)->
    console.log window.location.hash
    if window.location.hash == '#home' || window.location.hash == ''
      window.app.stop()
    else
      window.app.nextLevel()

  $('#home [data-role=content]')\
    .height ( $('body').height() - 32 )

  watchedEvent = if isMobile then 'touchend' else 'mousedown'
  window.addEventListener watchedEvent, window.app.click, true
  load_timer = setInterval ->
    if window.app.loaded()
      clearInterval load_timer

      window.app.start()
      app_curtime = Date.now()
      
      if first_time && app_curtime - app_starttime < 10000
        setTimeout ->
          localStorage.setItem 'app_first_load', true
          $.mobile.changePage '#home'
        , 10000 - ( app_starttime - app_starttime )
      else
        if !first_time
          $.mobile.loading "hide"
        $.mobile.changePage '#home'
  
  ,500

if window.isMobile && window.isPhonegap
  $(document).on 'deviceready', window.main
else
  $ window.main





