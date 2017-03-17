/**
 * Created by hujiacheng on 2017/3/16.
 */
(function(angular){
    angular
        .module('todo_service',[])
        .service('todoServise',['$window',function($window){
            //获取本地localstorage数据
            var localStorage=$window.localStorage;
            var dataList=(JSON.parse(localStorage.getItem('todo')))||[];
            //获取数据
            this.getData=function(){
                return dataList;
            }
			//添加数据
			this.add=function(todoName){
				//当之前没有数据时，第一个添加的id为1,其他的id获取数组中最后一个id+1
				var id,index;
				if(dataList.length==0){
					id=1;
				}else{
					index=dataList.length-1;
					id=dataList[index].id+1;
				}
				dataList.push({id:id,name:todoName,isComplete:false})
				this.save();
			}
			//保存数据
			this.save=function(){
				localStorage.setItem('todo',JSON.stringify(dataList));
			}
			//删除数据
			this.remove=function(id){
				for(var i=0;i<dataList.length;i++){
					if(dataList[i].id==id){
						dataList.splice(i,1);
					}
				}
				this.save();
			}
			//全选
			this.All=function(selecteAll){
				for(var i=0;i<dataList.length;i++){
					dataList[i].isComplete=selecteAll;
				}
				this.save();
			}
			//删除完成项
			this.removeCon=function(){
				for(var i=0;i<dataList.length;i++){
					if(dataList[i].isComplete){
						dataList.splice(i,1)
						i--;
					}
				}
				this.save();
			}
			//显示隐藏删除完成项
			this.isShow=function(){
				var flag=false;
				for(var i=0;i<dataList.length;i++){
					if(dataList[i].isComplete){
						flag=true;
					}
				}
				return flag;
			}
			//显示没有完成的数量
			this.total=function(){
				var count=0;
				for(var i=0;i<dataList.length;i++){
					if(!dataList[i].isComplete){
						count++;
					}
				}
				return count;
			}
			//判断全选按钮状态
			this.isSelectedAll=function(){
				//var isSelected=true;
				return dataList.every(function(value){
					if(!value.isComplete){
						isSelected=false;
						return false;
					}
					return true;
				})
				//return isSelected;
			}
        }])
}(angular))
