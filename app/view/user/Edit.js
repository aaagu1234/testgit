

Ext.require([
    'Ext.ux.DataTip'
]);  
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

Ext.define('ZK.view.user.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.useredit',
    title : '修改用户信息',
    layout: 'fit',
    width:350,
    modal:true,
    autoShow: true,
    initComponent: function() {
        Ext.applyIf(this, {
            items: [Ext.create('ZK.view.user.Form')]
        });
        this.callParent(arguments);
    }
});

Ext.define('ZK.view.user.Form', {
    extend: 'Ext.form.Panel',
    layout: 'form',
    trackResetOnLoad:true,
    bodyPadding: '10 10 10 0',
    autoShow: true,
    constrain: true, // 是否只能在父容器的范围内拖动
    modal: true, // 是否有遮挡层
    fieldDefaults: {
        msgTarget: 'side',
        labelAlign: 'right',
        labelWidth: 75,
        width: 275
    },
    plugins: {
        ptype: 'datatip'
    },
    defaultType: 'textfield',
    items:[ {
        xtype: 'hiddenfield',
        name: 'id',
        value: ''
    },{
        fieldLabel: '姓名',
        afterLabelTextTpl: required,
        name: 'name',
        allowBlank: false,
        tooltip: '请输入姓名'
    }, {
    	xtype: 'radiogroup',
        fieldLabel : '性别',
        layout:{
        	type:'hbox'
        },
        items: [
            {
                boxLabel  : '男',
                name      : 'sex',
                inputValue: '1',
                width:50
            }, {
                boxLabel  : '女',
                name      : 'sex',
                inputValue: '2' ,
                width:50
            }
        ]
    }, {
        fieldLabel: '年龄',
        name: 'age',
        xtype: 'numberfield',
        minValue: 0,
        maxValue: 100,
        tooltip: '请输入年龄'
    }, {
          
           xtype: "datefield",
     	   name: "birth",
     	   fieldLabel: "生日",
     	   editable: true,
     	   emptyText: "--请选择--",
     	   format: "Y-m-d",//日期的格式
     	   altFormats: "Y/m/d|Ymd",
     	   tooltip: '请输入生日日期',
     	   listeners: {
     		    //光标聚焦时触发的事件
     		    "focus": function () { 
     		       
     		    },
     		    //失去焦点时触发的事件
     		    "blur":function(){
     		    }} 
    },
    {
    	xtype:'combobox',
        fieldLabel: '地区',
        name: 'hometown',
        emptyText: '请选择家乡',
        editable: false,
        allowBlank: false,
        valueField: 'hometown',
        displayField: 'hometownName',
        queryMode: 'local',
        triggerAction: 'all',
        afterLabelTextTpl: '<span style="position: absolute;margin-left: 210px;color: red;line-height: 2;" >*<span>',
        store: Ext.create('Ext.data.Store', {
            fields: ['hometown', 'hometownName'],
            data : [
                { 'hometown': '河北省', 'hometownName': '河北省' },
                { 'hometown': '北京', 'hometownName': '北京' },
                { 'hometown': '山东省', 'hometownName': '山东省' }
            ]
        })
    },{
        xtype: 'checkboxgroup',
        id:'mycheckboxgroup',
        fieldLabel: '爱好',
        // Arrange checkboxes into two columns, distributed vertically
        columns: 4,
        vertical: true,
        align: 'left',
        items: [
            { width:60, boxLabel: '足球', name: 'hobby', inputValue: '1' },
            { width:60,boxLabel: '篮球', name: 'hobby', inputValue: '2'},
            { width:60,boxLabel: '乒乓', name: 'hobby', inputValue: '3' },
            { width:60, boxLabel: '跑步', name: 'hobby', inputValue: '4' },
            { width:60, boxLabel: '游泳', name: 'hobby', inputValue: '5' },
            { width:60,boxLabel: '棒球', name: 'hobby', inputValue: '6' }
        ]
    }],

    buttons: [{
        text: '保存',
        action: 'save'
    },{
        text: '取消',
        handler: function(){
        	this.up('form').up('window').close();
        }
    }]
});
