

Ext.application({
    name: 'AKApp',
    launch: function () {

        // 1.设定Viewport
        Ext.create('Ext.container.Viewport', {
            name: 'MainFrame',
            layout: 'border',
            items: [
                Ext.create('Ext.panel.Panel', {
                    width: '100%',
                    height: 80,
                    bodyBorder: false,
                    border: false,
                    region: 'north',
                    style: {
                        background: '#739b2e'
                    },
                    html: '<section class="menu-section">'+
                            '    <div class="container">'+
                            '        <div class="row ">'+
                            '            <div class="col-md-12">'+
                            '                <div class="navbar-collapse collapse ">'+
                            '                    <div class="navbar-header">'+
                            '                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'+
                            '                            <span class="icon-bar"></span>'+
                            '                            <span class="icon-bar"></span>'+
                            '                            <span class="icon-bar"></span>'+
                            '                        </button>'+
                            '                        <a class="navbar-brand" href="/index.html">' +
                            '                            <img src="/img/logo.png" />'+
                            '                        </a>'+
                            '                    </div>'+
                            '                    <ul id="menu-top" class="nav navbar-nav navbar-right">'+
                            '                        <li><a href="/index.html" >首页</a></li>'+
                            '                        <li><a href="http://www.cnblogs.com/polk6/" target="_blank">Blog</a></li>'+
                            '                        <li><a href="#" class="menu-top-active">ExtJS</a></li>' +
                            '                        <li><a href="/WebDemo/index.html" target="_blank">WebDemo</a></li>' +
                            '                        <li><a href="/WeChatDemo/index.html" target="_blank" >微信开发</a></li>' +
                            '                    </ul>'+
                            '                </div>'+
                            '            </div>'+
                            '        </div>'+
                            '    </div>'+
                            '</section>'
                }),
                Ext.create('Ext.tree.Panel', {
                    title: '目录',
                    id: 'app_tree',
                    rootVisible: false,
                    lines: false,
                    split: true,
                    width: '20%',
                    region: 'west',
                    root: {
                        expanded: true,
                        children: [
                            {
                                text: '业务',
                                expanded: true,
                                children: [
                                    { text: '船舶管理', id: 'app.ShipMgr.ShipMgrTab', leaf: true },
                                ]
                            },
                            {
                                text: 'Demo',
                                expanded: true,
                                children: [
                                    { text: '创建组件', id: 'app.Demo.CreateCompareTab', leaf: true },
                                    { text: '查找组件', id: 'app.Demo.QueryCompareTab', leaf: true },
                                    { text: 'Grid合并单元格', id: 'app.Demo.MergeGridTab', leaf: true },
                                    { text: 'Date扩展', id: 'app.Demo.DateExtendTab', leaf: true },
                                ]
                            }
                        ]
                    },
                    listeners: {
                        select: function (thisView, thisControl) {
                            if (thisControl.data.leaf) {
                                AkExtJS.extjs.createTabPage(thisControl.data.id, thisControl.data.text); //创建tab页
                            }
                        }
                    }
                }),
                Ext.create('Ext.tab.Panel', {
                    id: 'app_tabContainer',
                    region: 'center',
                    autoScroll: true,
                    defaults: {
                        autoScroll: true,
                        bodyPadding: 4,
                        closable: true  //tab页的关闭按钮
                    },
                    listeners: {
                        tabchange: function (thisControl, newCard, oldCard) {
                            // 1.选中tree节点
                            AkExtJS.extjs.selectMenuTreeNode(newCard.id);
                            // 2.修改url
                            if (oldCard) {
                                history.pushState('', '', location.href.split('#')[0] + '#' + newCard.id);
                            }
                        }
                    }
                }),
            ]
        });

        // 2.重写页面请求事件
        Ext.util.Observable.observe(Ext.data.Connection, {
            beforerequest: function (conn, options, eOpts) {
                options.url = 'http://'+location.host + '/' +options.url; // 请求时，当前页面BaseHost+具体模块的URL就为真实请求地址
                try {

                } catch (e) { }
            },
            requestcomplete: function (conn, response, options) {
                try {
                } catch (e) { }
            },
            requestexception: function (conn, response, options) {
                try {
                } catch (e) { }
            }
        });
        // 3.重写Model → files → float的转换：C#的float转换为js的float会造成浮点数溢出。这里进行默认 1个小数点
        Ext.data.Types.FLOAT.convert = function (b) { return b !== undefined && b !== null && b !== "" ? parseFloat(parseFloat(String(b).replace(Ext.data.Types.stripRe, "")).toFixed(1)) : (this.useNull ? null : 0) };
        // 4.设置tip提示信息
        Ext.tip.QuickTipManager.init();
        Ext.apply(Ext.tip.QuickTipManager.getQuickTip(), {
            maxWidth: 350,
            showDelay: 50, // 当鼠标移动到提示区域的显示信息的间隔
            dismissDelay: 0 // 提示信息框展示多久，0表示永久，直到鼠标移开
        });

        // 5.加入首页
        AkExtJS.extjs.createTabPage('app.indexTab', '首页', false);

        // 6.若url含有#，表示指定了tab
        if (location.href.split('#').length == 2) {
            var tabId = location.href.split('#')[1];
            AkExtJS.extjs.selectMenuTreeNode(tabId);
        }
    }
});

var AkExtJS = AkExtJS || {};

/**
* ExtJS封装
*/
AkExtJS.extjs = {
    jsPath:'static.js.',
    /**
    * 创建Tab页
    * @param tabId {string}：加载tab的js的路径
    * @param tabTitle {string}：加载tab的标题
    * @param isClosable {boolean} option：加载tab是否可关闭，默认为：true
    */
    createTabPage: function (tabId, tabTitle, isClosable) {
        isClosable = isClosable == undefined ? true : isClosable;
        var tabConfig = {
            closable: isClosable,
            title: tabTitle,
            id: tabId,
            bodyBorder: false,
            border: false,
            icon: 'tab.png'
        };

        // 1.解析MenuID
        var arr = tabId.split('?');  // eg：App.BotMgr.BotMgrP?type=accept
        var tabPath = arr[0]; // 界面路径 eg：App.BotMgr.BotMgrP?type=accept
        if (arr.length > 1) { // tab配置参数
            var obj = Ext.Object.fromQueryString(arr[1]);
            Ext.apply(tabConfig, obj)
        }
      
        // 2.判断是否已存在此Tab，若存在就显示
        var newTab = Ext.getCmp('app_tabContainer').getComponent(tabId);
        if (!newTab) {
            Ext.syncRequire(tabPath, function () {
                newTab = Ext.create(tabId, tabConfig);
                Ext.getCmp('app_tabContainer').add(newTab);
                Ext.getCmp('app_tabContainer').setActiveTab(newTab);
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
AkExtJS.msg = {
    /** 
    * 弹出消息
    * @param msg {string} ：消息的内容
    */
    alert: function (msg) {
        Ext.Msg.alert('系统提示', msg);
    }
}