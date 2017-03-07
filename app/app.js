/**
 * Created by bjwsl-001 on 2017/1/5.
 */
angular.module('refreshApp',['ionic'])
  .config(function($stateProvider,$urlRouterProvider){
      $stateProvider
        .state('main',{
          url:'/main',
          templateUrl:'tpl/main.html',
          controller:'mainCtr'
        })
        .state('list',{
          url:'/list/:listType',
          templateUrl:'tpl/list.html',
          controller:'listCtr'
        })
        .state('start',{
          url:'/start',
          templateUrl:'tpl/start.html',
          controller:'startCtr'
        });
    $urlRouterProvider.otherwise('main');
  })
  .controller('parentCtr',function($scope,$ionicModal,$state){
    //由html页面，创建模态对话框对象，存储到某个变量中，重复使用
    $ionicModal.fromTemplateUrl('main_modal.html', {
      scope: $scope,
      animation: 'slide-in-left'
    }).then(function(modal) {
      $scope.myModal = modal;
    });

    //单击按钮，显示
    $scope.searchData = function(){
      $scope.myModal.show();
    };

    //公共的跳转方法
    $scope.goTo = function(path){
      $state.go(path);
    };
  })
  .controller('mainCtr',function($scope,$http,$timeout){
      //定义数据，存储轮播的图片数据
    $scope.imgArray = ['images/banner_01.jpg',
      'images/banner_02.jpg','images/banner_03.jpg',
      'images/banner_04.jpg'];

    $scope.pageNumber = 1;
    $scope.hasMore = true;
    //页面初始化，显示前5条数据，绑定显示
    $http.get('data/news_select.php?pageNum=1')
      .success(function(result){
        $scope.newsData = result.data;
        $scope.pageNumber++;
    });

    //可以显示更多
    $scope.loadMore =function(){
      $timeout(function(){
        $http.get('data/news_select.php?pageNum=' + $scope.pageNumber)
          .success(function(result){
            console.log(result);
            console.log($scope.pageNumber);
            if($scope.pageNumber == result.pageCount)
              $scope.hasMore = false;

            $scope.newsData = $scope.newsData.concat(result.data);
            $scope.pageNumber++;
            //结束
            $scope.$broadcast('scroll.infiniteScrollComplete');
          });
      },4000);

    };
  })
  .controller('listCtr',function($scope,$http){
    //$scope.pageInfo = pageNumber + '/' + pagCount;
  })
  .controller('startCtr',function($scope,$state,$timeout,$interval){
    $scope.waitNumber = 5;
    $interval(function(){
        if($scope.waitNumber > 0)
          $scope.waitNumber--;
    },1000);

    $timeout(function(){
      $state.go('main');
    },5000);
  })