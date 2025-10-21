/**
 * if users visit a non-existed page under a book, redirect the request to the book's root.
 * Otherwise, do nothing.
 */
var path = window.location.pathname;
// Split path and remove any empty segments (like the one at the beginning)
var segments = path.split('/').filter(function(segment) { return segment.length != 0 });

if (segments.length > 0) {
    var bookName = segments[0];
    // An array of your valid book directories to prevent redirect loops
    var validBooks = [
        "get_started",
        "zats_essentials",
        "zk_calendar_essentials",
        "zk_charts_essentials",
        "zk_client_side_ref",
        "zk_component_dev_essentials",
        "zk_component_ref",
        "zk_config_ref",
        "zk_dev_ref",
        "zk_essentials",
        "zk_installation_guide",
        "zk_jsp_tags_essentials",
        "zk_mvvm_ref",
        "zk_pivottable_essentials",
        "zk_spring_essentials",
        "zk_studio_essentials",
        "zk_style_customization_guide",
        "zuml_ref"
    ];

    // Check if the extracted segment is a valid book
    if (validBooks.indexOf(bookName) !== -1) {
        // Construct the new URL and redirect
        var redirectUrl = window.location.origin + '/' + bookName + '/';
        window.location.href = redirectUrl;
    }
}