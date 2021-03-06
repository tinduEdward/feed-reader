/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('check if URL defined and it is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('check if name defined and it is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */

    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    describe('The menu', function () {

        var menuIcon = document.querySelector(".menu-icon-link");

        it('is it hidden', function () {
            expect(document.body.classList).toContain("menu-hidden");
        });


        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('toggles menubar on click', function () {
            document.querySelector('.menu-icon-link').click();
            expect(document.body.classList).not.toContain("menu-hidden");
            document.querySelector('.menu-icon-link').click();
            expect(document.body.classList).toContain("menu-hidden");
        });
    });



    /* TODO: Write a new test suite named "Initial Entries" */

    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */

    describe("Initial Entries", function () {
        // run before test starts
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it("check if there is at least 1 entry after loadFeed function is invoked", function (done) {
            expect(document.querySelector(".feed").getElementsByClassName("entry").length).toBeGreaterThan(0);
            done();
        });

        it("check if it has 1 entry that has a link starting with 'http' or 'https'://'", function (done) {
            var entries_list = document.querySelector(".feed").getElementsByClassName("entry-link");
            for (var i = 0; i < entries_list.length; i++) {
                expect(entries_list[i].href).toMatch(/^(http|https):\/\//);
            }
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */

    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */

    describe("New Feed Selection", function () {
        let initFeedList;
        beforeEach(function (done) {
            loadFeed(0, function () {
                initFeedList = document.querySelector(".feed").innerHTML;
                loadFeed(1, function () {
                    done();
                });
            });
        });

        it("check if loaded content changes", function (done) {
            var newFeedList = document.querySelector(".feed").innerHTML;
            expect(initFeedList).not.toBe(newFeedList);
            done();
        });
    });
}());