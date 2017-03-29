//# sourceURL=ZK.controller.Students.js  
Ext.define('ZK.controller.Students', {
    extend: 'Ext.app.Controller',
    views: [
        'student.List',
        'student.Edit'
    ], 
    stores: ['Students'],// 去远程加载 app/store/Students.js
    models: ['Student'],
    init: function() {
     
    	this.control({
            /*'viewport > panel': {
                render: this.onPanelRendered
            }*/
    		'studentlist': {
                itemdblclick: this.editStudent
            },
            'studentedit button[action=save]': {
                click: this.updateStudent
            }

        });
    },
    onPanelRendered:function(){
       console.log("panel rendered!");
    },
    editStudent:function(grid,record){
    	var view = Ext.widget('studentedit');
        view.down('form').loadRecord(record);
        
    	//console.log("editStudent dbclicked!");
    	//console.log(aa);
    	//console.log(record);
    	//console.log('Double clicked on ' + record.get('age'));
    },
    updateStudent: function(button) {
        //console.log('clicked the Save button');
    	var win    = button.up('window'),
        form   = win.down('form'),
        record = form.getRecord(),
        values = form.getValues();
        record.set(values);
        win.close();
        this.getStudentsStore().sync();
    }
    
});