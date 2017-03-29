/*!
* 组件创建比较
*/
Ext.define('app.Demo.MergeGridTab', {
    extend: 'Ext.panel.Panel',
    layout: 'fit',
    closable: true,
    reload: function () {

    },
    initComponent: function () {
        var me = this;
        // 创建store
        var _store = Ext.create('Ext.data.Store', {
            fields: ['className', 'gender', 'state','userName'],
            data: {
                'items': [
                    { 'className': '一年级', 'gender': '男', 'state': '优秀', 'userName': '路人1' },
                    { 'className': '一年级', 'gender': '男', 'state': '良', 'userName': '路人2' },
                    { 'className': '一年级', 'gender': '女', 'state': '优秀', 'userName': '路人3' },
                    { 'className': '一年级', 'gender': '女', 'state': '及格', 'userName': '路人4' },
                    { 'className': '一年级', 'gender': '女', 'state': '优秀', 'userName': '路人5' },
                    { 'className': '二年级', 'gender': '男', 'state': '优秀', 'userName': '路人6' },
                    { 'className': '二年级', 'gender': '男', 'state': '优秀', 'userName': '路人7' },
                    { 'className': '二年级', 'gender': '男', 'state': '及格', 'userName': '路人8' },
                    { 'className': '二年级', 'gender': '男', 'state': '及格', 'userName': '路人9' },
                    { 'className': '二年级', 'gender': '女', 'state': '优秀', 'userName': '路人10' },
                    { 'className': '三年级', 'gender': '女', 'state': '优秀', 'userName': '路人11' },
                    { 'className': '三年级', 'gender': '女', 'state': '优秀', 'userName': '路人12' },
                ]
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        // 创建工具条
        var _toolBarPanel = Ext.create('Ext.panel.Panel', {
            width: '100%',
            height: 40,
            bodyBorder: false,
            border: false,
            region: 'north',
            tbar: [
                Ext.create('Ext.Action', {
                    icon: 'Resources/icon/refresh.png',
                    text: '刷新',
                    handler: function (thisControl, event) {
                        AkExtJS.extjs.cancelMergeGrid(_grid, [1, 2]);
                    }
                }),
                Ext.create('Ext.Action', {
                    icon: 'Resources/icon/merge.png',
                    text: '逐个列合并',
                    tooltip:'每个列在前面列合并的前提下可分别合并',
                    handler: function (thisControl, event) {
                        AkExtJS.extjs.mergeGrid(_grid, [1, 2], false);
                    }
                }),
                Ext.create('Ext.Action', {
                    icon: 'Resources/icon/equal.png',
                    text: '相同列合并',
                    tooltip: '只有相邻tr所指定的td都相同才会进行合并',
                    handler: function (thisControl, event) {
                        AkExtJS.extjs.mergeGrid(_grid, [1, 2], true);
                    }
                }),
            ]
        });

        // 创建grid
        var _grid = Ext.create('Ext.grid.Panel', {
            columnLines: true,
            rowLines: true,
            showLines: true,
            store: _store,
            tbar: _toolBarPanel,
            layout: 'fit',
            columns: [
                Ext.create('Ext.grid.RowNumberer', {
                    text: '序号',
                    width: 50
                }), {
                    text: '班级',
                    dataIndex: 'className',
                    flex: 1
                }, {
                    text: '性别',
                    dataIndex: 'gender',
                    width: 150
                }, {
                    text: '成绩',
                    dataIndex: 'state',
                    width: 150
                }, {
                    text: '姓名',
                    dataIndex: 'userName',
                    width: 150
                }
            ],
            listeners: {
                afterlayout: function (thisControl, layout, eOpts) {
                }
            }
        });

        Ext.applyIf(me, {
            items: [_grid]
        });
        me.callParent(arguments);
    }
});
 //# sourceURL=App/Demo/MergeGridTab.js