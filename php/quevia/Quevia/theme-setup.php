<?php 

namespace Quevia;


function pages_menu (){
    $args = array(
        'title_li'     => null,
        'echo'         => 0,
        'sort_column'  => 'menu_order, post_title',
        'post_type'    => 'page',
        'post_status'  => 'publish' );

    $list=preg_replace(
        '/<ul class=(\'|")children/',
        '<ul class=${1}dropdown-menu',
        preg_replace(
            '/page_item_has_children[^"]*"><a([^<]*)/',
            'page_item_has_children"><a class="dropdown-toggle" ${1} <b class = "caret"></b>',
            wp_list_pages($args)
        )
    );
    echo '<ul class="nav navbar-nav"><li><a href="'.esc_url(home_url('/')).'">'.__('Home','quevia').'</a></li>'.$list.'</ul>';
}

function setup(){
    global $quevia_default_header_args; // in Quevia/theme_options.php

    load_theme_textdomain( 'quevia', get_template_directory() . '/languages' );
    add_theme_support('nav-menus');
    add_theme_support('html5');
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support('post-formats', array('gallery', 'image', 'audio', 'video', 'aside', 'status', 'link', 'quote', 'chat'));
    add_theme_support( 'custom-header', $quevia_default_header_args );
    register_nav_menus(  array ( 'Main' => 'Main Nav' ));
}
add_action('after_setup_theme', __NAMESPACE__.'\setup');

function register_widget_areas(){
    register_sidebar( array (
        'name'=> __('Main Sidebar','quevia'),
        'id' => 'main-widget-area',
        'description' => __('Generic sidebar for widgets', 'quevia' ),
        'before_widget' => '<div  id="%1$s" class="widget %2$s">',
        'after_widget' => "</div>",
        'before_title' => '<h3 class="widget-title">',
        'after_title' => "</h3>"
    ) );

    register_sidebar( array (
        'name'=> __('Footer widget area','quevia'),
        'id' => 'footer-widget-area',
        'description' => __('Generic sidebar for widgets', 'quevia' ),
        'before_widget' => '<div  id="%1$s" class="widget %2$s col-xs-12 col-sm-6 col-md-4 col-lg-3">',
        'after_widget' => "</div>",
        'before_title' => '<h3 class="widget-title">',
        'after_title' => "</h3>"
    ) );
}
add_action('widgets_init', __NAMESPACE__.'\register_widget_areas');

function load_scripts () {
    wp_enqueue_script('bootstrap-js', QUEVIA_PATH.'/js/bootstrap.min.js',array( 'jquery'), false, true);
    wp_enqueue_script('main-js', QUEVIA_PATH.'/js/main.js',array( 'jquery','bootstrap-js'), false, true);
    if ( is_singular() ) 
        wp_enqueue_script( 'comment-reply' );

    enqueue_bootstrap_theme();
    wp_enqueue_style('style-css',  get_stylesheet_uri() , array('bootstrap-css'));
}
add_action('wp_enqueue_scripts',__NAMESPACE__.'\load_scripts');

function title_tag($title, $sep){
    return $title.get_bloginfo( 'name' );
}
add_filter('wp_title', __NAMESPACE__.'\title_tag', 10, 2);

function menu_item_attributes( $atts, $item, $args ){
    if(in_array("menu-item-has-children",$item->classes) ){
        $item->title .= " <b class = 'caret'></b>" ;
        $atts["class"]="dropdown-toggle";
    }
    return $atts;
}
add_filter('nav_menu_link_attributes', __NAMESPACE__.'\menu_item_attributes',10,3); //min 3.6

function change_excerpt_text($excerpt){
    if(!is_front_page()){
        $more_link = "<a href=".get_permalink()." ><small>".__("Read more","quevia")."</small></a>";
        return $excerpt.$more_link;
    }
    else{
        return $excerpt;
    }
}
add_filter('the_excerpt', __NAMESPACE__.'\change_excerpt_text');

function comment_form_field_classes($field){
    $field=preg_replace('/<(input|textarea) /i', '<${1} class="form-control" ',
            preg_replace('/<p class="/i', '<p class="form-group ', $field));
    return $field;
}
foreach ( array( 'comment_form_field_author','comment_form_field_email',
    'comment_form_field_url', 'comment_form_field_comment') as $field){
    add_filter($field, __NAMESPACE__.'\comment_form_field_classes');
}

function insert_content_styles($content){
    if(preg_match('/<table/i', $content)){
        $content=preg_replace('/<table/i', '<table class="table"', $content);
    }
    return $content;
}
add_filter('the_content',  __NAMESPACE__.'\insert_content_styles');
add_filter('comment_text',  __NAMESPACE__.'\insert_content_styles');

function style_post_page_links($link){
    return "<li><span>".$link."</span></li>";
}
add_filter( 'wp_link_pages_link', __NAMESPACE__.'\style_post_page_links');

function style_avatar_img($item){
    return preg_replace("/class=('|\")/i", 'class=${1}media-object ' , $item);
}
add_filter( 'get_avatar', __NAMESPACE__.'\style_avatar_img');

function post_page_link($link){
    $link = preg_replace('/(href="[^"]*)"/', '${1}#reading-area"', $link);
    return $link;
}
add_filter( 'wp_link_pages_link', __NAMESPACE__.'\post_page_link');

