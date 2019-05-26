<?php

define('QUEVIA_PATH', get_template_directory_uri());
define('QUEVIA_WP_MINIMUM_VERSION','3.6');
define('QUEVIA_URL_REGEX', '%^.*(((https?://)|(www\.))([a-z0-9-][^<\'"]?)+(:[0-9]+)?(/[^<\'"]*)?).*$%i');

$quevia_slider_query;

require_once 'Quevia/class-walker-bootstrap-menu.php';
require_once 'Quevia/class-walker-bootstrap-comment.php';
require_once 'Quevia/theme-customize.php';
require_once 'Quevia/theme-list.php';
require_once 'Quevia/theme-options.php';
require_once 'Quevia/theme-setup.php';

if ( ! isset( $content_width ) )
	$content_width = 768;

