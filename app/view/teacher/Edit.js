Ext.define('ZK.view.teacher.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.teacheredit',
    title : '修改老师信息',
    layout: 'fit',
    autoShow: true,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        fieldLabel: '老师姓名'
                    },
                    {
                        xtype: 'textfield',
                        name : 'age',
                        fieldLabel: '年龄'
                    },
                    {
                        xtype: 'textfield',
                        name : 'sex',
                        fieldLabel: '性别'
                    }
                ]
            }
        ];
        this.buttons = [
            {
                text: '保存',
                action: 'save'
            },
            {
                text: '取消',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});