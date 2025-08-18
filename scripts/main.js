$(document).ready(function() {
    // Initialize dropdowns
    $('.dropdown-trigger').dropdown();
    
    // Initialize tooltips
    $('.tooltipped').tooltip();
    
    // Initialize modals
    $('.modal').modal();
    
    // Initialize tabs - simple initialization
    $('.tabs').tabs();
    
    // Initialize collapsible elements
    $('.collapsible').collapsible();
    
    // Initialize sidenav
    $('.sidenav').sidenav();
    
    // Animation for home page elements
    if ($('.hero-section').length) {
        $('.hero-section h1').animate({
            opacity: 1
        }, 1000);
        
        $('.hero-section p').delay(500).animate({
            opacity: 1
        }, 1000);
        
        $('.hero-section a').delay(1000).animate({
            opacity: 1
        }, 1000);
    }
}); 