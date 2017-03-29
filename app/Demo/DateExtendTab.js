/*!
* Date组件扩展
*/
Ext.define('app.Demo.DateExtendTab', {
    extend: 'Ext.panel.Panel',
    layout: 'fit',
    closable: true,
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
                    value: '<h1>Date组件扩展</h1>' +
                        '<p>文章地址：<a href="http://www.cnblogs.com/polk6/p/5771174.html#Menu2-Create" target="_blank">http://www.cnblogs.com/polk6/p/5771174.html#Menu2-Create</a></p>'+
                        '<p>此处介绍是在Date组件上增加一个【清除】按钮：用于取消已选中Date的值</p>'
                }),
                Ext.create('Ext.form.field.Date', {
                    fieldLabel: '原先日期组件',
                    labelWidth: 110,
                    width: 220,
                    editable: false,
                    format: 'Y-m-d',
                }),
                Ext.create('Ext.form.field.Date', {
                    fieldLabel: '扩展的日期组件',
                    labelWidth: 110,
                    width: 220,
                    editable: false,
                    format: 'Y-m-d',
                    hidden: true
                }),
                Ext.create('Ext.button.Button', {
                    text: '加载扩展插件',
                    handler: function (thisControl, event) {
                        Ext.syncRequire('Js.ux.DatePicker', function () {
                            thisControl.prev().show();
                            AkExtJS.msg.alert('加载成功，请重新点击日期组件');
                        });
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
 //# sourceURL=App/Demo/DateExtendTab.js