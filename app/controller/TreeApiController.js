 //# sourceURL=ZK.controller.Users.js 
Ext.define('ZK.controller.TreeApiController', {
    extend: 'Ext.app.Controller',
    views: [
        'treeapi.MyTreePanel' 
    ],
    stores: ['MyTreeStore'], // generate getter methods 生成 getUsersStore -todo
    models: ['MyTreeModel'],
    init: function() {
      
    	this.control({
           
        });
    }
});