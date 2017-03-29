/*!
* 首页
*/
Ext.define('app.indexTab', {
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

        // 问题列表Form
        var _form = AkExtJS.extjs.createForm({
            region: 'center',
            autoScroll: true,
            fieldDefaults: {
                anchor: '100%'
            },
            items: [
                Ext.create('Ext.form.Display', {
                    width: '100%',
                    value: '<div class="container-fluid">' +
                        '	<div class="row-fluid">' +
                        '		<div class="span12">' +
                        '			<h3>ExtJS 4.2 Demo演示地址</h3>' +
                        '			<p>包含的文章有：</p>' +
                        '			<ul type="none">' +
                        '				<li>' +
                        '					<h5><strong>1. <a href="http://www.cnblogs.com/polk6/p/5713528.html" target="_blank">ExtJS 4.2 介绍</a></strong></h5>' +
                        '				</li>' +
                        '               <li>' +
                        '					<h5><strong>2. <a href="http://www.cnblogs.com/polk6/p/5738789.html" target="_blank">ExtJS 4.2 第一个程序</a></strong></h5>' +
                        '				</li>' +
                        '               <li>' +
                        '					<h5><strong>3. <a href="http://www.cnblogs.com/polk6/p/5771174.html" target="_blank">ExtJS 4.2 组件介绍</a></strong></h5>' +
                        '				</li>' +
                        '               <li>' +
                        '					<h5><strong>4. <a href="http://www.cnblogs.com/polk6/p/5816889.html" target="_blank">ExtJS 4.2 组件的查找方式</a></strong></h5>' +
                        '				</li>' +
                        '               <li>' +
                        '					<h5><strong>5. <a href="http://www.cnblogs.com/polk6/p/5800342.html" target="_blank">ExtJS 4.2 业务开发(一)主页搭建</a></strong></h5>' +
                        '				</li>' +
                        '               <li>' +
                        '					<h5><strong>6. <a href="http://www.cnblogs.com/polk6/p/5914861.html" target="_blank">ExtJS 4.2 业务开发(二)数据展示和查询</a></strong></h5>' +
                        '				</li>' +
                        '               <li>' +
                        '					<h5><strong>7. <a href="http://www.cnblogs.com/polk6/p/5929948.html" target="_blank">ExtJS 4.2 业务开发(三)数据添加和修改</a></strong></h5>' +
                        '				</li>' +
                        '			</ul>' +
                        '		</div>' +
                        '	</div>' +
                        '</div>'
                }),
            ]
        });

        var _container = AkExtJS.extjs.createPanel({
            layout: 'border',
            region: 'center',
            items: [_form]
        });

        Ext.applyIf(me, {
            items: [_container]
        });

        me.callParent(arguments);
    }
});