<div class="post-meta text-muted">
    <div class="alignright"><?php edit_post_link(); ?></div>
    <?php if (!is_page()) : ?>
        <?php $quevia_time_posted = get_the_time();
              $quevia_date_posted = get_the_date(); 
              $quevia_post_title = get_the_title();      
        ?>
        <?php if(empty($quevia_post_title) || has_post_format('status') || has_post_format('aside') || has_post_format('quote') ): ?>
            <?php $quevia_time_posted = "<a href='".get_permalink()."'>".$quevia_time_posted;
                  $quevia_date_posted .= "</a>";
            ?>
        <?php endif; ?>
        <div><?php printf( __('by %1$s at %2$s, %3$s.', 'quevia'),
                 "<a href='".get_author_posts_url(get_the_author_meta('ID'))."'>".get_the_author()."</a>",
                $quevia_time_posted, $quevia_date_posted ); ?></div>
        <?php if ( !is_single() ) : ?>
            <div> <?php comments_popup_link(false, false, false, '',''); ?> </div>
        <?php endif; ?>
        <?php if ( is_single() ) : ?>
            <div><?php printf( __('Posted in %1$s. %2$s', 'quevia'), get_the_category_list(", "),
                    get_the_tag_list(__('Tags: ', 'quevia'), ', ')); ?></div>
        <?php endif; ?>
    <?php endif; ?>
</div>
