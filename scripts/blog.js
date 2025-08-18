$(document).ready(function() {
    // Handle comment form submission
    $('#comment-form').submit(function(e) {
        e.preventDefault();
        
        // Get form values
        var name = $('#comment-name').val();
        var email = $('#comment-email').val();
        var commentText = $('#comment-text').val();
        
        // Get current date
        var currentDate = new Date();
        var dateString = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Create new comment HTML
        var newComment = `
            <div class="comment">
                <div class="comment-author">${name}</div>
                <div class="comment-date">${dateString}</div>
                <p>${commentText}</p>
            </div>
        `;
        
        // Add the new comment to the top of the comments list with animation
        $('#comments-list').prepend(newComment);
        $('#comments-list .comment:first-child').hide().slideDown(500);
        
        // Clear the form
        $('#comment-form')[0].reset();
        
        // Show success message with Materialize toast
        M.toast({html: 'Comment added successfully!', classes: 'green', displayLength: 3000});
    });
    
    // Search blog functionality
    $('#search').on('keyup', function() {
        var searchValue = $(this).val().toLowerCase();
        
        // If search box is empty, show all posts
        if (searchValue === "") {
            $('.blog-post').show();
            return;
        }
        
        // Otherwise, filter posts based on title and content
        $('.blog-post').each(function() {
            var title = $(this).find('.blog-title').text().toLowerCase();
            var content = $(this).find('p').text().toLowerCase();
            
            if (title.indexOf(searchValue) > -1 || content.indexOf(searchValue) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    
    // Newsletter subscription
    $('button:contains("Subscribe")').click(function() {
        var email = $('#newsletter-email').val();
        
        if (email && validateEmail(email)) {
            // Clear the email field
            $('#newsletter-email').val('');
            
            // Show success message
            M.toast({html: 'Thanks for subscribing!', classes: 'green', displayLength: 3000});
        } else {
            // Show error message
            M.toast({html: 'Please enter a valid email address', classes: 'red', displayLength: 3000});
        }
    });
    
    // Email validation function
    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}); 