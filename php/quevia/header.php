<!DOCTYPE html>
<html <?php language_attributes() ?> >
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|',true,'right'); ?></title>
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?> >
    <div id="wrap">
        <div id="outer-container" >
            <header id="page-header">
            <?php if(Quevia\have_header()) : ?>
                <div <?php echo Quevia\header_attributes(); ?> >
                    <?php if(Quevia\have_header_logo() || Quevia\have_header_tagline() || Quevia\have_header_search()) : ?>
                        <div class="custom-header-inner <?php echo Quevia\get_header_inner_color_scheme(); ?>" >
                            <?php if(Quevia\have_header_logo()) : ?>
                                <h1 class="custom-header-logo"><a class="<?php echo Quevia\get_logo_color_scheme(); ?>"
                                    href="<?php echo esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a></h1>
                            <?php endif; ?>
                            <?php if(Quevia\have_header_tagline()) : ?>
                                <h3 class='custom-header-tagline'> <?php bloginfo('description'); ?></h3>
                            <?php endif; ?>
                            <?php if( Quevia\have_header_search() ): ?>
                                <?php get_search_form(); ?>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </div>
                <?php if( Quevia\have_home_slider() && is_front_page() ) : ?>
                     <?php get_template_part('slider'); ?>
                <?php endif ; ?>
            <?php endif ; ?>
            <nav class="navbar <?php echo Quevia\get_navbar_color_class(); ?>">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1">
                        <span class="sr-only"><?php _e('Toggle navigation','quevia'); ?></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand visible-xs" href="<?php echo esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
                </div>
                <div class="collapse navbar-collapse" id="navbar-collapse-1">
                    <?php wp_nav_menu( array(
                        'theme_location'  => 'Main',
                        'container' => '',
                        'fallback_cb' => 'Quevia\pages_menu',
                        'menu_class' => 'nav navbar-nav',
                        'walker' => new Quevia\Walker_Bootstrap_Menu()
                        )); ?>
                </div>
            </nav>
            <?php if(Quevia\have_home_tiles() && is_front_page() ) : ?>
                 <?php get_template_part('tiles'); ?>
            <?php endif ; ?>
            </header>
            <div id="inner-container" class="container">


