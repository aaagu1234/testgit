/*!
* 组件创建比较
*/
 //# sourceURL=zk.view.user.List.js
Ext.define('ZK.view.user.List', {
    extend: 'Ext.panel.Panel',
    layout: 'fit',
    closable: true,
    alias : 'widget.userlist',
    title : '用户信息列表',
    reload: function () {

    },
    initComponent: function () {
    	 
        var me = this;
        var searchConditionObj = {}; // 查询条件
        var selectData = {};


        // 创建工具条
        var toolBarPanel = Ext.create('Ext.panel.Panel', {
            width: '100%',
            height: 40,
            bodyBorder: false,
            border: false,
            region: 'north',
            tbar: [
                Ext.create('Ext.form.field.Text', {
                    name: 'SearchTxt',
                    emptyText: '请输入姓名',
                    width: 200,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function (thisControl, e, eOpts) {
                            if (e.button == 12) {  // 若敲的键为回车，就执行【查询】搜索
                                toolBarPanel.down('[name=QueryBtn]').handler();
                            }
                        }
                    }
                }),
                Ext.create('Ext.Action', {
                	id:'userQueryBtn',
                    icon: 'Resources/icon/find.png',
                    text: '查询',
                    name: 'QueryBtn',
                    handler: function () {
                    	var gridStore = dataGrid.getStore();
                    	 gridStore.proxy.extraParams = {name: toolBarPanel.down('[name=SearchTxt]').value};
                        // 设置搜索条件
                       // searchConditionObj.SearchTxt = toolBarPanel.down('[name=SearchTxt]').value;
                    	 gridStore.loadPage(1);
                    }
                }),
                Ext.create('Ext.Action', {
                    icon: 'Resources/icon/find.png',
                    text: '单选按钮',
                    name: 'QueryBtn1',
                    handler: function () {
                    	 //ZK.view.user.RadioBtn
                    	Ext.create('ZK.view.user.RadioBtn');
                    }
                }),
                '->',
                Ext.create('Ext.Button', { // 添加
                    icon: 'Resources/icon/add.png',
                    text: '添加',
                    name: 'AddBtn' 
                }),
                Ext.create('Ext.Action', {
                    icon: 'Resources/icon/edit.png',
                    text: '编辑',
                    name: 'EditBtn',
                    hidden:true
                    //,
//                    handler: function (thisControl, event) {
//                        var winConfig = {
//                            title: '编辑用户',
//                            oprType: 'edit',
//                            url: 'Business/ShipMgr/Update',
//                            userId:selectData.id,
//                            successCallback: function () {
//                                userStore.reload(); // 修改成功后刷新Store
//                            }
//                        };
//                        var win = Ext.create('App.ShipMgr.view.AddShipWindow', winConfig);
//                        Ext.getCmp('app_tabContainer').activeTab.add(win);
//                        win.show();
//                    }
                })
            ]
        });

        // 创建grid
        var dataGrid = Ext.create('Ext.grid.Panel', {
            columnLines: true,
            rowLines: true,
            store: 'Users', 
            tbar:toolBarPanel,
            bbar: Ext.create('Ext.toolbar.Paging', {
            	store: 'Users', 
                pageSize: 5,
                displayInfo: true,
                displayMsg: '当前显示第{0}行到第{1}行，一共{2}行。',
                emptyMsg: '没有任何记录'
            }),
            columns: [
                Ext.create('Ext.grid.RowNumberer', {
                    text: '序号',
                    width: 50
                }),{
                	 dataIndex: 'id',// 隐藏域
                	 hidden: true, 
                	 hideLabel:true
                }, {
                    text: '姓名',
                    dataIndex: 'name',
                    flex:1
                }, {
                    text: '性别',
                    dataIndex: 'sex',
                    width: 150
                }, {
                    text: '年龄',
                    dataIndex: 'age',
                    width: 150
                }, {
                    text: '生日',
                    dataIndex: 'birth',
                    width: 150
                },{
                    text: '家乡',
                    dataIndex: 'hometown',
                    width: 150
                },{
                    text: '爱好',
                    dataIndex: 'hobby',
                    width: 150
                },{
                    xtype:'actioncolumn',
                    width:50,
                    items: [{ 
                        icon: 'static/extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                        tooltip: '编辑',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            // 直接调用grid的双击事件
                            grid.fireEvent('itemdblclick',grid,rec);
                        }
                    },{
                        icon: 'static/extjs/examples/restful/images/delete.png',
                        tooltip: '删除',
                        handler: function(grid, rowIndex, colIndex) {
                        	//Ext.Msg.wait('提示','正在上传...');  
                        	var gStore = grid.getStore();
                        	Ext.Msg.confirm('确认','确定要删除吗？',function(id){
                        		   if(id=='yes'){
                        			   gStore.removeAt(rowIndex);
                        			   grid.setLoading(true);
                                       gStore.sync(ZkExtJS.extjs.responseCallback(grid,gStore,3));
                        		    }else if(id=='no'){  
                        		       
                        		    }  
                        	});
                          
                        }
                    }]
                 }
//                ,这个形式也可以的
//                {
//                    text:"操作",
//                    width:130,
//                    align:"center",
//                    renderer:function(value,cellmeta){
//                      var returnStr = "<INPUT type='button' value='按钮点击'>";
//                      return returnStr;
//                    }
//                }
            ],
            listeners: {
                cellclick: function (thisGridView, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    selectData = record.data;
                    var editBtn = toolBarPanel.down('[name=EditBtn]');
                    editBtn.show();
                    editBtn.zkSelectedRow = record.data;
                    editBtn.currentPage = thisGridView.up('gridpanel').down('pagingtoolbar').getPageData().currentPage;
                   
                }
            }
        });

        Ext.applyIf(me, {
            items: [dataGrid]
        });
        me.callParent(arguments);
    }
});
