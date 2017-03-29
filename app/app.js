var application ;
Ext.onReady(function(){
    //开启悬浮提示功能
    Ext.QuickTips.init();
    //开启动态加载
    Ext.Loader.setConfig({
        enabled: true
    });
    Ext.Loader.setPath('Ext.ux', 'static/extjs/ux');
    application =  Ext.application({
			requires : ['Ext.container.Viewport'],
			name : 'ZK',
			appFolder : 'app',
		    controllers: ['MainFrame'], 
			//  autoCreateViewport: true,//开启自动创建Viewport,它将自动去view目录下查找Viewport文件并实例化
			launch : function() {
				console.log("launch triggered!");
				application  = this;
				Ext.create('Ext.container.Viewport', {
						    	layout : 'border',
							items : [{
								    xtype : 'zkcenter'
										
									},{
								     xtype : 'zknorth'
										
									},{
								     xtype : 'zkwest'
										
									}]
						});
			}
		}); 

});


var ZkExtJS = ZkExtJS || {};

/**
* ExtJS封装
*/
ZkExtJS.extjs = {
    jsPath:'static.js.',
    
    submit:function(url,param,comp,store,currentPage){
    	console.log(currentPage)
    	Ext.Ajax.request({
            method: 'post',
            type: 'ajax',
            url: url,
            params:  param,
            success: function (response) {
                var rs = Ext.JSON.decode(response.responseText);
                if (rs.success == true) { //操作失败
                    Ext.Msg.alert('提示', rs.msg);
                    comp.up('window').close();
                    if(currentPage){
                    	store.loadPage(currentPage);
                    }else{
                    	store.loadPage(1);
                    }
                }else { //操作失败
                    Ext.Msg.alert('系统提示', rs.msg);
                }
                comp.setLoading(false);
            },
            failure: function (response, opts) {
            	comp.setLoading(false);
                Ext.Msg.alert('系统提示', '操作失败');
            }
        });
    },
    getDataById:function(comp,url,id,model,form){
    	Ext.Ajax.request({
            method: 'get',
            type: 'ajax',
            url: url,
            params: {
                id : id
            },
            success: function (response) {
                var rs = Ext.JSON.decode(response.responseText);
                if (rs.success == false) { //操作失败
                    Ext.Msg.alert('系统提示', rs.msg);
                }
                else {
                    var record = Ext.create(model, rs.data);
                    form.loadRecord(record);
                    // todo 这里写写死了 -guhj
                    if(form.getChildByElement('mycheckboxgroup')){
                    	 form.getChildByElement('mycheckboxgroup').setValue({'hobby':record.raw.hobby?record.raw.hobby.split(','):[]});
                    }
                    if(form.down('radiogroup')){
                    	 // 选中单选 性别 
                        form.down('radiogroup').setValue({'sex':record.raw.sex}); 
                    }
                }
                comp.setLoading(false);
            },
            failure: function (response, opts) {
            	comp.setLoading(false);
                Ext.Msg.alert('系统提示', '操作失败');
            }
        });
    },
    responseCallback:function(comp,store,type,model){// type 1 添加  2 修改， 3 删除
    	   var optional = {
    	    		  success:function(batch,options){
    	    			 
    	    			   var rs = Ext.JSON.decode(batch.operations[0].response.responseText);
    	    			   Ext.Msg.alert('提示', rs.msg);
    	    			   if(type == 1){
    	    				   store.loadPage(1);  
    	    			   }else if(type == 2){//todo
    	    				   store.loadPage(1);// 这个得需要指定页码
    	    			   }else if(type == 3){
    	    				  // store.loadPage(1);
    	    			   }
    	    			  
    	    		  },
    	    		  failure:function(batch,options){
    	    			  if(model){
    	    				  // 失败以后删除
        	    			  store.remove(model); 
    	    			  }
    	    			  var rs;
    	    			  if(batch.operations[0].response){
    	    			     rs = Ext.JSON.decode(batch.operations[0].response.responseText);
    	    			     Ext.Msg.alert('系统提示', rs.msg);
    	    			  }else{
    	    				 Ext.Msg.alert('系统提示', '操作失败！'+batch.operations[0].error.status);
    	    			  }
    	    		  },
    	    		  callback:function(optional){
    	    			  comp.setLoading(false);
    	    			  if(type == 2 || type == 1){// 修改 添加
    	    				  comp.up('window').close();
    	    			  }else if(type == 3){ // 删除
    	    				  
    	    			  }
    	    		  }
    	      }
    	   return optional;
    },
    
    addCompToCenter:function(child,title,treeId){
    	
    	 var center = application.getController('MainFrame').getZkcenter();
         var panel = center.child(child);
        if (!panel) {
        	 // 后面的id和tree的id对应。当选择tab页面的时候选中相应的叶子
             var panel = Ext.widget(child, { treeId:treeId });
             center.add(panel);
             center.setActiveTab(panel);
         } else {
             center.setActiveTab(panel);
            }
    },
    
    /**
    * 创建Tab页
    * @param tabId {string}：加载tab的js的路径
    * @param tabTitle {string}：加载tab的标题
    * @param isClosable {boolean} option：加载tab是否可关闭，默认为：true
    */
    createTabPage: function (tabId,  panelAlias, isClosable) {
        isClosable = isClosable == undefined ? true : isClosable;
        var tabConfig = {
            closable: isClosable,
            id: panelAlias,
            bodyBorder: false,
            border: false,
            icon: 'static/extjs/examples/shared/icons/fam/grid.png',
            treeId:panelAlias 
        };

        // 1.解析MenuID
        var arr = tabId.split('?');  // eg：App.BotMgr.BotMgrP?type=accept
        var tabPath = arr[0]; // 界面路径 eg：App.BotMgr.BotMgrP?type=accept
        if (arr.length > 1) { // tab配置参数
            var obj = Ext.Object.fromQueryString(arr[1]);
            Ext.apply(tabConfig, obj)
        }
      
        // 2.判断是否已存在此Tab，若存在就显示
        var newTab = Ext.getCmp('app_tabContainer').getComponent(panelAlias);
        if (!newTab) {
            Ext.syncRequire(tabPath, function () {
                var controller = application.getController(tabId);
                var panel = Ext.widget(panelAlias, tabConfig);
                 Ext.getCmp('app_tabContainer').add(panel);
                 Ext.getCmp('app_tabContainer').setActiveTab(panel);
            });
        } else {
            Ext.getCmp('app_tabContainer').setActiveTab(newTab);
        }
    },

    /** 
    * 创建form
    */
    createForm:function(obj) {

        // 1.默认值设置
        var config = {
            defaultType: 'hiddenfield',
            width: '100%',
            bodyPadding: 5,
            bodyBorder: false,
            border: false,
            autoScroll: true
        };

        // 2.从参数中获取成员放到config变量
        Ext.apply(config, obj);

        // 3.初始化
        var form = Ext.create('Ext.form.Panel', config);
        return form;
    },

    /** 
    * 创建form
    */
    createPanel: function (obj) {

        // 1.默认值设置
        var config = {
            defaultType: 'hiddenfield',
            width: '100%',
            bodyBorder: false,
            border: false,
            autoScroll: true,
            bodyStyle: {
                backgroundColor: '#ffffff'
            }
        };

        // 2.从参数中获取成员放到config变量
        Ext.apply(config, obj);

        // 3.初始化
        var panel = Ext.create('Ext.panel.Panel', config);
        return panel;
    },

    /** 
    * 选中目录的node
    * @param nodeId {string} ：node的id
    */
    selectMenuTreeNode: function (nodeId){
        var node = Ext.getCmp('app_tree').store.getNodeById(nodeId);
        if (node) {
            Ext.getCmp('app_tree').getSelectionModel().select(node);
        } else {
            Ext.getCmp('app_tree').getSelectionModel().select(0);
        }
    },

    /** 
    * 新建一个grid
    * @param obj {grid} grid的属性
    * @author 2015/01/04 方杰 
    */
    createGid:function(obj) {
        // 1.默认值设置
        var gridConfig = {
            columnLines: true,
            rowLines: true,
            multiSelect: false, // 多选
            showLines: true, // 显示网格线
            layout: 'fit', // layout：默认为  'fit'
            width: '100%', // width：默认为  '100%'
            columns: [], // columns：默认必须设置
            tbar: {
                layout: { overflowHandler: 'Menu' }
            },
            listeners: {
                cellclick: obj.cellclick,
                celldblclick: obj.celldblclick
            }
        };

        // 2.从参数中获取成员放到gridConfig变量
        Ext.apply(gridConfig, obj);

        // 3.Grid是没有包含tooltip的属性，只能给名称手动加上
        if (obj.tooltip) {
            gridConfig.title = '<span data-qtip="' + obj.tooltip + '">' + obj.title + '</span>';
        }

        // 4.tbar工具条设置
        if (gridConfig.items != undefined) { // items ：默认为tbar
            gridConfig.tbar.items = obj.items;
            delete obj.items; // 删除原先存在的
        }
        if (gridConfig.tbarHeight != undefined && gridConfig.tbarHeight == true)
            gridConfig.tbar.height = 27;
        else if (obj.tbarHeight == false)
            gridConfig.tbar.height = 0;

        // 5.事件设置
        if (gridConfig.afterrender != undefined) { // 渲染事件
            gridConfig.listeners.afterrender = gridConfig.afterrender;
            delete gridConfig.afterrender;
        }
        if (gridConfig.deselect != undefined) { // 销毁事件
            gridConfig.listeners.deselect = obj.deselect;
            delete gridConfig.deselect;
        }
        if (gridConfig.select != undefined) { // 选中事件
            gridConfig.listeners.select = obj.select;
            delete gridConfig.deselect;
        }
        if (gridConfig.selectionchange != undefined) { // 选择变更事件
            gridConfig.listeners.selectionchange = obj.selectionchange;
            delete gridConfig.selectionchange;
        }

        // 6.columns默认渲染
        if (gridConfig.columns != undefined) {
            if (Ext.isArray(gridConfig.columns)) { // 1)若columns，设置其default属性
                gridConfig.columns = {
                    defaults: {
                        renderer: renderTitle
                    },
                    items: obj.columns
                }
            } else { // 2)colums包含了defaults成员
                // 设置默认的 renderer
                gridConfig.columns.defaults.renderer = renderTitle;
            }

            // 3)若至少含有一个固定列，就要采用每个列单独一个renderer
            if (gridConfig.columns.items) {
                var isAllUnlocked = gridConfig.columns.items.every(function (value, index, self) {
                    if (value.xtype == 'rownumberer') {
                        return true;
                    }
                    return value.locked == undefined || value.locked === false;
                }); 
                // 若含有一个列不固定
                if (isAllUnlocked == false) {
                    gridConfig.columns.items.forEach(function (value, index, self) {
                        if (value.xtype != 'rownumberer') {
                            Ext.applyIf(value, gridConfig.columns.defaults); // locked要给每个column赋值
                        }
                    });
                }
            }
        }

        // 7.itemcontextmenu
        if (obj.itemcontextmenu != undefined) {
            gridConfig.viewConfig = {
                stripeRows: true,
                listeners: {
                    itemcontextmenu: obj.itemcontextmenu
                }
            };
        }

        // 8.分页bbar
        if (obj.bbar != undefined && obj.bbar == true) {//若grid需要bbar(Bottom Bar)，就创建个分页控件
            gridConfig.bbar = Ext.create('Ext.toolbar.Paging', {
                store: obj.store,
                pageSize: 25,
                displayInfo: true,
                displayMsg: '当前显示第{0}行到第{1}行，一共{2}行。',
                emptyMsg: "没有任何记录"
            });
        }

        // 9.初始化grid
        var baseGrid = Ext.create('Ext.grid.Panel', gridConfig);

        // 10.若grid采用locked，重新注册listeners的 cellclick 和 celldblclick 事件
        for (var i = 0, len = baseGrid.columns.length; i < len; i++) {
            if (baseGrid.columns[i].xtype == 'rownumberer') {
                continue;
            } else if (baseGrid.columns[i].locked) {
                for (var j = 0; j < len; j++) {
                    if (!baseGrid.columns[j].renderer) { // 有锁定列时，重新给所有render赋值
                        baseGrid.columns[j].renderer = renderTitle;
                    }
                }
                baseGrid.getView().on('cellclick', gridConfig.listeners.cellclick);
                baseGrid.getView().on('celldblclick', gridConfig.listeners.celldblclick);
                baseGrid.lockedGrid.getView().on('cellclick', gridConfig.listeners.cellclick);
                baseGrid.lockedGrid.getView().on('celldblclick', gridConfig.listeners.celldblclick);

                break;
            }
        }

        return baseGrid;
    },

    /**
    * 取消列合并
    */
    cancelMergeGrid: function (grid, colIndexArray) {

        // 1.是否含有数据
        var gridView = document.getElementById(grid.getView().getId() + '-body');
        if (gridView == null) {
            return;
        }

        // 2.获取Grid的所有tr
        var trArray = [];
        if (grid.layout.type == 'table') { // 若是table部署方式，获取的tr方式如下
            trArray = gridView.childNodes;
        } else {
            trArray = gridView.getElementsByTagName('tr');
        }

        for (var i = 0, len = colIndexArray.length; i < len; i++) {
            var colIndex = colIndexArray[i];
            // 2.遍历grid的tr，从第第二个数据开始。
            for (var j = 0, trLength = trArray.length; j < trLength; j++) {
                var thisTr = trArray[j];
                if (thisTr.childNodes[colIndex].hasAttribute('rowspan')) {
                    thisTr.childNodes[colIndex].removeAttribute('rowspan'); // 移除rowspan属性
                }
                if (thisTr.childNodes[colIndex].style.display == 'none') {
                    thisTr.childNodes[colIndex].style.display = ''; // 移除display属性
                }
            }
        }
    },

    /**
    * 合并Grid的数据列
    * @param grid {Ext.Grid.Panel} 需要合并的Grid
    * @param colIndexArray {Array} 需要合并列的Index(序号)数组；从0开始计数，序号也包含。
    * @param isAllSome {Boolean} 是否2个tr的colIndexArray必须完成一样才能进行合并。true：完成一样；false：不完全一样
    */
    mergeGrid: function (grid, colIndexArray, isAllSome) {
        isAllSome = isAllSome == undefined ? true : isAllSome; // 默认为true

        // 1.是否含有数据
        var gridView = document.getElementById(grid.getView().getId() + '-body');
        if (gridView == null) {
            return;
        }

        // 2.获取Grid的所有tr
        var trArray = [];
        if (grid.layout.type == 'table') { // 若是table部署方式，获取的tr方式如下
            trArray = gridView.childNodes;
        } else {
            trArray = gridView.getElementsByTagName('tr');
        }

        // 3.进行合并操作
        if (isAllSome) { // 3.1 全部列合并：只有相邻tr所指定的td都相同才会进行合并
            var lastTr = trArray[0]; // 指向第一行
            // 1)遍历grid的tr，从第二个数据行开始
            for (var i = 1, trLength = trArray.length; i < trLength; i++) {
                var thisTr = trArray[i];
                var isPass = true; // 是否验证通过
                // 2)遍历需要合并的列
                for (var j = 0, colArrayLength = colIndexArray.length; j < colArrayLength; j++) {
                    var colIndex = colIndexArray[j];
                    // 3)比较2个td的列是否匹配，若不匹配，就把last指向当前列
                    if (lastTr.childNodes[colIndex].innerText != thisTr.childNodes[colIndex].innerText) {
                        lastTr = thisTr;
                        isPass = false;
                        break;
                    }
                }

                // 4)若colIndexArray验证通过，就把当前行合并到'合并行'
                if (isPass) {
                    for (var j = 0, colArrayLength = colIndexArray.length; j < colArrayLength; j++) {
                        var colIndex = colIndexArray[j];
                        // 5)设置合并行的td rowspan属性
                        if (lastTr.childNodes[colIndex].hasAttribute('rowspan')) {
                            var rowspan = lastTr.childNodes[colIndex].getAttribute('rowspan') - 0;
                            rowspan++;
                            lastTr.childNodes[colIndex].setAttribute('rowspan', rowspan);
                        } else {
                            lastTr.childNodes[colIndex].setAttribute('rowspan', '2');
                        }
                        // lastTr.childNodes[colIndex].style['text-align'] = 'center';; // 水平居中
                        lastTr.childNodes[colIndex].style['vertical-align'] = 'middle';; // 纵向居中
                        thisTr.childNodes[colIndex].style.display = 'none';
                    }
                }
            }
        } else { // 3.2 逐个列合并：每个列在前面列合并的前提下可分别合并
            // 1)遍历列的序号数组
            for (var i = 0, colArrayLength = colIndexArray.length; i < colArrayLength; i++) {
                var colIndex = colIndexArray[i];
                var lastTr = trArray[0]; // 合并tr，默认为第一行数据
                // 2)遍历grid的tr，从第二个数据行开始
                for (var j = 1, trLength = trArray.length; j < trLength; j++) {
                    var thisTr = trArray[j];
                    // 3)2个tr的td内容一样
                    if (lastTr.childNodes[colIndex].innerText == thisTr.childNodes[colIndex].innerText) {
                        // 4)若前面的td未合并，后面的td都不进行合并操作
                        if (i > 0 && thisTr.childNodes[colIndexArray[i - 1]].style.display != 'none') {
                            lastTr = thisTr;
                            continue;
                        } else {
                            // 5)符合条件合并td
                            if (lastTr.childNodes[colIndex].hasAttribute('rowspan')) {
                                var rowspan = lastTr.childNodes[colIndex].getAttribute('rowspan') - 0;
                                rowspan++;
                                lastTr.childNodes[colIndex].setAttribute('rowspan', rowspan);
                            } else {
                                lastTr.childNodes[colIndex].setAttribute('rowspan', '2');
                            }
                           // lastTr.childNodes[colIndex].style['text-align'] = 'center';; // 水平居中
                            lastTr.childNodes[colIndex].style['vertical-align'] = 'middle';; // 纵向居中
                            thisTr.childNodes[colIndex].style.display = 'none'; // 当前行隐藏
                        }
                    } else {
                        // 5)2个tr的td内容不一样
                        lastTr = thisTr;
                    }
                }
            }
        }
    }
}

/**
* 信息封装
*/
ZkExtJS.msg = {
    /** 
    * 弹出消息
    * @param msg {string} ：消息的内容
    */
    alert: function (msg) {
        Ext.Msg.alert('系统提示', msg);
    }
}
 