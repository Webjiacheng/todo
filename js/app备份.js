/**
 * Created by hujiacheng on 2017/3/16.
 */
(function (angular) {
    'use strict';

    // Your starting point. Enjoy the ride!
    angular
        .module("todo",[])
        .controller("Ctrl",['$scope','$location',function($scope,$location){
            $scope.list=[
                {id:1,name:"任务1",isComplete:false},
                {id:2,name:"任务2",isComplete:false},
                {id:3,name:"任务3",isComplete:false}
            ]
            $scope.newTodo='';
            $scope.add=function(){
                //当前内容为空时，限制提交
                if($scope.newTodo.trim().length==""){
                    return;
                }
                //当之前没有数据时，第一个添加的id为1,其他的id获取数组中最后一个id+1
                var id,index;
                if($scope.list.length==0){
                    id=1;
                }else{
                    index=$scope.list.length-1;
                    id=$scope.list[index].id+1;
                }
                $scope.list.push({id:id,name:$scope.newTodo,isComplete:false})
                //提交后重置输入框
                $scope.newTodo='';
            }
            $scope.remove=function(id){
                for(var i=0;i<$scope.list.length;i++){
                    if($scope.list[i].id==id){
                        $scope.list.splice(i,1);
                    }
                }
            }
            $scope.editId=0;
            $scope.edit=function(id){
                $scope.editId=id;
            }
            $scope.update=function(){
                console.log(111);
                $scope.editId=0;
            }
            //全选
            $scope.selecteAll=false;
            $scope.All=function(){
                for(var i=0;i<$scope.list.length;i++){
                    $scope.list[i].isComplete=$scope.selecteAll;
                }
            }
            //删除完成项
            $scope.removeCon=function(){
                for(var i=0;i<$scope.list.length;i++){
                    if($scope.list[i].isComplete){
                        $scope.list.splice(i,1)
                        i--;
                    }
                }
            }
            //显示隐藏删除完成项
            $scope.isShow=function(){
                var flag=false;
                for(var i=0;i<$scope.list.length;i++){
                    if($scope.list[i].isComplete){
                        flag=true;
                    }
                }
                return flag;
            }
            //显示没有完成的数量
            $scope.total=function(){
                var count=0;
                for(var i=0;i<$scope.list.length;i++){
                    if(!$scope.list[i].isComplete){
                        count++;
                    }
                }
                return count;
            }
            //监视变化
            $scope.location=$location;
            $scope.$watch('location.url()',function(newValue){
                switch (newValue){
                    case '/active':
                        $scope.status=false;
                        break;
                    case '/completed':
                        $scope.status=true;
                        break;
                    default :
                        $scope.status=undefined;
                }
            })
        }])
})(angular);
