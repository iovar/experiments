<?php get_header(); ?>
    <section <?php echo Quevia\section_attributes(); ?> >
        
        <h3 class="text-center">
            <span class="label label-warning"><?php _e('404: Page Not Found!','quevia'); ?></span>
        </h3>
        <div class="text-center">
            <p><br></p>
            <p><em><?php _e('You can use the Search to try and find what you were looking for:','quevia'); ?></em><p>
            <div><?php echo get_search_form(); ?></div>
            <p class="clearfix"><br></p>

            <p><em><?php _e('Or maybe you prefer to go back to the','quevia'); ?></em></p>
            <h3><a href="<?php home_url('/'); ?>" ><?php _e('Homepage','quevia'); ?></a></h3>
            <p><em><?php _e('and try to find your way from there.','quevia'); ?></em><p>
        </div>
    </section> <!--div.col-9 -->
    <?php get_sidebar(); ?>
<?php  get_footer(); ?>
