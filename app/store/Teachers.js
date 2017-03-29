Ext.define('ZK.store.Teachers', {
			extend : 'Ext.data.Store',
			// fields: ['id','name', 'age','sex'],
			model : 'ZK.model.Teacher',
			/*
			 * data: [ {id:1,name: '张三', age: 30,sex:'男'}, {id:2,name: '李四',
			 * age: 20,sex:'女'} ]
			 */
			autoLoad: true,
			proxy : {
				type : 'ajax',
				api : {
					read : 'data/teachers.json',
					update : 'data/updateTeachers.json'
					
				},
				reader : {
					type : 'json',
					root : 'teachers',
					successProperty : 'success'
				}
			}
		});