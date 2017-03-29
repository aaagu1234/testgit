//Store  
    Ext.define("ZK.store.MyTreeStore", {  
        extend: "Ext.data.TreeStore",  
        model: 'ZK.model.MyTreeModel',  
        proxy: {  
            type: 'ajax',  
            api: {  
                create: 'TreeApiController/createTreeNode',  
                read: 'TreeApiController/queryTreeList',  
                update: 'TreeApiController/updateTreeNode',  
                destroy: 'TreeApiController/destroyTreeNode'  
            },  
            writer: {  
                type: 'json',  
                allowSingle: false,  
                encode: true,  
                root: 'records'  
            }  
        },  
        root: {  
            id: -1,  
            expanded: true,  
            text: "My Root"  
        },  
        autoLoad: true  
    });  