<?php

namespace Quevia;

function option_menu_register( $wp_customize ){

    /*  Header Options  */
    global $quevia_theme_defaults;

    $wp_customize->add_section( 'quevia_header_options', array(
        'title' => __( 'Header Options', 'quevia' ),
        'priority' => 20,
        'capability' => 'edit_theme_options'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[header_height]', array(
        'default' => $quevia_theme_defaults['header_height'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_header_height',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[header_height]', array(
        'label' => __( 'Header height', 'quevia' ),
        'section' => 'quevia_header_options',
        'priority' => '1',
        'type' => 'text'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[header_status]', array(
        'default' => $quevia_theme_defaults['header_status'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_checkbox',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[header_status]', array(
        'label' => __( 'Enable header', 'quevia' ),
        'section' => 'quevia_header_options',
        'priority' => '2',
        'type' => 'checkbox'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[header_logo_status]', array(
        'default' => $quevia_theme_defaults['header_logo_status'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_checkbox',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[header_logo_status]', array(
        'label' => __( 'Display header logo', 'quevia' ),
        'section' => 'quevia_header_options',
        'priority' => '3',
        'type' => 'checkbox'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[header_tagline_status]', array(
        'default' => $quevia_theme_defaults['header_tagline_status'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_checkbox',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[header_tagline_status]', array(
        'label' => __( 'Display site tagline', 'quevia' ),
        'section' => 'quevia_header_options',
        'priority' => '4',
        'type' => 'checkbox'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[header_search_status]', array(
        'default' => $quevia_theme_defaults['header_search_status'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_checkbox',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[header_search_status]', array(
        'label' => __( 'Display search form in header', 'quevia' ),
        'section' => 'quevia_header_options',
        'priority' => '5',
        'type' => 'checkbox'
    ));


    /* Front Page Section      */

    $wp_customize->add_section( 'quevia_front_page_options', array(
        'title' => __( 'Front Page Options', 'quevia' ),
        'priority' => 50,
        'capability' => 'edit_theme_options',
        'description' => __('Number of tiles can be 2, 3, 4 or 6. Query catagories and tags must be provided in a coma-separated list.', 'quevia')
    ));
    $wp_customize->add_setting( 'quevia_theme_options[front_page_slider_status]', array(
        'default' => $quevia_theme_defaults['front_page_slider_status'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_checkbox',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[front_page_slider_status]', array(
        'label' => __( 'Display a slider in the front page', 'quevia' ),
        'section' => 'quevia_front_page_options',
        'priority' => '1',
        'type' => 'checkbox'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[front_page_tiles_status]', array(
        'default' => $quevia_theme_defaults['front_page_tiles_status'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_checkbox',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[front_page_tiles_status]', array(
        'label' => __( 'Display tiles in the front page', 'quevia' ),
        'section' => 'quevia_front_page_options',
        'priority' => '2',
        'type' => 'checkbox'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[front_page_tiles_number]', array(
        'default' => $quevia_theme_defaults['front_page_tiles_number'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_tiles_number',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[front_page_tiles_number]', array(
        'label' => __( 'Number of tiles per row', 'quevia' ),
        'section' => 'quevia_front_page_options',
        'priority' => '3',
        'type' => 'text'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[front_page_tiles_height]', array(
        'default' => $quevia_theme_defaults['front_page_tiles_height'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_tiles_height',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[front_page_tiles_height]', array(
        'label' => __( 'Height of tiles in px', 'quevia' ),
        'section' => 'quevia_front_page_options',
        'priority' => '4',
        'type' => 'text'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[front_page_slider_max_items]', array(
        'default' => $quevia_theme_defaults['front_page_slider_max_items'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_posts_number',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[front_page_slider_max_items]', array(
        'label' => __( 'Max number of slides/tiles (-1 no max, 0 auto)', 'quevia' ),
        'section' => 'quevia_front_page_options',
        'priority' => '5',
        'type' => 'text'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[front_page_slider_thumbnail]', array(
        'default' => $quevia_theme_defaults['front_page_slider_thumbnail'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_checkbox',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[front_page_slider_thumbnail]', array(
        'label' => __( 'Display only posts with featured image in slider/tiles (if set to false, posts without one will display the header image)', 'quevia' ),
        'section' => 'quevia_front_page_options',
        'priority' => '6',
        'type' => 'checkbox'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[front_page_slider_no_stickies]', array(
        'default' => $quevia_theme_defaults['front_page_slider_no_stickies'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_checkbox',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[front_page_slider_no_stickies]', array(
        'label' => __( 'Do not show sticky posts in slider/tiles', 'quevia' ),
        'section' => 'quevia_front_page_options',
        'priority' => '7',
        'type' => 'checkbox'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[front_page_slider_categories]', array(
        'default' => $quevia_theme_defaults['front_page_slider_categories'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_categories',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[front_page_slider_categories]', array(
        'label' => __( 'Categories for slides/tiles (comma-separated list)', 'quevia' ),
        'section' => 'quevia_front_page_options',
        'priority' => '8',
        'type' => 'text'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[front_page_slider_tags]', array(
        'default' => $quevia_theme_defaults['front_page_slider_tags'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_tags',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[front_page_slider_tags]', array(
        'label' => __( 'Tags for slides/tiles (comma-separated list)', 'quevia' ),
        'section' => 'quevia_front_page_options',
        'priority' => '9',
        'type' => 'text'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[front_page_hide_sidebar]', array(
        'default' => $quevia_theme_defaults['front_page_hide_sidebar'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_checkbox',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[front_page_hide_sidebar]', array(
        'label' => __( 'Do not display sidebar in front page', 'quevia' ),
        'section' => 'quevia_front_page_options',
        'priority' => '10',
        'type' => 'checkbox'
    ));

        /* Layout Page Section      */

    $wp_customize->add_section( 'quevia_layout_options', array(
        'title' => __( 'Layout Options', 'quevia' ),
        'priority' => 100,
        'capability' => 'edit_theme_options'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[layout_contained]', array(
        'default' => $quevia_theme_defaults['layout_contained'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_checkbox',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[layout_contained]', array(
        'label' => __( 'Limit width in larger displays', 'quevia' ),
        'section' => 'quevia_layout_options',
        'priority' => '1',
        'type' => 'checkbox'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[header_text_side]', array(
        'default' => $quevia_theme_defaults['header_text_side'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_header_side',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[header_text_side]', array(
        'label' => __( 'Side of header text block', 'quevia' ),
        'section' => 'quevia_layout_options',
        'priority' => '2',
        'type' => 'select',
        'choices' => array(__('center', 'quevia'),__('left', 'quevia'),__('right', 'quevia'))
    ));
    $wp_customize->add_setting( 'quevia_theme_options[navigation_side]', array(
        'default' => $quevia_theme_defaults['navigation_side'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_navigation_side',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[navigation_side]', array(
        'label' => __( 'Alignment of menu items', 'quevia' ),
        'section' => 'quevia_layout_options',
        'priority' => '3',
        'type' => 'select',
        'choices' => array(__('center', 'quevia'),__('left', 'quevia'),__('right', 'quevia'))
    ));
    $wp_customize->add_setting( 'quevia_theme_options[sidebar_side]', array(
        'default' => $quevia_theme_defaults['sidebar_side'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_sidebar_side',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[sidebar_side]', array(
        'label' => __( 'Left, right or no sidebar', 'quevia' ),
        'section' => 'quevia_layout_options',
        'priority' => '4',
        'type' => 'select',
        'choices' => array(__('left', 'quevia'),__('right', 'quevia'), __('off', 'quevia'))
    ));

    /* Section Colors   */

    $wp_customize->add_setting( 'quevia_theme_options[bootstrap_theme]', array(
        'default' => $quevia_theme_defaults['bootstrap_theme'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_bootstrap_theme',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[bootstrap_theme]', array(
        'label' => __( 'Select a bootstrap theme', 'quevia' ),
        'section' => 'colors',
        'priority' => '1',
        'type' => 'select',
        'choices' => get_available_theme_list()
    ));
    $wp_customize->add_setting( 'quevia_theme_options[header_inner_color_scheme]', array(
        'default' => $quevia_theme_defaults['header_inner_color_scheme'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_label_color_scheme',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[header_inner_color_scheme]', array(
        'label' => __( 'Select a color scheme for the header text block', 'quevia' ),
        'section' => 'colors',
        'priority' => '2',
        'type' => 'select',
        'choices' => array(__('default','quevia'),__('primary','quevia'),__('success','quevia'),
            __('info','quevia'),__('warning','quevia'),__('danger','quevia'),__('none','quevia'))
    ));
    $wp_customize->add_setting( 'quevia_theme_options[header_logo_color_scheme]', array(
        'default' => $quevia_theme_defaults['header_logo_color_scheme'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_label_color_scheme',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[header_logo_color_scheme]', array(
        'label' => __( 'Select a color scheme for the header logo', 'quevia' ),
        'section' => 'colors',
        'priority' => '3',
        'type' => 'select',
        'choices' => array(__('default','quevia'),__('primary','quevia'),__('success','quevia'),
            __('info','quevia'),__('warning','quevia'),__('danger','quevia'),__('none','quevia'))
    ));
    $wp_customize->add_setting( 'quevia_theme_options[navbar_inverse]', array(
        'default' => $quevia_theme_defaults['navbar_inverse'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_checkbox',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[navbar_inverse]', array(
        'label' => __( 'Use inverted colors on the navigation bar', 'quevia' ),
        'section' => 'colors',
        'priority' => '4',
        'type' => 'checkbox'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[caption_inverse]', array(
        'default' => $quevia_theme_defaults['caption_inverse'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_checkbox',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[caption_inverse]', array(
        'label' => __( 'Use inverted colors on the slide &amp; tile captions', 'quevia' ),
        'section' => 'colors',
        'priority' => '4',
        'type' => 'checkbox'
    ));
    $wp_customize->add_setting( 'quevia_theme_options[footer_inverse]', array(
        'default' => $quevia_theme_defaults['footer_inverse'],
        'sanitize_callback' => __NAMESPACE__.'\sanitize_checkbox',
        'type' => 'theme_mod',
    ));
    $wp_customize->add_control('quevia_theme_options[footer_inverse]', array(
        'label' => __( 'Use inverted colors on the footer', 'quevia' ),
        'section' => 'colors',
        'priority' => '5',
        'type' => 'checkbox'
    ));


    $wp_customize->remove_control('display_header_text');
    $wp_customize->remove_control('header_textcolor');
    $wp_customize->get_section('header_image')->description=(__('For more options, go to the Appearance -> Header page in your admin panel','quevia'));
}

function head_custom_styles(){
    ?>
    <style>
    <?php
        if(is_front_page() && have_home_tiles()){
            ?>
            .tiles .item {
                height: <?php echo theme_options('front_page_tiles_height'); ?>px;
            }
            header .navbar{
                margin-bottom: 20px !important;
            }
            .replacement-header {
                min-height: <?php echo theme_options('header_height'); ?>px;
                background-image: url("<?php echo get_header_image(); ?>");
                background-size: <?php echo get_custom_header()->width; ?>px auto;
            }
            <?php
        }
        if(! (is_front_page() && have_home_slider())){
            ?>
            .custom-header {
                min-height: <?php echo theme_options('header_height'); ?>px;
                background-image: url("<?php echo get_header_image(); ?>");
                background-size: <?php echo get_custom_header()->width; ?>px auto;
            }
            <?php
        }
        if(! theme_options('layout_contained')){
        ?>
            .container {
                padding-right :0;
                padding-left: 0;
                width:100%;
            }
        <?php
        }
        switch(theme_options('navigation_side')){
            case 1:
                $nav_float = 'left';
                break;
            case 2:
                $nav_float = 'right';
                break;
            default:
                $nav_float = 'none';
        }
        ?>
        @media (min-width: 768px) {
            .navbar-nav{
                float:<?php echo $nav_float; ?>;
            }
        }

    ?>
    </style>
    <?php
}

function sanitize_label_color_scheme( $input ){
    if(in_array($input, array(0,1,2,3,4,5,6)))
        return $input;
    else {
        return 6;
    }
}

function sanitize_bootstrap_theme( $input ){
    if( $input < 0 || $input > count(get_available_theme_list()) -1 )
        return theme_options('bootstrap_theme');
    else
        return $input;
}

function sanitize_sidebar_side( $input ){
    if(in_array($input, array(0,1,2)))
        return $input;
    else {
        return theme_options('sidebar_side');
    }
}

function sanitize_navigation_side( $input ){
    if(in_array($input, array(0,1,2)))
        return $input;
    else {
        return theme_options('navigation_side');
    }
}

function sanitize_header_side( $input ){
    if(in_array($input, array(0,1,2)))
        return $input;
    else {
        return theme_options('header_text_side');
    }
}

function sanitize_taxonomy($input,$tax){
    $terms_in = explode(',', $input);
    $terms_out = array();

    foreach ($terms_in as $term){
        if(term_exists($term,$tax)){
            $terms_out[]=  trim($term);
        }
    }
    return implode(',', $terms_out);
}

function sanitize_categories( $input ){
    return sanitize_taxonomy($input, 'category');
}

function sanitize_tags( $input ){
    return sanitize_taxonomy($input, 'post_tag');
}

function sanitize_header_height( $input ){
    if(is_numeric($input) && intval($input) > 0)
        return $input;
    else
        return theme_options('header_height');
}

function sanitize_tiles_height( $input ){
    if(is_numeric($input) && intval($input) > 0)
        return $input;
    else
        return theme_options('front_page_tiles_height');
}

function sanitize_posts_number( $input ){
    if(is_numeric($input) && intval($input) >= -1)
        return $input;
    else
        return theme_options('front_page_slider_max_items');
}

function sanitize_tiles_number( $input ){
    if(in_array(intval($input), array(2,3,4,6)))
        return $input;
    else
        return theme_options('front_page_tiles_number');
}

function sanitize_checkbox( $input ){
    return (bool) $input;
}

add_action( 'customize_register' , __NAMESPACE__.'\option_menu_register');
add_action( 'wp_head' , __NAMESPACE__.'\head_custom_styles');
