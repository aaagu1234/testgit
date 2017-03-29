Ext.define('ZK.view.student.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.studentlist',
    store: 'Students',
    title : '学生信息列表',
    initComponent: function() {
        

        this.columns = [
            {header: '编号',  dataIndex: 'id',  flex: 1},
            {header: '学生姓名',  dataIndex: 'name',  flex: 1},
            {header: '年龄', dataIndex: 'age', flex: 1},
			{header: '性别', dataIndex: 'sex', flex: 1}
        ];
        this.callParent(arguments);
    }
});