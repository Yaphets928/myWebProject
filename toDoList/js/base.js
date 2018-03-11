/*
 *模块化编程---闭包
 */
var myTodoModule = (function(){
    // 定义变量
    var task_list = [];
    var $content;
    var $taskList;
    // 初始化jq对象
    var initJarVar = function(){
        $content=$('.content');
        $taskList=$('.task-list');
        // 如果每次都写右边的 js就要每次执行初始化 赋值之后用$content只赋值一次

    }
    // 页面初始化就要执行的放在initModule中
    var addTask = function(){
        var new_task={};
        new_task.content=$content.val();
        task_list.push(new_task);
        // 保存task_list
        store.set('task_list',task_list);
        render_task_list();

    }
    //向页面渲染task_list
    var render_task_list = function(){
        $task-list.html('');
        task_list = store.get(task_list);
    }
    return{
        initModule:initModule
    }
})();

$(function(){
   myTodoModule.initModule();
});
