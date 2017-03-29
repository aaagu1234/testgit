Ext.define('ZK.store.Users', {
			extend : 'Ext.data.Store',
			model : 'ZK.model.User',
			autoLoad: true,
			pageSize:10,
			proxy : {
				type : 'ajax',
			    //headers: {'Content-Type':'application/x-www-form-urlencoded'},
				api : {
					create : 'user/insert',
					read : 'user/getList',
					update : 'user/update',
					destroy: 'user/delete' 
					
				},
				reader : {
					type : 'json',
					root : 'data',
					successProperty : 'success',
					totalProperty: 'rowCount',
					msgProperty:'msg'
				},
				writer:{
					encode:true,
					root:'data'
				},
			      actionMethods: {
			          create : 'POST',  
			          read   : 'GET',  
			          update : 'POST',  
			          destroy: 'POST'  
			      } 
			},
			listeners: {
			      beforeload: function (thisStore, record, opts) {
			          // 附加检索条件
			          // thisStore.proxy.extraParams = searchConditionObj;
			          //toolBarPanel.down('[name=EditBtn]').hide();
			      },
			      exception: function(proxy, response, operation)
		            {
		                Ext.MessageBox.show(
		                {
		                    title: '请求处理错误',
		                    msg: Ext.isString(operation.getError())? operation.getError() : '请确认网络或服务是否正常',
		                    icon: Ext.MessageBox.ERROR,
		                    buttons: Ext.Msg.OK
		                });
		            }
			}
}) 
 
