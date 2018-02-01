if (typeof module === 'object') {
    window.jQuery = window.$ = module.exports;
}
document.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $("#holder").html("Drag your file here");
    for (let f of e.dataTransfer.files) {
    console.log('File(s) you dragged here: ', f.path)
    s = $("#holder").html();
    $("#holder").html(s+" "+f.path);
    }
});
document.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
});