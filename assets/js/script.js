$(document).ready(function () {

    if (localStorage.getItem('tasks')) {
        var storedTasks = JSON.parse(localStorage.getItem('tasks'));
        $('#task-list').html(storedTasks);
    }

    $('#add-task-btn').click(function () {
        $('#task-form').removeClass('hidden');
    });
    // Add task event listener
    $('#task-form').submit(function (e) {
        e.preventDefault(); // Prevent form submission

        // Get task details from input fields
        var title = $('#task-title').val();
        var description = $('#task-description').val();
        var assignedTo = $('#task-assigned-to').val();
        var createdDate = $('#task-created-date').val();
        var dueDate = $('#task-due-date').val();

        // Create a new task element
        var taskElement = $('<div class="col-md-4"><div class="card mb-3 task-card"><div class="card-body"><h5 class="card-title">' + title + '</h5><p class="card-text"><span class="fst-italic">Details</span>: ' + description + '</p><br><p class="card-text task-assigned"><span class="fst-italic">Assigned to</span>: ' + assignedTo + '</p><p class="card-text task-created"><span class="fst-italic">Created Date</span>: ' + createdDate + '</p><p class="card-text task-due"><span class="fst-italic">Due Date</span>: ' + dueDate + '</p><div class ="card-actions"><button class="btn btn-link mark-done-btn"><i class="fas fa-check"></i></button><button class="btn btn-link delete-btn"><i class="fas fa-trash-alt"></i></button></div></div></div></div>');

        // Append the task element to the task list
        $('#task-list').append(taskElement);

        // Clear input fields
        $('#task-title').val('');
        $('#task-description').val('');
        $('#task-assigned-to').val('');
        $('#task-created-date').val('');
        $('#task-due-date').val('');

        var storedTasks = $('#task-list').html();
        localStorage.setItem('tasks', JSON.stringify(storedTasks));

        $('#task-form').addClass('hidden');
    });

    // Delete task event listener
    $('#task-list').on('click', '.delete-btn', function () {
        $(this).closest('.card').parent().remove();

        var storedTasks = $('#task-list').html();
        localStorage.setItem('tasks', JSON.stringify(storedTasks));

    });

    // Mark as done event listener
    $('#task-list').on('click', '.mark-done-btn', function () {
        var card = $(this).closest('.card');
        card.addClass('done-task'); // Adds a class to change the background color
        card.find('.mark-done-btn').remove(); // Removes the "Mark as Done" button
        card.prepend('<div class="done-label">Done</div>'); // Adds the "Done" label at the top right of the card

        var storedTasks = $('#task-list').html();
        localStorage.setItem('tasks', JSON.stringify(storedTasks));

    });
});