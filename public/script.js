var selectedRecordId = -1;
$(".edit-record").click(function (e) {
    const id = e.target.parentNode.parentNode.children[0].innerText;
    const title = e.target.parentNode.parentNode.children[1].innerText;
    const description = e.target.parentNode.parentNode.children[2].innerText;
    $("#record-id-input").val(id);
    $("#record-title-input").val(title);
    $("#record-description-textarea").val(description);
});

$(".delete-record").click(function (e) {
    const id = e.target.parentNode.parentNode.children[0].innerText;
    $.ajax({url: `/records/${id}`, type: "DELETE", success: function() {
        document.location.reload();
    }});
});

$("#save-btn").click(function (e) {
    e.preventDefault();

    const id = +$("#record-id-input").val();
    const title = $("#record-title-input").val();
    const description = $("#record-description-textarea").val();

    if (!id || id <= 0) {
        $.post("/records", { title: title, description: description }).done(function () {
            document.location.reload();
        });
    } else {
        $.ajax({
            url: `/records/${id}`, type: "PUT", data: { title: title, description: description }, success: function () {
                $("#record-id-input").val(-1)
                document.location.reload();
            }
        });
    }


})