//# sourceURL=aa.js 
Ext.define('ZK.controller.Users', {
    extend: 'Ext.app.Controller',
    views: [
        'user.List',
        'user.Edit'
    ],
    refs: [
           { 
               ref: 'zkPanel',// zkPanel 的别名，可以用getZkPanel 获取到。
               selector: 'userlist'
           }
       ],
    stores: ['Users'], // generate getter methods 生成 getUsersStore -todo
    models: ['User'],
    init: function() {
    	var User = this.getUserModel();
    	//var ed = new User({id:4,name:'hello'});
    	// 可以获取store 对象并且可以传参数进去。
        var uStore =  this.getUsersStore();
        //uStore.proxy.extraParams = {'test':123,'test2':'aa'};
        //uStore.add(ed);
    	this.control({
            /*'viewport > panel': {
                render: this.onPanelRendered
            }*/
    		'userlist > grid': {
                itemdblclick: this.editUser
            },
            'useredit button[action=save]': {
                click: this.updateUser
            },
            'userlist > #userQueryBtn':{
            	 handler: this.queryBtnHandler
            },
            'userlist [name=AddBtn]':{
            	click: this.addBtnHandler
            },
            'userlist [name=EditBtn]':{
            	click: this.editBtnHandler
            }
        });
    },
    onPanelRendered:function(){
       console.log("panel rendered!");
    },
    editUser:function(grid,record){
    	var view = Ext.widget('useredit');
    	var form = view.down('form');
        form.loadRecord(record);
        this.currentPage =  grid.up('gridpanel').down('pagingtoolbar').getPageData().currentPage;
        //选中多选框 -爱好
        form.getChildByElement('mycheckboxgroup').setValue({'hobby':record.raw.hobby?record.raw.hobby.split(','):[]});
        // 选中单选 性别 
        form.down('radiogroup').setValue({'sex':record.raw.sex}); 
    },
    updateUser: function(button) {
	  var form = button.up('form');
	
	  if (!form.getForm().isValid()) { return; }
	  if(!form.isDirty()){
		  Ext.Msg.alert('提示', '您没有修改数据不用保存');
		  return;
	  }
	  button.setLoading(true);
	  var userStore = this.getUsersStore();
      var record = form.getRecord();
      var values = form.getValues();
      if(values.hobby){
    	  values.hobby = values.hobby.toString();
      }
      var userModel = Ext.create('ZK.model.User',values);
     
      if(record){// 这个是update 数据
    	  // 如果是从后台来的getbyid 的数据，那么就是store里面的数据。那么就无法提交。 因为没有改变。
    	  var obj = userStore.findRecord("id",record.data.id);
    	  var dd = obj.getData();
    	  // 这个代码是改变store里面的数据，然后检查有变化进行了提交，要是直接从grid里面获取数据，那个数据和store数据是一个引用，
    	  // 所以不必执行这个for循环，这个是为了让top的编辑起作用而是用。
    	  for(var item in dd){
    		  if(values[item]){
    			  obj.set(item,values[item]);
    		  }
    	  }
          //record.set(values); 
          //userStore.sync(ZkExtJS.extjs.responseCallback(button,userStore,2,userModel));
          
          //第二种方式
          values.birth = Ext.util.Format.date(values.birth,'Y/m/d');  
    	  ZkExtJS.extjs.submit("user/update", values, button,userStore,this.currentPage);
      }else if(values){ // 这个是create 数据。
    	  // 第一种方式 提交checkbox 有点问题。每次提交数字 1,2 的时候根据model 又变成了中文，还有payload 的问题。就是提交到后
    	  // 后台的话，那就只能用string 来接收。
    	  // 整个load的数据都在store 里面，根据store 里面的数据的变化，来执行相应的接口 比如 update ，create delete 等。
    	  //userStore.add(values);
    	  //userStore.sync(ZkExtJS.extjs.responseCallback(button,userStore,1,userModel));
    	  // 第二种方式
    	  values.birth = Ext.util.Format.date(values.birth,'Y/m/d');  
    	  ZkExtJS.extjs.submit("user/insert", values, button,userStore);
      }
    },
    queryBtnHandler:function(button){
    	alert(1);
    }, 
    addBtnHandler:function(button){
    	var view = Ext.widget('useredit',{title: '添加用户'});
    }, 
    editBtnHandler:function(button){
    	    var view = Ext.widget('useredit',{title: '修改用户'});
    	    button.setLoading(true);
    	    var form = view.down('form');
    	    //ajax 根据id获取数据。
    	    ZkExtJS.extjs.getDataById(button,'user/selectByKey',button.zkSelectedRow.id,'ZK.model.User',form);
    }
});