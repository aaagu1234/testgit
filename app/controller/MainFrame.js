Ext.define('ZK.controller.MainFrame', {
      extend: 'Ext.app.Controller',
      views: [
          'layout.LayoutNorth',
          'layout.LayoutCenter',
          'layout.LayoutWest'
      ],
//      stores: [
//          'layout.WestStore'
//      ], 
      refs: [
         { 
             ref: 'zkcenter',// zkcenter 的别名，可以用getZkcenter 获取到。
             selector: 'zkcenter'
         }
     ],
     init: function (app) {
         this.control({
             'zkwest': {
                 'itemclick': this.onItemClick
             }
         });
     },
     onItemClick: function (tree, record, item, index, e, eOpts) {
         var self = this;
         var selected = record;
         if (selected.get('id') == 'nrgl') {
//             Ext.require("GxhDemo.controller.BHCMSController", function () {
//                 var bhcmsController = application.getController('BHCMSController');
//                 bhcmsController.init(self);
//             }, self);
         } else if (selected.get('id') == 'wdgzt') {
//             Ext.require("GxhDemo.controller.BHINFOController", function () {
//                 var bhinfoController = application.getController('BHINFOController');
//                 bhinfoController.init(self);
//             }, self);
         }
     }
 });