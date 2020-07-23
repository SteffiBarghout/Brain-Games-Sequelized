$(function() {
    $(".change-puzzled").on("click", function(event) {
        var id = $(this).data("id");
        var newPuzzled = $(this).data("newpuzzled");

        var newPuzzledState = {
            puzzled: newPuzzled
        };

        // Send the PUT request.
        $.ajax("/api/braingames/" + id, {
            type: "PUT",
            data: newPuzzledState
        }).then(
            function() {
                console.log("changed puzzled to", newPuzzled);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newPuzzle = {
            puzzle_name: $("#pu").val().trim(),
        };

        // Send the POST request.
        $.ajax("/api/braingames", {
            type: "POST",
            data: newPuzzle
        }).then(
            function() {
                console.log("created new puzzle");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});