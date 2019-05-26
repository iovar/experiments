<?php if((is_archive() || is_search()) && !get_post_format()) : ?>
    <?php the_excerpt(); ?>
<?php else : ?>
    <div class="entry-content">
        <?php the_content("<small>".__("Read More","quevia")."</small>"); ?>
    </div>
<?php endif ?>
<div class="clearfix"></div>
