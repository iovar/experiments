#!/bin/bash

ember build --environment production
rsync  -avz dist/ USER@SERVER:PATH
