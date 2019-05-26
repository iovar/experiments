<?php get_header(); ?>
    <section <?php echo Quevia\section_attributes(); ?> >
        <?php if( ! have_posts() ) : ?>
            <article>
                <p>
                    <?php _e('Sorry... no results found!','quevia'); ?>
                </p>
            </article>
        <?php else: ?>
            <?php if(is_search()) : ?>
                <h3 class="archive-header">Showing results for: <em><?php the_search_query(); ?></em></h3>
            <?php elseif(is_category()) : ?>
                <h3 class="archive-header"><?php echo single_cat_title( __('Showing posts in category: ', 'quevia').'<em>', false).'</em>'; ?></h3>
            <?php elseif(is_tag()) : ?>
                <h3 class="archive-header"><?php echo single_tag_title( __('Showing posts with tag: ', 'quevia').'<em>', false).'</em>'; ?></h3>
            <?php elseif(is_author()) : ?>
                    <?php $curauth = (isset($_GET['author_name'])) ? get_user_by('slug', $author_name) : get_userdata(intval($author)); ?>
                <h3 class="archive-header"><?php printf( __('Showing posts by author: <em>%1$s</em>', 'quevia'), $curauth->nickname); ?></h3>
            <?php endif ?>
            <?php get_template_part('loop','main'); ?>
        <?php endif; ?>
        <?php get_template_part('nav','pages'); ?>
    </section> <!--div.col-9 -->
    <?php get_sidebar(); ?>
<?php  get_footer(); ?>



