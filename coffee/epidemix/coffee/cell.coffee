class Cell
  constructor: ->
    # 0: none, 1: alive, 2: dead
    @condition=0
    @next_condition=0
    @opacity=0
    @type

  period: (cell)->
    cell.condition=cell.next_condition

  periodAll: (matrix,tilesY,tilesX)->
    for y in [0...tilesY]
      for x in [0...tilesX]
        @period matrix[y][x]

  kill: (cell,sounds)->
    if cell.condition == 1
      cell.condition=2
      cell.next_condition=2
      cell.dirty = 5
      if sounds[1].readyState==4
        sounds[1].pause()
        sounds[1].currentTime=0
      sounds[1].play()
    else
      if sounds[0].readyState==4
        sounds[0].pause()
        sounds[0].currentTime=0
      sounds[0].play()

    # play sound

  create: (cell)->
    cell.next_condition=1
    cell.type = Math.floor(Math.random() * 3 )

  life: (matrix,tilesY,tilesX)->
    for y in [0...tilesY]
      for x in [0...tilesX]
        near = @getNeighbors matrix,y,x,tilesY,tilesX
        if near == 2
          matrix[y][x].next_condition = matrix[y][x].condition
        else
          if  near == 3 || near == 4
            matrix[y][x].next_condition = 1
            if matrix[y][x].condition != 1
              matrix[y][x].type = Math.floor(Math.random() * 3 )
          else if matrix[y][x].condition != 0
            matrix[y][x].next_condition = 2

          if matrix[y][x].next_condition != matrix[y][x].condition
            matrix[y][x].dirty = 5

  getNeighbors: (matrix,y,x,tilesY,tilesX) ->
    num = 0
    for yn in [-1..1] when y+yn >= 0 and y+yn < tilesY
      for xn in [-1..1] when x+xn >= 0 and x+xn < tilesX and \
      (xn !=0 or yn != 0)
        num++ if matrix[yn+y][xn+x].condition == 1
    return num

