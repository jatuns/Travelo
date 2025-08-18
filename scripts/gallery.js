$(document).ready(function() {
    // Add active class to filter buttons on click
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Get the filter value
        var filterValue = $(this).data('filter');
        
        // Show all items if "all" is selected, otherwise filter
        if (filterValue === 'all') {
            $('.gallery-item').fadeIn(300);
        } else {
            $('.gallery-item').hide();
            $('.gallery-item[data-category="' + filterValue + '"]').fadeIn(300);
        }
    });
    
    // Initialize Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'disableScrolling': true,
        'fadeDuration': 300
    });
    
    // Animate gallery items when they come into view
    $(window).scroll(function() {
        $('.gallery-item').each(function() {
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            
            if (imagePos < topOfWindow + $(window).height() - 100) {
                $(this).addClass('animated');
            }
        });
    });
    
    // Add animated class with a delay for a staggered effect
    $('.gallery-item').each(function(index) {
        var $item = $(this);
        setTimeout(function() {
            $item.css('opacity', '1');
        }, index * 100);
    });
}); 