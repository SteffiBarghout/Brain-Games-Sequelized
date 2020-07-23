$(document).ready(function() {
    // Getting a reference to the input field where user adds a new puzzle
    var $newItemInput = $("input.new-item");
    // Our new puzzles will go inside the puzzleContainer
    var $puzzleContainer = $(".puzzle-container");
    // Adding event listeners for deleting, editing, and adding puzzles
    $(document).on("click", "button.delete", deletePuzzle);
    $(document).on("click", "button.complete", toggleComplete);
    $(document).on("click", ".puzzle-item", editPuzzle);
    $(document).on("keyup", ".puzzle-item", finishEdit);
    $(document).on("blur", ".puzzle-item", cancelEdit);
    $(document).on("submit", "#puzzle-form", insertPuzzle);
  
    // Our initial puzzles array
    var puzzles = [];
  
    // Getting puzzles from database when page loads
    getPuzzles();
  
    // This function resets the puzzles displayed with new puzzles from the database
    function initializeRows() {
      $puzzleContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < puzzles.length; i++) {
        rowsToAdd.push(createNewRow(puzzles[i]));
      }
      $puzzleContainer.prepend(rowsToAdd);
    }
  
    // This function grabs puzzles from the database and updates the view
    function getPuzzles() {
      $.get("/api/puzzles", function(data) {
        puzzles = data;
        initializeRows();
      });
    }
  
    // This function deletes a puzzle when the user clicks the delete button
    function deletePuzzle(event) {
      event.stopPropagation();
      var id = $(this).data("id");
      $.ajax({
        method: "DELETE",
        url: "/api/puzzles/" + id
      }).then(getPuzzles);
    }
  
    // This function handles showing the input box for a user to edit a puzzle
    function editPuzzle() {
      var currentPuzzle = $(this).data("puzzle");
      $(this).children().hide();
      $(this).children("input.edit").val(currentPuzzle.text);
      $(this).children("input.edit").show();
      $(this).children("input.edit").focus();
    }
  
    // Toggles complete status
    function toggleComplete(event) {
      event.stopPropagation();
      var puzzle = $(this).parent().data("puzzle");
      puzzle.complete = !puzzle.complete;
      updatePuzzle(puzzle);
    }
  
    // This function starts updating a puzzle in the database if a user hits the "Enter Key"
    // While in edit mode
    function finishEdit(event) {
      var updatedPuzzle = $(this).data("puzzle");
      if (event.which === 13) {
        updatedPuzzle.text = $(this).children("input").val().trim();
        $(this).blur();
        updatePuzzle(updatedPuzzle);
      }
    }
  
    // This function updates a puzzle in our database
    function updatePuzzle(puzzle) {
      $.ajax({
        method: "PUT",
        url: "/api/puzzles",
        data: puzzle
      }).then(getPuzzles);
    }
  
    // This function is called whenever a puzzle item is in edit mode and loses focus
    // This cancels any edits being made
    function cancelEdit() {
      var currentPuzzle = $(this).data("puzzle");
      if (currentPuzzle) {
        $(this).children().hide();
        $(this).children("input.edit").val(currentPuzzle.text);
        $(this).children("span").show();
        $(this).children("button").show();
      }
    }
  
    // This function constructs a Puzzle-item row
    function createNewRow(puzzle) {
      var $newInputRow = $(
        [
          "<li class='list-group-item puzzle-item'>",
          "<span>",
          puzzle.text,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "<button class='complete btn btn-primary'>✓</button>",
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("id", puzzle.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("puzzle", puzzle);
      if (puzzle.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      return $newInputRow;
    }
  
    // This function inserts a new puzzle into our database and then updates the view
    function insertPuzzle(event) {
      event.preventDefault();
      var puzzle = {
        text: $newItemInput.val().trim(),
        complete: false
      };
  
      $.post("/api/puzzles", puzzle, getPuzzles);
      $newItemInput.val("");
    }
  });