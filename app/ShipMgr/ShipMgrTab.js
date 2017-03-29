/*!
* 组件创建比较
*/
Ext.define('App.ShipMgr.ShipMgrTab', {
    extend: 'Ext.panel.Panel',
    layout: 'fit',
    closable: true,
    requires: ['App.ShipMgr.model.ShipModel', 'App.ShipMgr.view.AddShipWindow'],
    reload: function () {

    },
    initComponent: function () {
        var me = this;
        var searchConditionObj = {}; // 查询条件
        var selectData = {};
        // 创建store
        var shipMgrStore = Ext.create('Ext.data.Store', {
            model: 'App.ShipMgr.model.ShipModel',
            pageSize: 25,
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'Business/ShipMgr/Query',
                reader: {
                    reader: 'json',
                    root: 'data',
                    totalProperty: 'rowCount'
                },
                actionMethods: {
                    create: 'Post'
                }
            },
            listeners: {
                beforeload: function (thisStore, record, opts) {
                    // 附加检索条件
                    thisStore.proxy.extraParams = searchConditionObj;
                    shipMgrToolBarPanel.down('[name=EditBtn]').hide();
                }
            }
        });

        // 创建工具条
        var shipMgrToolBarPanel = Ext.create('Ext.panel.Panel', {
            width: '100%',
            height: 40,
            bodyBorder: false,
            border: false,
            region: 'north',
            tbar: [
                Ext.create('Ext.form.field.Text', {
                    name: 'SearchTxt',
                    emptyText: '请输入船舶名称',
                    width: 200,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function (thisControl, e, eOpts) {
                            if (e.button == 12) {  // 若敲的键为回车，就执行【查询】搜索
                                shipMgrToolBarPanel.down('[name=QueryBtn]').handler();
                            }
                        }
                    }
                }),
                Ext.create('Ext.Action', {
                    icon: 'Resources/icon/find.png',
                    text: '查询',
                    name: 'QueryBtn',
                    handler: function () {
                        // 设置搜索条件
                        searchConditionObj.SearchTxt = shipMgrToolBarPanel.down('[name=SearchTxt]').value;
                        shipMgrStore.loadPage(1);
                    }
                }),
                '->',
                Ext.create('Ext.Action', { // 添加
                    icon: 'Resources/icon/add.png',
                    text: '添加',
                    name: 'AddBtn',
                    handler: function (thisControl, event) {
                        var winConfig = {
                            title: '添加船舶',
                            oprType: 'add',
                            url: 'Business/ShipMgr/Add',
                            successCallback: function () {
                                shipMgrStore.loadPage(1); // 添加成功后刷新Store
                            }
                        };
                        var win = Ext.create('App.ShipMgr.view.AddShipWindow', winConfig);
                        Ext.getCmp('app_tabContainer').activeTab.add(win);
                        win.show();
                    }
                }),
                Ext.create('Ext.Action', {
                    icon: 'Resources/icon/edit.png',
                    text: '修改',
                    name: 'EditBtn',
                    hidden:true,
                    handler: function (thisControl, event) {
                        var winConfig = {
                            title: '修改船舶',
                            oprType: 'edit',
                            url: 'Business/ShipMgr/Update',
                            shipId:selectData.ShipId,
                            successCallback: function () {
                                shipMgrStore.reload(); // 修改成功后刷新Store
                            }
                        };
                        var win = Ext.create('App.ShipMgr.view.AddShipWindow', winConfig);
                        Ext.getCmp('app_tabContainer').activeTab.add(win);
                        win.show();
                    }
                })
            ]
        });

        // 创建grid
        var shipMgrGrid = Ext.create('Ext.grid.Panel', {
            columnLines: true,
            rowLines: true,
            store: shipMgrStore,
            tbar:shipMgrToolBarPanel,
            bbar: Ext.create('Ext.toolbar.Paging', {
                store: shipMgrStore,
                pageSize: 25,
                displayInfo: true,
                displayMsg: '当前显示第{0}行到第{1}行，一共{2}行。',
                emptyMsg: '没有任何记录'
            }),
            columns: [
                Ext.create('Ext.grid.RowNumberer', {
                    text: '序号',
                    width: 50
                }), {
                    text: '船舶名称',
                    dataIndex: 'ShipName',
                    flex:1
                }, {
                    text: '状态名称',
                    dataIndex: 'StateName',
                    width: 150
                }, {
                    text: '吨位',
                    dataIndex: 'Tonnage',
                    width: 150
                }, {
                    text: '核载人数',
                    dataIndex: 'LoadNumber',
                    width: 150
                }
            ],
            listeners: {
                cellclick: function (thisGridView, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    selectData = record.data;
                    shipMgrToolBarPanel.down('[name=EditBtn]').show();
                }
            }
        });

        Ext.applyIf(me, {
            items: [shipMgrGrid]
        });
        me.callParent(arguments);
    }
});
 //# sourceURL=App/ShipMgr/ShipMgrTab.js