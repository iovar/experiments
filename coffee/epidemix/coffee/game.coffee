class Game
  constructor: (@conf) ->
    for ctx in @conf.ctx
      ctx.canvas.width = @conf.width
      ctx.canvas.height = @conf.height
    @level = 3
    @runningLevel = null
    @score = 0
    @data = new Data

  highScore: (score) ->
    if score?
      localStorage.setItem 'epidemix-highscore', score
    else
      return localStorage.getItem 'epidemix-highscore'

  nextLevel: (callback) ->
    @level = Math.floor(Math.random() * 4 )
    data = @data.getLevel @level
    @runningLevel = new Level @conf, data
    @runningLevel.run (opts)->
      callback(opts)

  stop: ->
    if @runningLevel?
      @runningLevel.stop()

  continue: ->
    #continue

  replay: ->
    #replay

  finish: ->
    #finish
