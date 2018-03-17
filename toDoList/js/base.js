/*
 *模块化编程-
 */
;
(function () {
    // 声明变量区
    let taskItems = [];
    let $content;
    let $taskListElement,$taskDetailElement,$taskDetailContentElement,$descElement,$datetimeElement,$detailSubmitElement,$deleteElement;
    let $templateElement, $addTaskSubmit;
    let detailIndex,deleteIndex;//定义点击详情和删除是记录的索引值
    /**
     * 初始化jq对象
     */
    function initJq() {
        $content = $('.task-content');
        $taskListElement = $('.task-list');

        $templateElement = $('template');
        $addTaskSubmit = $('.addTaskSubmit');
        $taskDetailElement = $('.task-detail');
        $taskDetailContentElement = $('.detail-content');
        $descElement = $('.desc');
        $datetimeElement = $('.datetime');
        $detailSubmitElement = $('.detail-submit');
        $deleteElement = $('.delete');
        // 如果每次都写右边的 js就要每次执行初始化 赋值之后用$content只赋值一次
    };
    /**
     * 添加taskItem的方法
     */
    let addTask = function () {
        //对象newTask.content存储表单里输入的内容
        let newTask = {};
        newTask.content = $content.val();
        //表单里输入的内容推入数组taskItems
        taskItems.push(newTask);
        //把taskItem是存入本地数据库
        store.set('taskItems', taskItems);
        //把taskItem的值从本地数据库都取出来并渲染到DOM树中
        renderToTaskListElement(newTask);
    };

    /**
     *
     * 初始化页面时的渲染
     */
    function initToTaskListELement() {
        //可以先清空taskListElement
        $taskListElement.html('');
        taskItems = store.get('taskItems');
        let taskHtmlStr = '';
        //把每个taskItem的内容赋给itemContent，并添加到taskListElement节点里
        for (let i = taskItems.length-1; i>=0; i--) {
            let oneItem = '<div class="task-item"><!--任务项目-->' +
                '<span ><!--复选框-->' +
                '<input type="checkbox" />' +
                '</span>' +
                '<span class="item-content"><!--item的content-->' + taskItems[i].content +
                '</span>' +
                '<span class="floatright"><!--item右侧的action-->' +
                '<span class="action detail"><!--详情-->' +
                '详情   ' +
                '</span>' +
                '<span class="action delete"><!--删除-->' +
                '删除   ' +
                '</span>' +
                '</span>' +
                '</div>';
            taskHtmlStr = taskHtmlStr + oneItem;
        }
        $(taskHtmlStr).appendTo($taskListElement);
        listenDetail();
        listenDetailSave();
        listenDelete();
    }

    /**
     *  向页面渲染task_list的方法
     */
    function renderToTaskListElement(newTask) {
        let oneItem = '<div class="task-item"><!--任务项目-->' +
            '					<span ><!--复选框-->' +
            '						<input type="checkbox" />' +
            '					</span>' +
            '					<span class="item-content"><!--item的content-->' + newTask.content +
            '					</span>' +
            '					<span class="floatright"><!--item右侧的action-->' +
            '					<span class="action detail"><!--详情-->' +
            '						详情	' +
            '					</span>' +
            '					<span class="action delete"><!--删除-->' +
            '						删除	' +
            '					</span>' +
            '					</span>' +
            '				</div>';
        $(oneItem).prependTo($taskListElement);
        listenDetail();
        listenDetailSave();
        listenDelete();
    }
    /**
	 * 添加任务按钮监听事件
	 */
    function listenAddTaskItem(){
        $addTaskSubmit.click(function(){
            addTask();
        });
    }


    /**
     *点击任务item的详情编辑项目明细并保存
     */
    function listenDetail(){
        $('.detail').click(function(){//去找taskItesms里点详情的是哪个序号
            detailIndex=taskItems.length - 1 -$(this).parent().parent().index();
            $taskDetailElement.show();
            $taskDetailContentElement.val(taskItems[detailIndex].content);
            $descElement.val(taskItems[detailIndex].desc);
            $datetimeElement.val(taskItems[detailIndex].datetime);
        })
    }

    var listenDetailSave = function(){
        $detailSubmitElement.click(function(){
            var dataTask = {};
            dataTask.content = $content.val();
            dataTask.desc = $descElement.val();
            dataTask.datetime = $datetimeElement.val();
            //修改更新操作--要把修改后的对象和原来的对象合并
            taskItems[detailIndex] = $.extend(taskItems[detailIndex],dataTask);//就相当taskList于已经更新了
            store.set('task_list',taskItems);
            $content.val('');
            $descElement.val('');
            $datetimeElement.val('');
            $taskDetailElement.hide();
            initToTaskListELement();
        });
    }

    /**
     *删除taskItem操作
     */
    let listenDelete = function(){
        $('.delete').click(function(){
            deleteIndex = taskItems.length - 1 - $(this).parent().parent().index();
            let r =  confirm('确认要删除吗？真的要删除吗？');
            if(r){
                taskItems.splice(deleteIndex,1);//第一个是索引
                $(this).parent().parent().remove();
            }
            store.set('taskItems', taskItems);
        });

    };

    function initModule() {
        initJq();
        $datetimeElement.datetimepicker();
        initToTaskListELement();
    };




    /**
     *1.初始化
     */
    initModule();
    // taskItems=[{"content":"coco"}];
    // store.set('taskItems', taskItems);

    /**
     *2.监听事件
     */
    listenAddTaskItem();
    // listenDetail();
    // listenDetailSave();
    // listenDelete();
})();

