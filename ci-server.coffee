process.title='ci-server'

express=require 'express'
jade=require 'jade'

app=express()

app.enable 'trust proxy'
app.engine 'jade',jade.__express
app.set 'views',__dirname+'/views'

app.use express.logger 'dev'
app.use express.compress()
app.use express.cookieParser('colorwork-ci-server')
app.use express.cookieSession()
app.use express.bodyParser()
app.use express.static __dirname+'/public'

#Add Proto to Express.Response
require './error.js'
#Auto Refresh Forever List Every 5 sec instead For Each Request
require './procs.js'
#Load Params Filter
(require './params.js') app
#Load Router
(require './routers') app

app.listen 4100
