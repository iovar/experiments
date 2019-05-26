<?php
namespace Quevia;

class Walker_Bootstrap_Comment extends \Walker_Comment{

	protected function html5_comment( $comment, $depth, $args ) {
        $tag = ( 'div' === $args['style'] ) ? 'div' : 'li';
        $has_children=$args['has_children'];
?>
		<<?php echo $tag; ?> id="comment-<?php comment_ID(); ?>" <?php comment_class( empty( $has_children ) ? '' : 'parent' ); ?>>
			<article id="div-comment-<?php comment_ID(); ?>" class="comment-body list-group-item">
				<div class="comment-meta media">
					<a href="<?php get_comment_author_link(); ?>" class="comment-author vcard pull-left">
						<?php if ( 0 != $args['avatar_size'] ) echo get_avatar( $comment, $args['avatar_size'] ); ?>
					</a>
                    <div class="media-body">
                        <div class="media-heading">
                            <?php printf( __( '%s <span class="says">says:</span>', 'quevia' ), sprintf( '<b class="fn">%s</b>', get_comment_author_link() ) ); ?>                   </div>
                        <div class="comment-metadata">
                            <a href="<?php echo esc_url( get_comment_link( $comment->comment_ID ) ); ?>">
                                <time datetime="<?php comment_time( 'c' ); ?>">
                                    <?php printf( _x( '%1$s at %2$s', '1: date, 2: time', 'quevia' ), get_comment_date(), get_comment_time() ); ?>
                                </time>
                            </a>
                            <?php edit_comment_link( __( 'Edit','quevia' ), '<span class="edit-link">', '</span>' ); ?>
                        </div>
                    </div>
                </div>
                <?php if ( '0' == $comment->comment_approved ) : ?>
                    <p class="comment-awaiting-moderation">
                        <?php _e( 'Your comment is awaiting moderation.', 'quevia' ); ?>
                    </p>
                <?php endif; ?>

				<div class="comment-content">
					<?php comment_text(); ?>
				</div>

				<div class="reply clearfix">
					<?php comment_reply_link( array_merge(
                        $args, array( 'add_below' => 'div-comment',
                        'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) ); ?>
                    <?php if(!empty( $has_children ) && get_option('thread_comments_depth') > $depth) : ?>
                        <a href="#" class="show-comment-replies pull-right">
                        (<span class="show-hide"><?php _ex('Show','Show replies to this comment','quevia'); ?></span><span class="show-hide text-hide"><?php _ex('Hide','Hide replies to this comment','quevia'); ?></span> <?php _e('replies to this comment &crarr;', 'quevia'); ?>)
                        </a>
                    <?php endif; ?>
				</div>
			</article>
<?php
	}

}
