<?php

    global $quevia_slider_query;
    if(!isset($quevia_slider_query))
        $quevia_slider_query= new WP_Query(Quevia\slider_query_attributes());
    else
        $quevia_slider_query->rewind_posts ();

    $quevia_tiles_per_row = Quevia\home_tiles_per_row() ;

    $quevia_last_row_tiles = $quevia_slider_query->post_count % $quevia_tiles_per_row ;
    $quevia_cols_per_tile=  intval(12/$quevia_tiles_per_row);
    $quevia_tile_classes=" col-xs-12 col-sm-$quevia_cols_per_tile ";
    if($quevia_last_row_tiles != 0 ){
        $quevia_last_row_cols_per_tile=(($quevia_last_row_tiles*$quevia_cols_per_tile)%2)?$quevia_cols_per_tile+1:$quevia_cols_per_tile;
        $quevia_last_row_offset= intval((12-$quevia_last_row_tiles*$quevia_last_row_cols_per_tile)/2);
        $quevia_tile_push_classes=" col-sm-offset-$quevia_last_row_offset ";
        $quevia_last_row_tile_classes = " col-xs-12 col-sm-$quevia_last_row_cols_per_tile ";
    }
    else {
        $quevia_tile_push_classes=" ";
        $quevia_last_row_tile_classes  = $quevia_tile_classes;
    }
    $quevia_tiles_all_classes="";

    ?>
    <div class="tiles">
    <?php while( $quevia_slider_query->have_posts()) : $quevia_slider_query->the_post(); ?>
        <?php
            if($quevia_slider_query->post_count - $quevia_slider_query->current_post <= $quevia_last_row_tiles){
                $quevia_tiles_all_classes=$quevia_last_row_tile_classes.$quevia_tile_push_classes;
                $quevia_tile_push_classes="";
            }
            else
                $quevia_tiles_all_classes=$quevia_tile_classes;
            if (has_post_thumbnail() ){
               $quevia_tile_inline_styles="style='background-image: url("
                   .preg_replace(QUEVIA_URL_REGEX,'${1}', get_the_post_thumbnail () ).");'";
            }
            else{
                $quevia_tile_inline_styles="style='background-image: url("
                   .get_header_image().");'";
            }
           ?>
            <div class="item <?php echo $quevia_tiles_all_classes; ?>" <?php echo $quevia_tile_inline_styles; ?> >
                <h4 class="entry-title col-xs-12 <?php echo Quevia\get_caption_color_class(); ?>"><a class="navbar-link" href="<?php the_permalink(); ?>" ><?php the_title(); ?></a></h4>
            </div>
    <?php endwhile; ?>
    </div>
    <?php  wp_reset_postdata(); ?>

