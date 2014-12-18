class App
  constructor: (@isMobile)->
    tileSize = 48
    barSize = 44
    @ingame = false

    @conf =
      tileSize: tileSize
      barSize: barSize
      width: $(window).width()
      height: $(window).height()
      canvas : canvas for canvas in $ 'canvas'
      ctx: canvas.getContext '2d' for canvas in $ 'canvas'
    if @conf.width>480 then @conf.g_width = 480
    else @conf.g_width = @conf.width
    if @conf.height>480 + @conf.barSize then @conf.g_height = 480
    else @conf.g_height = @conf.height - @conf.barSize
    @conf.tilesX = @conf.g_width // @conf.tileSize
    @conf.tilesY = @conf.g_height // @conf.tileSize
    @conf.offsetX = ( @conf.g_width % @conf.tileSize + \
    @conf.width - @conf.g_width ) / 2
    @conf.offsetY = ( ( @conf.g_height % @conf.tileSize + \
    @conf.height + @conf.barSize - @conf.g_height ) / 2 ) 
    @sounds = for sound in ['audio/s1.mp3', 'audio/s2.mp3']
      ap = new Audio
      ap.src = sound
      ap.load()
      ap

  start: =>
    console.log 'Start'
    @game = new Game @conf

  stop: =>
    if @ingame && @game?
      music = $('.level-music').get 0
      music.pause()
      @ingame = false
      @game.stop()

  nextLevel: =>
    cont = true
    music = $('.level-music').get 0
    if music.readyState == 4
      music.currentTime = 0
    music.loop=true
    music.play()
    timer = setInterval =>
      if ! @ingame && cont
        @ingame = true
        @game.nextLevel (opts)=>
          @ingame = false
          console.log opts
          cont = opts.continue
          if !cont
            clearInterval timer
    ,100


  click: (e) =>
    tx = e.x
    ty = e.y
    if @isMobile
      tx = e.changedTouches[0].clientX
      ty = e.changedTouches[0].clientY

    if @ingame && tx >= @conf.offsetX &&\
    tx <= @conf.width - @conf.offsetX &&\
    ty >= @conf.offsetY &&\
    ty <= @conf.height - @conf.offsetY + @conf.barSize
      x = ( tx - @conf.offsetX ) // @conf.tileSize
      y = ( ty - @conf.offsetY ) // @conf.tileSize
      @game.runningLevel.cell.kill \
        @game.runningLevel.matrix[y][x], @sounds

  
  loaded: =>
    for img in $ '#assets img'
      return false if !img.complete
    for audio in @sounds
      return false if audio.readyState != 4 && !@isMobile
    return true

