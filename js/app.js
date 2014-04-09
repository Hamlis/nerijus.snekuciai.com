angular.module('nerijus', ['ngSanitize']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/news', {templateUrl: 'partials/news-front.html', controller: NewsFrontCtrl}).
      when('/news/:category', {templateUrl: 'partials/news-list.html', controller: NewsListCtrl}).
      //when('/news/:category/:slug', {templateUrl: 'partials/news-detail.html', controller: NewsDetailCtrl}).
      otherwise({redirectTo: '/news'});
  }]).
  filter('trimArticle', ['$sanitize', function($sanitize){
    return function(input) {
	  var words = $sanitize(input);
	  if(words.length > 150) {
		  words = words.substring(0, 150).split(' ');
		  words = words.slice(0,words.length-1).join(' ');
      }
	  return words;
	};
  }]);