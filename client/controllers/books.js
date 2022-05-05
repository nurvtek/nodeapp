var myApp = angular.module("myApp");

myApp.controller("BooksController", ["$scope", "$http", "$location", "$routeParams", function ($scope, $http, $location, $routeParams) {

    $scope.getBooks = function () {
        $http.get("/api/books").success(function (response) {
            $scope.books = response;
        });
    };

    $scope.getBook = function () {
        //get parameter id from url route
        var id = $routeParams.id;

        $http.get("/api/books/" + id).success(function (response) {
            $scope.book = response;
        });
    };

    $scope.addBook = function () {
        $http.post("/api/books/", $scope.book).success(function (response) {
            window.location.href="#/books";
        });
    };

    $scope.updateBook = function () {
        //get parameter id from url route
        var id = $routeParams.id;
        $http.put("/api/books/" + id, $scope.book).success(function (response) {
            window.location.href="#/books";
        });
    };

    $scope.deleteBook = function (bookId) {
        $http.delete("/api/books/" + bookId).success(function (response) {
            window.location.href="#/books";
        });
    };

}]);