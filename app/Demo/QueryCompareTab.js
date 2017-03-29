/*!
* 查询组件
*/
Ext.define('app.Demo.QueryCompareTab', {
    extend: 'Ext.panel.Panel',
    layout: 'fit',
    closable: true,
    requires: [],
    reload: function () {

    },
    initComponent: function () {
        var me = this;
       
        // panel渲染后
        me.on('afterrender', function () {

        });

        var _from = AkExtJS.extjs.createForm({
            id:'query_form',
            title: '表单',
            height: 180,
            width: 500,
            border: true,
            fieldDefaults: {
                width: '100%',
                labelWidth: 20
            },
            items: [
                Ext.create('Ext.form.FieldContainer', {
                    id: 'A',
                    layout: 'hbox',
                    fieldLabel: 'A',
                    fieldDefaults: {
                        width: '30%',
                        style: {
                            marginRight: '10px'
                        }
                    },
                    items: [
                       { xtype: 'textfield', id: 'A1', value: 'A1' },
                       { xtype: 'textfield', id: 'A2', value: 'A2' },
                       { xtype: 'textfield', id: 'A3', value: 'A3' },
                    ]
                }),
                Ext.create('Ext.form.FieldContainer', {
                    id: 'B',
                    layout: 'hbox',
                    fieldLabel: 'B',
                    fieldDefaults: {
                        width: '30%',
                        style: {
                            marginRight: '10px'
                        }
                    },
                    items: [
                       { xtype: 'textfield', id: 'B1', value: 'B1' },
                       { xtype: 'textfield', id: 'B2', value: 'B2' },
                       { xtype: 'textfield', id: 'B3', value: 'B3' },
                    ]
                }),
                Ext.create('Ext.form.FieldContainer', {
                    id: 'C',
                    layout: 'hbox',
                    fieldLabel: 'C',
                    fieldDefaults: {
                        width: '30%',
                        style: {
                            marginRight: '10px'
                        }
                    },
                    items: [
                       { xtype: 'textfield', id: 'C1', value: 'C1' },
                       { xtype: 'textfield', id: 'C2', value: 'C2' },
                       { xtype: 'textfield', id: 'C3', value: 'C3' },
                    ]
                }),
                Ext.create('Ext.form.FieldContainer', {
                    id: 'D',
                    layout: 'hbox',
                    fieldLabel: 'D',
                    fieldDefaults: {
                        width: '30%',
                        style: {
                            marginRight: '10px'
                        }
                    },
                    items: [
                       { xtype: 'textfield', id: 'D1', value: 'D1' },
                       { xtype: 'textfield', id: 'D2', value: 'D2' },
                       { xtype: 'textfield', id: 'D3', value: 'D3' },
                    ]
                }),
            ]
        });

        var _container = AkExtJS.extjs.createPanel({
            layout: 'vbox',
            items: [
                Ext.create('Ext.form.Display', {
                    width: '100%',
                    value: '<h1>组件的查找方式</h1>' +
                        '<p>文章地址：<a href="http://www.cnblogs.com/polk6/p/5816889.html" target="_blank">http://www.cnblogs.com/polk6/p/5816889.html</a></p>'
                }),
                _from,
                Ext.create('Ext.form.Display', {
                    width: '100%',
                    value: '<h2>1. 全局查找方式</h2>'
                }),
                Ext.create('Ext.form.Display', {
                    width: '100%',
                    value: '<h3>1.1 Ext.getCmp(id) ：返回此id对应的组件</h3>'
                }),
                Ext.create('Ext.form.FieldContainer', {
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        Ext.create('Ext.form.Display', {
                            width: 250,
                            value: '示例： Ext.getCmp(\'query_form\')'
                        }),
                        Ext.create('Ext.button.Button', {
                            width: 50,
                            text: '运行',
                            handler: function () {
                                var obj = Ext.getCmp('query_form');
                                AkExtJS.msg.alert(obj);
                            }
                        }),
                    ]
                }),
                Ext.create('Ext.form.Display', {
                    width: '100%',
                    value: '<h3>1.2 Ext.ComponentQuery.query(selector, [root]) ：返回一个符合匹配的组件数组</h3>'
                }),
                Ext.create('Ext.form.FieldContainer', {
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        Ext.create('Ext.form.field.TextArea', {
                            fieldLabel: '示例',
                            labelWidth: 30,
                            autoScroll: true,
                            readOnly: true,
                            height: 250,
                            width: 400,
                            fieldStyle: 'width:340px;height:250px;margin-top: 2px;overflow: auto;border-width: 0px;background: white;',
                            value: "// 1.xtype查找：获取所有文本输入框(xtype:textfield)\r\n" +
                                    "var textfieldArray = Ext.ComponentQuery.query('textfield');\r\n" +
                                    " \r\n" +
                                    "// 2.id查找\r\n" +
                                    "var formArray = Ext.ComponentQuery.query('#query_form');\r\n" +
                                    " \r\n" +
                                    "// 3.xype+属性查找：指定from组件，并且title属性的值为'表单'\r\n" +
                                    "var formArray = Ext.ComponentQuery.query('form[title=表单]');\r\n" +
                                    " \r\n" +
                                    "// 4.属性查找：title属性的值为'表单'的组件\r\n" +
                                    "var formArray = Ext.ComponentQuery.query('[title=表单]');"
                        }),
                    ]
                }),
                Ext.create('Ext.form.Display', {
                    width: '100%',
                    value: '<h2>2. 容器内查找</h2>'
                }),
                Ext.create('Ext.form.Display', {
                    width: '100%',
                    value: '<h3>2.1 containerObj.child(selecter) ：返回第一个符合匹配的第一层子组件</h3>'
                }),
                Ext.create('Ext.form.FieldContainer', {
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        Ext.create('Ext.form.field.TextArea', {
                            fieldLabel: '示例',
                            labelWidth: 30,
                            autoScroll: true,
                            readOnly: true,
                            height: 50,
                            width: 400,
                            fieldStyle: 'width:340px;height:50px;margin-top: 2px;overflow: auto;border-width: 0px;background: white;',
                            value: "// 返回form表单下的第一层 xtype为fieldcontainer 的子组件\r\n" +
                                    "var fc = Ext.getCmp('query_form').child('fieldcontainer');"
                        }),
                    ]
                }),
                Ext.create('Ext.form.Display', {
                    width: '100%',
                    value: '<h3>2.2 containerObj.down([selecter]) ：返回第一个符合匹配的子组件</h3>'
                }),
                Ext.create('Ext.form.FieldContainer', {
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        Ext.create('Ext.form.field.TextArea', {
                            fieldLabel: '示例',
                            labelWidth: 30,
                            autoScroll: true,
                            readOnly: true,
                            height: 50,
                            width: 400,
                            fieldStyle: 'width:340px;height:50px;margin-top: 2px;overflow: auto;border-width: 0px;background: white;',
                            value: "// 返回form表单下的第一个 xtype为textfield 的子组件\r\n" +
                                    "var txt = Ext.getCmp('query_form').down('textfield');"
                        }),
                    ]
                }),
                Ext.create('Ext.form.Display', {
                    width: '100%',
                    value: '<h3>2.3 containerObj.query([selecter]) ：返回一个组件数组，包含当前容器内符合匹配规则的子组件</h3>'
                }),
                Ext.create('Ext.form.FieldContainer', {
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        Ext.create('Ext.form.field.TextArea', {
                            fieldLabel: '示例',
                            labelWidth: 30,
                            autoScroll: true,
                            readOnly: true,
                            height: 50,
                            width: 400,
                            fieldStyle: 'width:340px;height:50px;margin-top: 2px;overflow: auto;border-width: 0px;background: white;',
                            value: "// 返回form表单下的所有 xtype为textfield 的子组件\r\n" +
                                   "var txtArray = Ext.getCmp('query_form').query('textfield');"
                        }),
                    ]
                }),
                Ext.create('Ext.form.Display', {
                    width: '100%',
                    value: '<h3>2.4 containerObj.queryBy(fn, [scope]) ：返回一个组件数组，包含当前容器内符函数条件的子组件</h3>'
                }),
                Ext.create('Ext.form.FieldContainer', {
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        Ext.create('Ext.form.field.TextArea', {
                            fieldLabel: '示例',
                            labelWidth: 30,
                            autoScroll: true,
                            readOnly: true,
                            height: 150,
                            width: 400,
                            fieldStyle: 'width:340px;height:150px;margin-top: 2px;overflow: auto;border-width: 0px;background: white;',
                            value: "// 返回表单内有内容的组件\r\n" +
                                    "var cpArray = Ext.getCmp('query_form').queryBy(function(cp){\r\n" +
                                    "    if(cp.getValue){\r\n" +
                                    "        return cp.getValue().length>0;\r\n" +
                                    "    }\r\n" +
                                    "    return false;\r\n" +
                                    "})"
                        }),
                    ]
                }),
                Ext.create('Ext.form.Display', {
                    width: '100%',
                    value: '<h3>2.5 containerObj.queryById(id)：返回一个容器内符合此id的子组件</h3>'
                }),
                Ext.create('Ext.form.FieldContainer', {
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        Ext.create('Ext.form.field.TextArea', {
                            fieldLabel: '示例',
                            labelWidth: 30,
                            autoScroll: true,
                            readOnly: true,
                            height: 50,
                            width: 400,
                            fieldStyle: 'width:340px;height:50px;margin-top: 2px;overflow: auto;border-width: 0px;background: white;',
                            value: "// 获取表单内Id为 A1 的组件\r\n" +
                                    "var cp = Ext.getCmp('query_form').queryById('A1');"
                        }),
                    ]
                }),
            ]
        });

        Ext.applyIf(me, {
            items: [_container]
        });
        me.callParent(arguments);
    }
});
 //# sourceURL=App/Demo/QueryCompareTab.js