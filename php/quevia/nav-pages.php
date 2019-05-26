<nav class="navigation text-center hidden-xs">
    <ul class="pagination">
        <li><?php previous_posts_link(__('&laquo; More recent posts','quevia') ); ?></li>
<?php
    global $wp_query;

    $big = 999999999;

    $page_links = paginate_links( array(
        'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
        'format' => '?paged=%#%',
        'current' => max( 1, get_query_var('paged') ),
        'prev_next'=>false,
        'total' => $wp_query->max_num_pages,
        'type'=>'array'
    ) );
    if(! empty($page_links) ){
        foreach ($page_links as $link){
            echo "<li>$link</li>";
        }
    }
?>
        <li ><?php next_posts_link(__('Older posts &raquo;', 'quevia')); ?></li>
    </ul>
</nav>
<nav class="navigation text-center visible-xs">
    <ul class="pagination">
        <li><?php previous_posts_link(__('&laquo; More recent posts', 'quevia') ); ?></li>
        <li ><?php next_posts_link(__('Older posts &raquo;', 'quevia') ); ?></li>
    </ul>
</nav>
