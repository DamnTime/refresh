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
    //��htmlҳ�棬����ģ̬�Ի�����󣬴洢��ĳ�������У��ظ�ʹ��
    $ionicModal.fromTemplateUrl('main_modal.html', {
      scope: $scope,
      animation: 'slide-in-left'
    }).then(function(modal) {
      $scope.myModal = modal;
    });

    //������ť����ʾ
    $scope.searchData = function(){
      $scope.myModal.show();
    };

    //��������ת����
    $scope.goTo = function(path){
      $state.go(path);
    };
  })
  .controller('mainCtr',function($scope,$http,$timeout){
      //�������ݣ��洢�ֲ���ͼƬ����
    $scope.imgArray = ['images/banner_01.jpg',
      'images/banner_02.jpg','images/banner_03.jpg',
      'images/banner_04.jpg'];

    $scope.pageNumber = 1;
    $scope.hasMore = true;
    //ҳ���ʼ������ʾǰ5�����ݣ�����ʾ
    $http.get('data/news_select.php?pageNum=1')
      .success(function(result){
        $scope.newsData = result.data;
        $scope.pageNumber++;
    });

    //������ʾ����
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
            //����
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