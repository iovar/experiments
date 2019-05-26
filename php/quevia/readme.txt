Quevia
======
Copyright 2013 John Varouhakis

Quevia is being developed and licensed under the GNU GPL v3 (or later). See LICENSE for more.


Quevia is a responsive theme based on the flexibility and elegance of Twitter-Bootstrap 3. A wide range of options is offered to configure the theme according to taste and more importantly, the ability to switch easily among the amazing Bootstrap themes offered in http://bootswatch.com/, all of which are packed inside Quevia. Also there is a front-page slider, along with featured items in a configurable tiled arrangement, displaying the posts that the user wants, by specifying the parameters of a custom query.


Quevia is being developed in github: https://github.com/iovar/quevia
Please use https://github.com/iovar/quevia/issues for bug reporting.

Contact me at <johnvarouhakis@gmail.com> if you have any questions.


Other Licenses
==============

Bootswatch themes License and Copyright:

Copyright 2013 Thomas Park

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

Bootstrap License and Copyright:

Copyright 2013 Twitter, Inc under [the Apache 2.0 license](css\bootstrap-themes\LICENSE-APACHE-2.0).


Quevia Requirements
===================

In order to install Quevia, you need WordPress version 3.6 or later and PHP 5.3 or later.


Using Quevia
============

After you install Quevia you can configure it. To do so, go to your WordPress administration panel under the Appearance menu, there will be an entry named Customize. This is where you can easily try a variety of options offered in this theme, in a point-and-click manner. When you are done and have configured this theme to your liking, remember to click on the "Save & Publish" button, to make any changes permanent. Alternatively, click on the "Cancel" button, to go back without changing any theme options. 


Configuring the Slider
======================

The slider can only be displayed in the Front Page (whether static, or a blog posts index). By default it displays the last 4 posts that have a Featured Image attached on them. If you have no posts with a featured image, the normal header will be displayed instead. If you have only a single post with a featured image, it is displayed but the slider controls do not appear and there is no animation. You can configure the slider to display posts with no featured image (for which, your header image will be displayed), in the Customize section of the Appearance menu, in your WordPress Admin Panel. You can also configure it to display only posts that fall within certain categories, or have certain tags. And you can specify the maximum number of posts it will display.


Configuring the Tiles
=====================

The tiles display the exact same set of posts that the slider displays (or would display if it is disabled) and configuration settings are shared between the two theme features. If there are no posts that match those settings, the tiles simply will not be displayed. An extra setting that the tiles have, is how many of them occupy a row. In small resolutions (<768px by default) there is only a single post in every row, but in larger ones, you can choose to have 2,3,4 or 6 posts in a row. The reason for these numbers is the twelve column grid of Bootstrap. You should probably make sure that the maximum number of slider/tile posts is a multiple of the tiles per row and that there are enough post results matching the settings you specified. Otherwise, if there is an incomplete row, the tiles will be centered, and in some cases resized, if possible to cover the width of the row (if such resize does not make them a lot wider than they would normally be).




