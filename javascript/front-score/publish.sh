#!/bin/bash

ember build --environment production
rsync  -avz dist/ iovar@beefybyte.com:www/apps/frontscore.beefybyte.com/public/
