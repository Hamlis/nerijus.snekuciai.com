var SERVER_ENDPOINT = 'http://martynas.snekuciai.com/';

function NewsFrontCtrl($scope, $http) {
  $scope.categories = [];
  $scope.error = null;
  
  $http.get(SERVER_ENDPOINT + 'news.json')
	.success(function(data){
		$scope.categories = data._embedded.category;
	})
	.error(function(){
		$scope.error = "Netiketa klaida, bandykite atnaujinti puslapi.";
	});
}
NewsFrontCtrl.$inject = ['$scope', '$http'];

function NewsListCtrl($scope, $routeParams, $http) {
	var url = SERVER_ENDPOINT + 'news/category/' + $routeParams.category + '.json';
	$scope.category = null;
	$scope.error = null;
	$scope.currentPage = 0;
	$scope.total_pages = 1;
	$scope.pagedItems = [];
	
	$scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };
	
	$scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };
	
	$scope.$watch('currentPage', function() {
		if($scope.pagedItems[$scope.currentPage] && $scope.pagedItems[$scope.currentPage].length == 0) {
			$http.get(url+'?page='+($scope.currentPage+1))
				.success(function(data){
					$scope.pagedItems[parseInt(data.page)-1] = data._embedded.article;
				});
		}
    }, false);
	
	$http.get(url)
		.success(function(data){
			$scope.pagedItems = [];
			$scope.currentPage = parseInt(data.page)-1;
			$scope.total_pages = parseInt(data.total_pages);
			$scope.category = data;
			for(var i=0; i < data.total_pages; i++) {
				$scope.pagedItems[i] = [];
			}
			$scope.pagedItems[$scope.currentPage] = data._embedded.article;
		});
}
NewsListCtrl.$inject = ['$scope', '$routeParams', '$http'];

function NewsDetailCtrl() {
}