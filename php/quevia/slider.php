<div id="home-carousel" class="carousel slide" data-ride="carousel" >
    <?php

    global $quevia_slider_query;
    if(!isset($quevia_slider_query))
        $quevia_slider_query= new WP_Query(Quevia\slider_query_attributes());
    else
        $quevia_slider_query->rewind_posts ();

    ?>
    <?php if ($quevia_slider_query->have_posts() && $quevia_slider_query->post_count>1) : ?>
        <ol class="carousel-indicators">
        <?php for($i=0; $i< $quevia_slider_query->post_count; $i++) : ?>
            <li data-target="#home-carousel" data-slide-to="<?php echo $i; ?>"
                <?php if(0 == $i ) echo "class='active'"; ?>></li>
        <?php  endfor; ?>
        </ol>
    <?php endif; ?>
    <div class="carousel-inner" >

    <?php if($quevia_slider_query->have_posts()): while( $quevia_slider_query->have_posts() ) : $quevia_slider_query->the_post(); ?>
            <?php
            if (has_post_thumbnail() )
                $quevia_slider_inline_styles="style='min-height: ". Quevia\header_height()."px ;background-image: url("
                    .preg_replace(QUEVIA_URL_REGEX,'${1}', get_the_post_thumbnail () ).");'";
            else $quevia_slider_inline_styles = "style='min-height: ".Quevia\header_height()."px ;background-image: url(".get_header_image().");'";
            ?>
            <div class="item <?php if(0 == $quevia_slider_query->current_post ) echo "active"; ?>" <?php echo $quevia_slider_inline_styles ?>>
                <div class="carousel-caption col-xs-12 <?php echo Quevia\get_caption_color_class(); ?>">
                    <h3 class="entry-title"><a class="navbar-link" href="<?php the_permalink(); ?>" ><?php the_title(); ?></a></h3>
                    <div class="hidden-xs text-center navbar-text carousel-caption-body"><?php the_excerpt(); ?></div>
                </div>
            </div>

        <?php endwhile; ?>
    <?php else: ?>
        <div class="item active replacement-header" ></div>
    <?php endif; ?>
    </div>
    <?php  wp_reset_postdata(); ?>

    <?php if ($quevia_slider_query->have_posts() && $quevia_slider_query->post_count>1) : ?>
        <a class="left carousel-control" href="#home-carousel" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
        </a>
        <a class="right carousel-control" href="#home-carousel" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
        </a>
    <?php endif; ?>
</div>
