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
                {id:1,name:"����1",isComplete:false},
                {id:2,name:"����2",isComplete:false},
                {id:3,name:"����3",isComplete:false}
            ]
            $scope.newTodo='';
            $scope.add=function(){
                //��ǰ����Ϊ��ʱ�������ύ
                if($scope.newTodo.trim().length==""){
                    return;
                }
                //��֮ǰû������ʱ����һ����ӵ�idΪ1,������id��ȡ���������һ��id+1
                var id,index;
                if($scope.list.length==0){
                    id=1;
                }else{
                    index=$scope.list.length-1;
                    id=$scope.list[index].id+1;
                }
                $scope.list.push({id:id,name:$scope.newTodo,isComplete:false})
                //�ύ�����������
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
            //ȫѡ
            $scope.selecteAll=false;
            $scope.All=function(){
                for(var i=0;i<$scope.list.length;i++){
                    $scope.list[i].isComplete=$scope.selecteAll;
                }
            }
            //ɾ�������
            $scope.removeCon=function(){
                for(var i=0;i<$scope.list.length;i++){
                    if($scope.list[i].isComplete){
                        $scope.list.splice(i,1)
                        i--;
                    }
                }
            }
            //��ʾ����ɾ�������
            $scope.isShow=function(){
                var flag=false;
                for(var i=0;i<$scope.list.length;i++){
                    if($scope.list[i].isComplete){
                        flag=true;
                    }
                }
                return flag;
            }
            //��ʾû����ɵ�����
            $scope.total=function(){
                var count=0;
                for(var i=0;i<$scope.list.length;i++){
                    if(!$scope.list[i].isComplete){
                        count++;
                    }
                }
                return count;
            }
            //���ӱ仯
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
