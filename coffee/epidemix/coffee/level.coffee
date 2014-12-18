class Level
  constructor: (@conf, @data)->
    for ctx_i in @conf.ctx
      ctx_i.strokeStyle = "rgba(255,255,255,0.1)"
      ctx_i.lineWidth = 1
      ctx_i.clearRect 0,0,@conf.width,@conf.height

    # a cell flyweight
    @cell = new Cell

    #draw background and grid and prepare matrix
    @matrix = []
    @conf.ctx[0].drawImage @data.bg, 0,0, @conf.width, @conf.height
    for y in [0...@conf.tilesY]
      @matrix.push []
      for x in [0...@conf.tilesX]
        @conf.ctx[0].strokeRect x*@conf.tileSize+@conf.offsetX,\
          y*@conf.tileSize+@conf.offsetY,\
          @conf.tileSize, @conf.tileSize
        @matrix[y].push {
          type: 0
          condition:0
          next_condition:0
          opacity: 0
        }
    @conf.ctx[0].strokeRect @conf.offsetX,\
      @conf.offsetY,@conf.g_width,@conf.g_height

    #seed the level

    seed_sx = @conf.tilesX // 2 - @data.seed.size[0] // 2
    seed_sy = @conf.tilesY // 2 - @data.seed.size[1] // 2

    for cell in @data.seed.positions
      y = cell[0]+seed_sy
      x = cell[1]+seed_sx
      @matrix[y][x] = {
        type: cell[2]
        condition:1
        next_condition:1
        opacity: 0
        dirty:0
      }
      @conf.ctx[1].drawImage @data.cells[cell[2]],\
        x*@conf.tileSize+@conf.offsetX,y*@conf.tileSize+@conf.offsetY,\
        @conf.tileSize, @conf.tileSize

    @cell.life @matrix,@conf.tilesY,@conf.tilesX

  run: (callback) =>
    rounds = 10
    @timer = setInterval =>
      if rounds == 0
        rounds = 10
        @cell.life @matrix,@conf.tilesY,@conf.tilesX
        @cell.periodAll @matrix,@conf.tilesY,@conf.tilesX
      requestAnimationFrame =>
        total = @draw()
        if total == 0
          @conf.ctx[1].globalAlpha = 1
          @conf.ctx[1].clearRect 0,0,@conf.width,@conf.height
          clearInterval @timer
          callback {continue: true}
      rounds--
    ,100

  stop: =>
    if @timer
      clearInterval @timer

  draw: =>
    total = 0
    opacity_queue = {}
    for y in [0...@conf.tilesY]
      for x in [0...@conf.tilesX]
        total++ if @matrix[y][x].condition == 1
        cell = @matrix[y][x]
        if cell.dirty > 0
          cell.dirty--
          opacity = 1
          @conf.ctx[1].clearRect x*@conf.tileSize+@conf.offsetX,\
          y*@conf.tileSize+@conf.offsetY,\
          @conf.tileSize, @conf.tileSize

          if cell.condition == 1
            opacity = 1 - cell.dirty*0.1
          else
            opacity = cell.dirty*0.1
          if ! (opacity of opacity_queue)
            opacity_queue[opacity] = []
          opacity_queue[opacity].push {
            img: @data.cells[cell.type]
            x:x*@conf.tileSize+@conf.offsetX
            y:y*@conf.tileSize+@conf.offsetY
            width:@conf.tileSize
            height:@conf.tileSize
          }

          #@conf.ctx[1].globalAlpha = opacity
          #@conf.ctx[1].drawImage @data.cells[cell.type],\
          #x*@conf.tileSize+@conf.offsetX,\
          #y*@conf.tileSize+@conf.offsetY,\
          #@conf.tileSize, @conf.tileSize
    for opacity of opacity_queue
      @conf.ctx[1].globalAlpha = +opacity
      for cell in opacity_queue[opacity]
        @conf.ctx[1].drawImage cell.img, cell.x,\
        cell.y, cell.width,cell.height

    return total


