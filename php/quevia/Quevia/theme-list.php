<?php

namespace Quevia;

$quevia_theme_list = array(
    'Default' => array('bootstrap-css' => QUEVIA_PATH.'/css/bootstrap-themes/bootstrap.min.css'),
    'Bootstrap theme' => array('bootstrap-css' => QUEVIA_PATH.'/css/bootstrap-themes/bootstrap.min.css',
        'bootstrap-theme-css' => QUEVIA_PATH.'/css/bootstrap-themes/bootstrap-theme.min.css'),
    'amelia' => array('bootstrap-css' => QUEVIA_PATH.'/css/bootstrap-themes/amelia.min.css'),
    'cerulean' => array('bootstrap-css' => QUEVIA_PATH.'/css/bootstrap-themes/cerulean.min.css'),
    'cosmo' => array('bootstrap-css' => QUEVIA_PATH.'/css/bootstrap-themes/cosmo.min.css'),
    'cyborg' => array('bootstrap-css' => QUEVIA_PATH.'/css/bootstrap-themes/cyborg.min.css'),
    'flatly' => array('bootstrap-css' => QUEVIA_PATH.'/css/bootstrap-themes/flatly.min.css'),
    'journal' => array('bootstrap-css' => QUEVIA_PATH.'/css/bootstrap-themes/journal.min.css'),
    'readable' => array('bootstrap-css' => QUEVIA_PATH.'/css/bootstrap-themes/readable.min.css'),
    'simplex' => array('bootstrap-css' => QUEVIA_PATH.'/css/bootstrap-themes/simplex.min.css'),
    'slate' => array('bootstrap-css' => QUEVIA_PATH.'/css/bootstrap-themes/slate.min.css'),
    'spacelab' => array('bootstrap-css' => QUEVIA_PATH.'/css/bootstrap-themes/spacelab.min.css'),
    'united' => array('bootstrap-css' => QUEVIA_PATH.'/css/bootstrap-themes/united.min.css'),
    'yeti' => array('bootstrap-css' => QUEVIA_PATH.'/css/bootstrap-themes/yeti.min.css',
        'bootstrap-theme-fixes-css' => QUEVIA_PATH.'/css/bootstrap-themes/yeti-fixes.css', ),
);

function get_available_theme_list(){
    global $quevia_theme_list;
    return array_keys($quevia_theme_list);
}

function get_selected_theme_styles($slug){
    global $quevia_theme_list;
    if(in_array($slug, get_available_theme_list() )){
        return $quevia_theme_list[$slug];
    }
    else{
        return $quevia_theme_list['Default'];
    }
}
