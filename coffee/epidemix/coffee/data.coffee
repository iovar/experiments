class Data
  constructor: ->
    @bgs = ( bg for bg in $ '.background-image' )
    @cells = ( cell for cell in $ '.cell-image' )
    #@sounds = ( sound for sound in $ '.effect-sound' )

  getLevel: (level) ->
    data =
      bg: @bgs[level]
      cells: @cells
      seed:
        size: [2,3]
        positions: [
              #x,y,type
              [0,0,1]
              [0,1,2]
              [1,0,0]
              [1,1,2]
              [2,1,1]
            ]
      music: null


