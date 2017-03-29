Ext.define('ZK.controller.Teachers', {
    extend: 'Ext.app.Controller',
    views: [
        'teacher.List',
        'teacher.Edit'
    ],
    stores: ['Teachers'],
    models: ['Teacher'],
    init: function() {
    	this.control({
            /*'viewport > panel': {
                render: this.onPanelRendered
            }*/
    		'teacherlist': {
                itemdblclick: this. editStudent
            },
            'teacheredit button[action=save]': {
                click: this.updateStudent
            }

        });
    },
    onPanelRendered:function(){
       console.log("panel rendered!");
    },
    editStudent:function(grid,record){
    	var view = Ext.widget('teacheredit');
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