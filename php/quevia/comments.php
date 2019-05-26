<?php if(post_password_required())  return; ?>

<section id="comments" class="comments-area" >

<?php if(have_comments()) : ?>
    <h4 class="comments-title">
        <?php printf( __( 'Comments (%1$s) :', 'quevia' ), get_comments_number() ); ?>
    </h4>
    <ul class="comment-list list-group">
        <?php wp_list_comments( array('walker'=> new Quevia\Walker_Bootstrap_Comment()) ); ?>
    </ul>
    <?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : ?>
    	<nav class="navigation text-center" >
            <ul class="pagination">
                <div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'quevia' ) ); ?></div>
                <div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'quevia' ) ); ?></div>
            </ul>
		</nav>
		<?php endif;  ?>

		<?php if ( ! comments_open() && get_comments_number() ) : ?>
        <p><strong><?php _e( 'Comments are closed.' , 'quevia' ); ?></strong></p>
		<?php endif; ?>

<?php elseif( comments_open()): ?>
    <h4>
        <?php printf( __( 'No comments posted yet.','quevia' )); ?>
    </h4>
<?php endif; ?>
<?php //print nothing when comments are closed from the start ?>

<?php comment_form(array('format'=>'html5', 'comment_notes_after'=>'')); ?>

</section>
