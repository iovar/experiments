<?php

namespace Quevia;

$quevia_theme_options ;

$quevia_theme_defaults = array (
    'header_height' => '400' ,
    'header_status' => true ,
    'header_logo_status' => true ,
    'header_tagline_status' => true ,
    'header_search_status' => true ,
    'front_page_slider_status' => true ,
    'front_page_tiles_status' => true ,
    'front_page_tiles_number' => '4' ,
    'front_page_tiles_height' => '240' ,
    'front_page_slider_max_items' => '4' ,
    'front_page_slider_thumbnail' => true ,
    'front_page_slider_no_stickies' => true ,
    'front_page_slider_categories' => '' ,
    'front_page_slider_tags' => '' ,
    'front_page_hide_sidebar' => false ,
    'layout_contained' => true ,
    'header_text_side' => '0' ,
    'navigation_side' => '0' ,
    'sidebar_side' => '1' ,
    'bootstrap_theme' => '0' ,
    'header_inner_color_scheme' => '1' ,
    'header_logo_color_scheme' => '0' ,
    'navbar_inverse' => false ,
    'caption_inverse' => true ,
    'footer_inverse' => false
);

$quevia_default_header_args = array(
    'flex-height'   => true,
    'height'        => 400,
    'flex-width'    => true,
    'width'         => 1800,
    'default-image' => QUEVIA_PATH.'/img/foam.jpg',
    'uploads'       => true
);

function theme_options($index=null){
    global $quevia_theme_options,
            $quevia_theme_defaults;
    if(!isset($quevia_theme_options)){
        $quevia_theme_options = get_theme_mod('quevia_theme_options');
        if(!is_array($quevia_theme_options) )
            $quevia_theme_options = array();
        $quevia_theme_options = array_merge( $quevia_theme_defaults, $quevia_theme_options );
    }
    if(empty($index))
        return $quevia_theme_options;
    elseif( array_key_exists( $index, $quevia_theme_options ) )
        return $quevia_theme_options[$index];
    else
        return "";
}

function have_header(){
    return theme_options('header_status');
}

function header_height(){
    return theme_options('header_height');
}

function header_attributes(){

    $class=array('custom-header');

    switch(theme_options('header_text_side')){
        case '1':
            $class[] = 'text-left';
            break;
        case '2':
            $class[] = 'text-right';
            break;
        default:
            $class[] = 'text-center';
    }

    if(  (have_home_slider() && is_front_page()) )
        $class[]='custom-header-slider';

    return ' class=" '.implode(' ',$class).'" ';
}

function have_header_logo(){
    return theme_options('header_logo_status');
}

function have_header_tagline(){
    return theme_options('header_tagline_status');
}

function have_header_search(){
    return theme_options('header_search_status');
}

function have_home_slider(){
    return theme_options('front_page_slider_status');
}

function have_home_tiles(){
    return theme_options('front_page_tiles_status');
}

function home_tiles_per_row(){
    return intval(theme_options('front_page_tiles_number'));
}

function slider_query_attributes(){
    $atts = array(
        'ignore_sticky_posts'=>theme_options('front_page_slider_no_stickies')?'1':'0',
        'posts_per_page' => theme_options('front_page_slider_max_items'),
        'tag'=>theme_options('front_page_slider_tags'),
        'category_name'=>theme_options('front_page_slider_categories')
    );
    if( theme_options('front_page_slider_thumbnail') )
        $atts['meta_key'] = '_thumbnail_id';
    return $atts;
}

function have_sidebar(){
    if(is_front_page() && theme_options('front_page_hide_sidebar') )
        return false;
    elseif ( theme_options('sidebar_side')=='2')
        return false;
    else
        return true;
}

function sidebar_attributes(){
    if(theme_options('sidebar_side')=='1')
        return 'class="col-xs-12 col-sm-4 col-md-3"';
    else
        return 'class="col-xs-12 col-sm-4 col-md-3 col-sm-pull-8 col-md-pull-9"';
}

function section_attributes(){
    if(!have_sidebar())
        return 'class="col-xs-12 "';
    elseif(theme_options('sidebar_side')== '1' )
        return 'class="col-xs-12 col-sm-8 col-md-9"';
    else
        return 'class="col-xs-12 col-sm-8 col-md-9 col-sm-push-4 col-md-push-3"';
}

function enqueue_bootstrap_theme(){
    $theme_index = theme_options('bootstrap_theme');
    $theme_list = get_available_theme_list();
    $theme_slug = $theme_list[$theme_index];
    $theme_array = get_selected_theme_styles($theme_slug);

    foreach ($theme_array as $name => $style){
        wp_enqueue_style($name,$style);
    }
}

function get_label_class($index){
    switch($index){
        case '0':
            return 'label label-default';
        case '1':
            return 'label label-primary';
        case '2':
            return 'label label-success';
        case '3':
            return 'label label-info';
        case '4':
            return 'label label-warning';
        case '5':
            return 'label label-danger';
        default:
            return '';
    }
}

function get_header_inner_color_scheme(){
    return get_label_class(theme_options('header_inner_color_scheme'));
}

function get_logo_color_scheme(){
    return get_label_class(theme_options('header_logo_color_scheme'));
}

function get_color_class($option){
    if($option)
        return 'navbar-inverse';
    else
        return 'navbar-default';
}

function get_navbar_color_class(){
    return get_color_class(theme_options('navbar_inverse'));
}

function get_caption_color_class(){
    return get_color_class(theme_options('caption_inverse'));
}

function get_footer_color_class(){
    return get_color_class(theme_options('footer_inverse'));
}
