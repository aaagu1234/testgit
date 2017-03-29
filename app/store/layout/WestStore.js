Ext.define('ZK.store.layout.WestStore', {
			extend : 'Ext.data.TreeStore',
			autoLoad: true, 
			proxy : {
				type : 'ajax',
				url: 'data/tree.json',
				  reader: {
		                type: 'json',
		                root: 'root'
		            }
			},  
			sorters: [{
	            property: 'leaf',
	            direction: 'ASC'
	        },{
	            property: 'text',
	            direction: 'ASC'
	        }],
	        root: {
	            text: 'Ext JS',
	            id: 'src',
	            expanded: true
	        }
}); 

 
 