<?php get_header(); ?>
    <section <?php echo Quevia\section_attributes(); ?> >
        <?php if( ! have_posts() ) : ?>
            <article>
                <p>
                    <?php _e('Sorry... no results found!','quevia'); ?>
                </p>
            </article>
        <?php else: ?>
            <?php while ( have_posts() ) : the_post() ; ?>
                <?php get_template_part('article','main'); ?>
            <?php endwhile; ?>
        <?php endif; ?>
    </section> <!--div.col-9 -->
    <?php get_sidebar(); ?>
<?php  get_footer(); ?>