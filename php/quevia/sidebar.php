<?php if( Quevia\have_sidebar() ) : ?>
<aside <?php echo Quevia\sidebar_attributes(); ?> >
    <div id="sidebar" class="widget-area panel panel-default">
        <?php if ( ! dynamic_sidebar('main-widget-area') ) : ?>
            <div>
                &nbsp;
            </div>
        <?php endif; ?>
    </div>
</aside>
<?php endif; ?>
