<article <?php post_class('entry-item'); ?> id='reading-area'>
    <?php if ( has_post_thumbnail() && !has_post_format('image')) the_post_thumbnail('full'); ?>
    <h2 class="entry-title" ><?php the_title(); ?></h2>
    <?php get_template_part('content'); ?>
    <div class="post-pagination">
        <?php wp_link_pages( array(
            'before'=> '<div>'.__( 'Post Pages: ' , 'quevia').'</div><nav class="navigation text-center"><ul class="pagination">',
            'after' => '</ul></nav>', 'separator' => ''))?>
    </div>
    <?php get_template_part('meta'); ?>
    <?php comments_template(); ?>
</article>