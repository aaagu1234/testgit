/*!
* 组件创建比较
*/
Ext.define('app.Demo.CreateCompareTab', {
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
        var _container = AkExtJS.extjs.createPanel({
            layout: 'vbox',
            items: [
                Ext.create('Ext.form.Display', {
                    width: '100%',
                    value: '<h1>组件的创建方式</h1>' +
                        '<p>文章地址：<a href="http://www.cnblogs.com/polk6/p/5771174.html#Menu2-Create" target="_blank">http://www.cnblogs.com/polk6/p/5771174.html#Menu2-Create</a></p>'
                }),
                Ext.create('Ext.form.Display', {
                    width: '100%',
                    value: '<h2>1.Ext.create(name, [config])方式</h2>' 
                }),
                Ext.create('Ext.form.field.TextArea', {
                    fieldLabel: '示例',
                    labelWidth:30,
                    autoScroll: true,
                    readOnly: true,
                    height: 280,
                    width: 400,
                    fieldStyle: 'width:340px;height:280px;margin-top: 2px;overflow: auto;border-width: 0px;background: white;',
                    value:"Ext.create('Ext.tab.Panel', {\r\n"+
                        "    height: 100,\r\n"+
                        "    width: 200,\r\n"+
                        "    items: [\r\n"+
                        "         Ext.create('Ext.panel.Panel', {\r\n"+
                        "             title: 'TabA',\r\n"+
                        "             html: 'Ext.create : The tab A'\r\n"+
                        "         }),\r\n"+
                        "         Ext.create('Ext.panel.Panel', {\r\n"+
                        "             title: 'TabB',\r\n"+
                        "             html: 'Ext.create : The tab B'\r\n"+
                        "         }),\r\n"+
                        "    ],\r\n"+
                        "    style: {\r\n"+
                        "        marginTop:'30px'\r\n"+
                        "    }\r\n"+
                        "}),\r\n"
                }),
                Ext.create('Ext.tab.Panel', {
                    height: 100,
                    width: 200,
                    items: [
                         Ext.create('Ext.panel.Panel', {
                             title: 'TabA',
                             html: 'Ext.create : The tab A'
                         }),
                         Ext.create('Ext.panel.Panel', {
                             title: 'TabB',
                             html: 'Ext.create : The tab B'
                         }),
                    ],
                    style: {
                        marginTop:'30px'
                    }
                }),
                Ext.create('Ext.form.Display', {
                    width: '100%',
                    value: '<h2>2.直接通过xtype配置</h2>'
                }),
                Ext.create('Ext.form.field.TextArea', {
                    fieldLabel: '示例',
                    labelWidth: 30,
                    autoScroll: true,
                    readOnly: true,
                    height: 180,
                    width: 800,
                    fieldStyle: 'height:180px;margin-top: 2px;overflow: auto;border-width: 0px;background: white;',
                    value: "Ext.create('Ext.tab.Panel', {\r\n" +
                        "    height: 100,\r\n" +
                        "    width: 200,\r\n" +
                        "    items: [\r\n" +
                        "        { xtype: 'panel', title: 'TabA', html: 'xtype : The tab A' },\r\n" +
                        "        { xtype: 'panel', title: 'TabB', html: 'xtype : The tab B' },\r\n" +
                        "    ],\r\n" +
                        "    style: {\r\n" +
                        "        marginTop: '30px'\r\n" +
                        "    }\r\n" +
                        "})"
                }),
                Ext.create('Ext.tab.Panel', {
                    height: 100,
                    width: 200,
                    items: [
                        { xtype: 'panel', title: 'TabA', html: 'xtype : The tab A' },
                        { xtype: 'panel', title: 'TabB', html: 'xtype : The tab B' },
                    ],
                    style: {
                        marginTop: '30px'
                    }
                }),
            ]
        });

        Ext.applyIf(me, {
            items: [_container]
        });
        me.callParent(arguments);
    }
});
 //# sourceURL=App/Demo/CreateCompareTab.js