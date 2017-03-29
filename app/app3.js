Ext.application({
			requires : ['Ext.container.Viewport'],
			name : 'FWY',
			appFolder : 'app',
			controllers: ['Teachers'], 
			launch : function() {
				console.log("launch triggered!");
				Ext.create('Ext.container.Viewport', {
							layout : 'fit',
							items : [{
										xtype : 'teacherlist'
										
									}]
						});
			}
		});