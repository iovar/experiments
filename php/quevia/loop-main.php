<?php while ( have_posts() ) : the_post() ; ?>
    <article <?php post_class((is_sticky()?'well':'').' index-entry'); ?> >
        <?php if ( has_post_thumbnail() && (is_archive() || is_search() ||
                has_post_format('status') || has_post_format('aside') || has_post_format('quote') ||
                has_post_format('link'))
                && !(has_post_format('image') || has_post_format('gallery'))) : ?>
            <div class="media">
                <a href="<?php the_permalink(); ?>" class='pull-left'>
                    <?php the_post_thumbnail('thumbnail', array('class'=>'img-thumbnail media-object')); ?>
                </a>
                <div class='media-body'>
                    <div class='media-heading'>
                        <h3 class="entry-title"><a href="<?php the_permalink(); ?>" ><?php the_title(); ?></a></h3>
                    </div>
                    <?php get_template_part('content'); ?>
                </div>
            </div>
        <?php else : ?>
            <?php if ( has_post_thumbnail() && !has_post_format('image')) the_post_thumbnail(); ?>
            <h2 class="entry-title"><a href="<?php the_permalink(); ?>" ><?php the_title(); ?></a></h2>
            <?php get_template_part('content'); ?>
        <?php endif; ?>
        <?php get_template_part('meta'); ?>
        <?php comments_template(); ?>
    </article>
<?php endwhile; ?>
