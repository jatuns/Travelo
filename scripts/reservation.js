$(document).ready(function() {
    // Initialize Materialize components
    $('.modal').modal();
    $('select').formSelect();
    $('.datepicker').datepicker({
        format: 'mmmm d, yyyy',
        minDate: new Date(),
        defaultDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        setDefaultDate: true
    });
    
    // Handle form submission
    $('#booking-form').submit(function(e) {
        e.preventDefault();
        
        // Get form values
        var tourPackage = $('#tour-package option:selected').text();
        var firstName = $('#first-name').val();
        var lastName = $('#last-name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var departureDate = $('#departure-date').val();
        var travelers = $('#travelers').val();
        var specialRequests = $('#special-requests').val();
        var addInsurance = $('#add-travel-insurance').is(':checked');
        
        // Build booking summary
        var summaryHTML = `
            <div class="row">
                <div class="col s12">
                    <p><strong>Package:</strong> ${tourPackage}</p>
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Contact:</strong> ${email} | ${phone}</p>
                    <p><strong>Departure Date:</strong> ${departureDate}</p>
                    <p><strong>Number of Travelers:</strong> ${travelers}</p>
                    ${specialRequests ? '<p><strong>Special Requests:</strong> ' + specialRequests + '</p>' : ''}
                    <p><strong>Travel Insurance:</strong> ${addInsurance ? 'Yes (+$99 per person)' : 'No'}</p>
                </div>
            </div>
            <div class="row">
                <div class="col s12">
                    <div class="divider"></div>
                    <h6 class="center-align" style="margin-top:20px;">Booking Summary</h6>
                    <table class="striped">
                        <tbody>
                            <tr>
                                <td>Tour Package:</td>
                                <td>${tourPackage}</td>
                            </tr>
                            <tr>
                                <td>Number of Travelers:</td>
                                <td>${travelers}</td>
                            </tr>
                            ${addInsurance ? 
                                `<tr>
                                    <td>Travel Insurance:</td>
                                    <td>$${99 * travelers}</td>
                                </tr>` : ''}
                            <tr>
                                <td><strong>Total:</strong></td>
                                <td><strong>$${calculateTotal(tourPackage, travelers, addInsurance)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        // Update the summary content and show it
        $('#summary-content').html(summaryHTML);
        $('#booking-form').slideUp();
        $('#booking-summary').slideDown();
    });
    
    // Handle edit booking button
    $('#edit-booking').click(function() {
        $('#booking-summary').slideUp();
        $('#booking-form').slideDown();
    });
    
    // Handle confirm booking button
    $('#confirm-booking').click(function() {
        // Show success modal
        $('#success-modal').modal('open');
        
        // Reset form for next booking
        setTimeout(function() {
            $('#booking-form')[0].reset();
            $('#booking-form').slideDown();
            $('#booking-summary').slideUp();
            $('select').formSelect(); // Reinitialize select inputs
        }, 1000);
    });
    
    // Calculate total based on package, travelers, and insurance
    function calculateTotal(packageName, travelers, insurance) {
        // Extract price from package name (format: "Package Name - $XXXX")
        var priceStr = packageName.split('$')[1];
        var packagePrice = parseInt(priceStr.replace(/,/g, ''));
        
        // Calculate base price
        var total = packagePrice * travelers;
        
        // Add insurance if selected
        if (insurance) {
            total += 99 * travelers;
        }
        
        // Format with commas
        return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}); 