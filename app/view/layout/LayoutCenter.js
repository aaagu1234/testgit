//# sourceURL=ZK.view.layout.LayoutCenter.js
Ext.define('ZK.view.layout.LayoutCenter', {
	id: 'app_tabContainer',
    extend: 'Ext.tab.Panel',
    alias : 'widget.zkcenter',
    autoScroll: true,
    layout: 'fit',
    autoShow: true,
    defaults: {
        autoScroll: true,
        bodyPadding: 4,
        closable: true  //tab页的关闭按钮
    },
    initComponent: function() {
    	var me = this;
        Ext.apply(this, {
            region: 'center',
            layout: 'fit'
        });
        me.callParent(arguments);
    },
    listeners: {
        tabchange: function (thisControl, newCard, oldCard) {
         
            // 1.选中tree节点
            ZkExtJS.extjs.selectMenuTreeNode(newCard.treeId);
            // 2.修改url
//            if (oldCard) {
//                history.pushState('', '', location.href.split('#')[0] + '#' + newCard.id);
//            }
        }
    }
});
 