<?php

if( !defined( 'ABSPATH' ) && !defined( 'WP_UNINSTALL_PLUGIN' ) )
    exit();


delete_option('widget_esnotes-widget');
delete_option('esnotes_plugin_options');

