Ext.define('ZK.view.teacher.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.teacherlist',
    store: 'Teachers',
    title : '老师信息列表',
    initComponent: function() {
        

        this.columns = [
            {header: '编号',  dataIndex: 'id',  flex: 1},
            {header: '老师姓名',  dataIndex: 'name',  flex: 1},
            {header: '年龄', dataIndex: 'age', flex: 1},
			{header: '性别', dataIndex: 'sex', flex: 1}
        ];
        this.callParent(arguments);
    }
});