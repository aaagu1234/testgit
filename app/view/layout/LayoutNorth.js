Ext.define('ZK.view.layout.LayoutNorth', {
    extend: 'Ext.Component',
    alias : 'widget.zknorth',
    title : '上panel',
    layout: 'fit',
    autoShow: true,
    width: '100%',
    height: 80,
    bodyBorder: false,
    border: false,
    initComponent: function() { 
    	
    	var me = this;
        Ext.apply(this, {
            region: 'north',
            html:'这里放一个logo'
        });
        me.callParent(arguments);
    }
});