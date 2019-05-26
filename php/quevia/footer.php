                </div> <!-- #inner-container -->
            </div> <!-- #outer-container -->
        </div> <!-- wrap -->
        <div id="push"></div>
        <footer id="page-footer" class="<?php echo Quevia\get_footer_color_class(); ?>" >
            <div class="container">
                <div class="row">
                    <div class="navbar-text col-xs-12 widget-area" id="footer-widget-container" >
                        <?php dynamic_sidebar('footer-widget-area') ?>
                    </div>
                </div>
                <div class="row clearfix">
                <div class="col-xs-12 col-sm-12 text-center">
                    <p class="col-xs-12 col-sm-12 text-center navbar-text"> &copy; <?php bloginfo('name'); ?>,  <?php echo date('Y');?>. <?php _e('All Rights Reserved','quevia'); ?></p>
                </div>
                </div>
            </div>
        </footer>
        <?php wp_footer(); ?>
    </body>
</html>

