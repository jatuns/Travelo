$(document).ready(function() {
    // Initialize Materialize components
    $('.modal').modal();
    
    // Game variables
    let packedItems = [];
    let gameTimer = null;
    let timeLeft = 60; // 60 seconds to pack
    let currentScore = 0;
    let isGameActive = false;
    
    // Game items for different destinations
    const gameItems = {
        beach: [
            { name: 'Swimsuit', type: 'essential', icon: 'fas fa-tshirt' },
            { name: 'Sunscreen', type: 'essential', icon: 'fas fa-pump-soap' },
            { name: 'Beach Towel', type: 'essential', icon: 'fas fa-bath' },
            { name: 'Sunglasses', type: 'essential', icon: 'fas fa-glasses' },
            { name: 'Flip Flops', type: 'essential', icon: 'fas fa-shoe-prints' },
            { name: 'Hat', type: 'optional', icon: 'fas fa-hat-cowboy' },
            { name: 'Beach Bag', type: 'optional', icon: 'fas fa-shopping-bag' },
            { name: 'Snorkel Gear', type: 'optional', icon: 'fas fa-swimmer' },
            { name: 'Book', type: 'optional', icon: 'fas fa-book' },
            { name: 'Winter Coat', type: 'unnecessary', icon: 'fas fa-mitten' },
            { name: 'Ski Boots', type: 'unnecessary', icon: 'fas fa-skiing' },
            { name: 'Business Suit', type: 'unnecessary', icon: 'fas fa-user-tie' }
        ],
        mountain: [
            { name: 'Hiking Boots', type: 'essential', icon: 'fas fa-hiking' },
            { name: 'Backpack', type: 'essential', icon: 'fas fa-luggage-cart' },
            { name: 'Water Bottle', type: 'essential', icon: 'fas fa-flask' },
            { name: 'Warm Jacket', type: 'essential', icon: 'fas fa-tshirt' },
            { name: 'First Aid Kit', type: 'essential', icon: 'fas fa-first-aid' },
            { name: 'Map/GPS', type: 'optional', icon: 'fas fa-map-marked-alt' },
            { name: 'Hiking Poles', type: 'optional', icon: 'fas fa-walking' },
            { name: 'Camera', type: 'optional', icon: 'fas fa-camera' },
            { name: 'Flashlight', type: 'optional', icon: 'fas fa-lightbulb' },
            { name: 'Swimsuit', type: 'unnecessary', icon: 'fas fa-tshirt' },
            { name: 'Dress Shoes', type: 'unnecessary', icon: 'fas fa-shoe-prints' },
            { name: 'Evening Gown', type: 'unnecessary', icon: 'fas fa-female' }
        ],
        city: [
            { name: 'Comfortable Shoes', type: 'essential', icon: 'fas fa-shoe-prints' },
            { name: 'City Map', type: 'essential', icon: 'fas fa-map' },
            { name: 'Phone Charger', type: 'essential', icon: 'fas fa-plug' },
            { name: 'Day Bag', type: 'essential', icon: 'fas fa-shopping-bag' },
            { name: 'Camera', type: 'essential', icon: 'fas fa-camera' },
            { name: 'Travel Guide', type: 'optional', icon: 'fas fa-book-open' },
            { name: 'Umbrella', type: 'optional', icon: 'fas fa-umbrella' },
            { name: 'Dress Clothes', type: 'optional', icon: 'fas fa-tshirt' },
            { name: 'Light Jacket', type: 'optional', icon: 'fas fa-vest' },
            { name: 'Snorkel Gear', type: 'unnecessary', icon: 'fas fa-swimmer' },
            { name: 'Fishing Rod', type: 'unnecessary', icon: 'fas fa-fish' },
            { name: 'Tent', type: 'unnecessary', icon: 'fas fa-campground' }
        ],
        safari: [
            { name: 'Binoculars', type: 'essential', icon: 'fas fa-binoculars' },
            { name: 'Khaki Clothes', type: 'essential', icon: 'fas fa-tshirt' },
            { name: 'Hat', type: 'essential', icon: 'fas fa-hat-cowboy' },
            { name: 'Insect Repellent', type: 'essential', icon: 'fas fa-bug' },
            { name: 'Camera', type: 'essential', icon: 'fas fa-camera' },
            { name: 'Hiking Boots', type: 'optional', icon: 'fas fa-hiking' },
            { name: 'Sunscreen', type: 'optional', icon: 'fas fa-pump-soap' },
            { name: 'Water Bottle', type: 'optional', icon: 'fas fa-flask' },
            { name: 'First Aid Kit', type: 'optional', icon: 'fas fa-first-aid' },
            { name: 'Evening Gown', type: 'unnecessary', icon: 'fas fa-female' },
            { name: 'Surfboard', type: 'unnecessary', icon: 'fas fa-water' },
            { name: 'Ski Gear', type: 'unnecessary', icon: 'fas fa-skiing' }
        ]
    };
    
    // Weather info for destinations
    const weatherInfo = {
        beach: '<p><strong>Typical Weather:</strong> Warm and sunny, temperatures around 27-32°C, occasional brief rain showers.</p>',
        mountain: '<p><strong>Typical Weather:</strong> Cool to cold, varying depending on altitude. Temperatures can range from 4-21°C during the day, dropping at night.</p>',
        city: '<p><strong>Typical Weather:</strong> Varies by city and season. Check the forecast for your specific destination before packing.</p>',
        safari: '<p><strong>Typical Weather:</strong> Hot and dry during the day 27-32°C, cooler at night. Seasonal variations may include rainy periods.</p>'
    };
    
    // Handle destination selection
    $('#destination-select').change(function() {
        const destination = $(this).val();
        if (destination) {
            setupGame(destination);
        }
    });
    
    // Start the game with the selected destination
    $('#start-game-btn').click(function() {
        const destination = $('#destination-select').val();
        if (destination) {
            $('#destination-selection').slideUp();
            startGame(destination);
        } else {
            $('#game-message').text('Please select a destination first!').removeClass('green-text').addClass('red-text');
        }
    });
    
    // Start the game
    function startGame(destination) {
        setupGame(destination);
        startTimer();
        isGameActive = true;
        currentScore = 0;
        updateScoreDisplay();
        
        // Show the timer and game board
        $('.timer-container').show();
        $('#game-board').fadeIn();
    }
    
    // Set up the game based on the selected destination
    function setupGame(destination) {
        // Reset game
        packedItems = [];
        $('#suitcase').empty().append('<div class="suitcase-image"><i class="fas fa-suitcase"></i></div>');
        $('#game-message').text('');
        $('.score-container').show();
        
        // Update weather info
        $('#weather-info').html(weatherInfo[destination]);
        
        // Populate items list
        const items = gameItems[destination];
        let itemsHTML = '';
        
        // Shuffle the items
        const shuffledItems = shuffleArray([...items]);
        
        shuffledItems.forEach((item, index) => {
            itemsHTML += `
                <div class="item" data-type="${item.type}" data-name="${item.name}">
                    <i class="${item.icon}"></i>
                    <span>${item.name}</span>
                </div>
            `;
        });
        
        $('#items-list').html(itemsHTML);
        
        // Make items draggable
        $('.item').draggable({
            containment: '#game-board',
            stack: '.item',
            revert: 'invalid',
            start: function(event, ui) {
                $(this).css('z-index', 100);
            }
        });
        
        // Make suitcase droppable
        $('#suitcase').droppable({
            accept: '.item',
            drop: function(event, ui) {
                const item = ui.draggable;
                const itemName = item.data('name');
                const itemType = item.data('type');
                
                // Add to packed items if not already packed
                if (!packedItems.some(i => i.name === itemName)) {
                    // Check if item is unnecessary
                    if (itemType === 'unnecessary') {
                        // Show error message and reduce score
                        $('#game-message').html(`<i class="material-icons red-text">cancel</i> "${itemName}" is not needed for this trip! -10 points`).removeClass('green-text').addClass('red-text');
                        updateScore(-10);
                        
                        // Return the item with animation
                        item.draggable('option', 'revert', true);
                        setTimeout(function() {
                            item.draggable('option', 'revert', 'invalid');
                        }, 500);
                        
                        // Shake the suitcase
                        $('#suitcase').effect('shake', { times: 2, distance: 5 }, 300);
                        return;
                    }
                    
                    // Add points for correct items
                    if (itemType === 'essential') {
                        $('#game-message').html(`<i class="material-icons green-text">check_circle</i> Great choice! "${itemName}" is essential! +20 points`).removeClass('red-text').addClass('green-text');
                        updateScore(20);
                    } else if (itemType === 'optional') {
                        $('#game-message').html(`<i class="material-icons blue-text">check_circle</i> Good choice! "${itemName}" might be useful! +10 points`).removeClass('red-text').addClass('green-text');
                        updateScore(10);
                    }
                    
                    packedItems.push({
                        name: itemName,
                        type: itemType
                    });
                    
                    // Clone the item and position it randomly in the suitcase
                    const suitcaseWidth = $('#suitcase').width() - item.width();
                    const suitcaseHeight = $('#suitcase').height() - item.height();
                    
                    const randomX = Math.random() * suitcaseWidth;
                    const randomY = Math.random() * suitcaseHeight;
                    
                    const clone = item.clone()
                        .appendTo('#suitcase')
                        .css({
                            position: 'absolute',
                            top: randomY,
                            left: randomX,
                            'z-index': 10
                        })
                        .addClass('packed')
                        .removeClass('ui-draggable ui-draggable-handle')
                        .draggable({
                            containment: '#suitcase',
                            stack: '.packed'
                        });
                    
                    // Add remove functionality to packed items
                    clone.click(function() {
                        const removedItemName = $(this).data('name');
                        const removedItem = packedItems.find(i => i.name === removedItemName);
                        
                        if (removedItem) {
                            // Lose points when removing items
                            if (removedItem.type === 'essential') {
                                updateScore(-10);
                                $('#game-message').html(`<i class="material-icons orange-text">warning</i> You removed an essential item! -10 points`).removeClass('green-text').addClass('orange-text');
                            } else if (removedItem.type === 'optional') {
                                updateScore(-5);
                                $('#game-message').html(`<i class="material-icons orange-text">warning</i> You removed a useful item! -5 points`).removeClass('green-text').addClass('orange-text');
                            }
                        }
                        
                        packedItems = packedItems.filter(i => i.name !== removedItemName);
                        $(this).remove();
                        
                        // Show original item again
                        $('.item').each(function() {
                            if ($(this).data('name') === removedItemName) {
                                $(this).show();
                            }
                        });
                    });
                    
                    // Hide original item
                    item.hide();
                }
            }
        });
    }
    
    // Start the timer
    function startTimer() {
        // Reset timer
        timeLeft = 60;
        updateTimerDisplay();
        
        // Clear any existing timer
        if (gameTimer) {
            clearInterval(gameTimer);
        }
        
        // Start new timer
        gameTimer = setInterval(function() {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(gameTimer);
                endGame("Time's up!");
            }
        }, 1000);
    }
    
    // Update timer display
    function updateTimerDisplay() {
        $('.timer').text(timeLeft);
        
        // Change color based on time remaining
        if (timeLeft <= 10) {
            $('.timer').addClass('red-text').removeClass('orange-text blue-text');
        } else if (timeLeft <= 30) {
            $('.timer').addClass('orange-text').removeClass('red-text blue-text');
        } else {
            $('.timer').addClass('blue-text').removeClass('red-text orange-text');
        }
    }
    
    // Update score
    function updateScore(points) {
        currentScore += points;
        if (currentScore < 0) currentScore = 0;
        updateScoreDisplay();
    }
    
    // Update score display
    function updateScoreDisplay() {
        $('.score').text(currentScore);
    }
    
    // End the game
    function endGame(reason) {
        isGameActive = false;
        clearInterval(gameTimer);
        
        const destination = $('#destination-select').val();
        const finalScore = calculateScore(destination);
        
        // Display score and feedback
        $('#final-score').text(finalScore);
        $('#time-bonus').text(timeLeft > 0 ? timeLeft : 0);
        $('#final-points').text(currentScore);
        
        let scoreMessage = '';
        if (finalScore >= 90) {
            scoreMessage = 'Perfect! You packed like a pro traveler!';
        } else if (finalScore >= 70) {
            scoreMessage = 'Good job! Your packing skills are solid.';
        } else if (finalScore >= 50) {
            scoreMessage = 'Not bad, but you could improve your packing choices.';
        } else {
            scoreMessage = 'You might want to reconsider your packing strategy.';
        }
        
        // Show missed essential items
        const destination_items = gameItems[destination];
        const essentialItems = destination_items.filter(item => item.type === 'essential');
        const packedEssentialNames = packedItems.filter(item => item.type === 'essential').map(item => item.name);
        const missedEssentials = essentialItems.filter(item => !packedEssentialNames.includes(item.name));
        
        let missedItemsHtml = '';
        if (missedEssentials.length > 0) {
            missedItemsHtml = '<p>You missed these essential items:</p><ul>';
            missedEssentials.forEach(item => {
                missedItemsHtml += `<li>${item.name}</li>`;
            });
            missedItemsHtml += '</ul>';
        }
        
        $('#missed-items').html(missedItemsHtml);
        $('#score-message').text(scoreMessage);
        $('#game-over-reason').text(reason);
        $('#success-modal').modal('open');
    }
    
    // Handle "Ready to Go" button
    $('#ready-btn').click(function() {
        if (!isGameActive) return;
        
        if (packedItems.length === 0) {
            $('#game-message').text('Your suitcase is empty! You need to pack some items.').removeClass('green-text').addClass('red-text');
            return;
        }
        
        endGame("You're ready to travel!");
    });
    
    // Handle reset button
    $('#reset-btn').click(function() {
        const destination = $('#destination-select').val();
        clearInterval(gameTimer);
        startGame(destination);
    });
    
    // Calculate score based on packing choices
    function calculateScore(destination) {
        const items = gameItems[destination];
        let score = 0;
        let maxScore = 0;
        
        // Count essential items
        const essentialItems = items.filter(item => item.type === 'essential');
        maxScore += essentialItems.length * 20;
        
        // Count optional items
        const optionalItems = items.filter(item => item.type === 'optional');
        maxScore += optionalItems.length * 10;
        
        // Add current points from game play
        score = currentScore;
        
        // Add time bonus (1 point per second left)
        if (timeLeft > 0) {
            score += timeLeft;
        }
        
        // Make sure score is not negative
        score = Math.max(0, score);
        
        // Convert to percentage (max possible is 100)
        const finalScore = Math.min(100, Math.round((score / (maxScore + 60)) * 100));
        
        return finalScore;
    }
    
    // Helper function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}); 