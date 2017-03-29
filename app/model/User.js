Ext.define('ZK.model.User', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string', remark: '用户id' },
        { name: 'name', type: 'string', remark: '姓名' },
        { name: 'sex', type: 'string', remark: '性别',convert:function(v,record){
        	if(v == null){
        		return '男';
        	}
        	if(v == 2){
        		return '女';
        	}else{
        		return '男';
        	}
        } },
        { name: 'age', type: 'int', remark: '年龄' },
        { name: 'birth', type: 'date', remark: '生日' ,convert:function(v, record) { 
        	if (v == null) {
        		return null;
        		} 
        		var date=new Date(v); 
        		return Ext.Date.format(date,'Y-m-d');
        	 } },
    	 { name: 'hometown', type: 'string', remark: '家乡' },
    	 { name: 'hobby', type: 'string', remark: '爱好' ,convert:function(v, record) { 
        	   if (v == null) {
        	    	return '';
        		} 
        	   var item = v.split(',');
        	   var str = '';
        	   Ext.each(item, function(name,index,c){
        		   if(name == 1){
        			   str += '足球,';
        		   }else if(name == 2){
        			   str += '篮球,';
        		   }else if(name == 3){
        			   str += '乒乓,';
        		   }else if(name == 4){
        			   str += '跑步,';
        		   }else if(name == 5){
        			   str += '游泳,';
        		   }else if(name == 6){
        			   str += '棒球,';
        		   }else if(name == 1){
        			   str += '足球,';
        		   }
        	   });
        	   return str;	  
         } }
    ]
});  
  