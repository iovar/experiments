jQuery(document).ready( function($){


    if($(".comments-area").size()>0){
        $(".comment-form .form-submit input").addClass('btn btn-default');
        $('.comment-list li .children:first-of-type').hide();
        $(".show-comment-replies").on("click", function(evt){
            $(evt.target).closest('article').next('').slideToggle();
            $(evt.target).children('span').toggleClass('text-hide');
            evt.preventDefault();
        });
    }
    if($(".tiles").size()>0){
        $(".tiles").on("click", function(evt){
            if($(evt.target).hasClass('item')){
                var link =$(evt.target).find('a');
                console.log(link.attr('href'));
                window.location=link.attr('href');
            }
        });
    }
    if($(".navbar-collapse").size() > 0 ) {
       $(window).on( "resize" , function () {
           $(".navbar-collapse.in").each( function () {
               $(this).removeClass("in").addClass("collapse");//siblings(".navbar-header").find(".navbar-toggle").trigger("click");
            });
        });
    }

});
