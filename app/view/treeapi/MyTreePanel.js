 //# sourceURL=ZK.view.treeapi.MyTreePanel.js 
Ext.define("ZK.view.treeapi.MyTreePanel", {  
        extend: 'Ext.tree.Panel',  
        title: 'Simple Tree',  
        width: 250,  
        height: 400,  
        store: 'MyTreeStore',  
        hideHeaders: true,  
        alias : 'widget.mytreepanel',
        rootVisible: true,  
        viewConfig: {  
            plugins: {  
                ptype: 'treeviewdragdrop'  
            },  
            listeners: {  
                drop: function(node, data, dropRec, dropPosition) {  
                  this.getStore().sync();  
                }  
            }  
        },  
          
        initComponent: function() {  
            var me = this;  
            //可编辑  
            me.plugins = [me.cellEditingPlugin = Ext.create('Ext.grid.plugin.CellEditing')];  
              
            //定义列  
            me.columns = [{  
                xtype: 'treecolumn',  
                dataIndex: 'text',  
                flex: 1,  
                editor: {  
                    xtype: 'textfield',  
                    selectOnFocus: true,  
                    validator: function(value){  
                        value = Ext.String.trim(value);  
                        return value.length < 1 ? this.blankText : true;  
                    }  
                }  
            },{  
                xtype: 'actioncolumn',  
                width: 24,  
                icon: 'Resources/icon/delete.png',  
                iconCls: 'x-hidden',  
                tooltip: 'Delete',  
                handler: Ext.bind(me.handleDeleteClick, me)  
            }];  
              
            //定义底部tbar  
            me.dockedItems = [{  
                xtype: 'toolbar',  
                dock: 'bottom',  
                items: [{ 
                	text:'添加文件',
                    tooltip: 'New List',  
                    handler: me.handleNewListClick,  
                    scope: me  
                },{  
                	text:'添夹目录',
                    tooltip: 'New Folder',  
                    handler: me.handleNewFolderClick,  
                    scope: me  
                },{  
                    text:'删除目录',
                    tooltip: 'Delete Folder'  
                }]  
            }];  
              
            me.contextMenu = Ext.create("SimpleTasks.view.lists.ContextMenu");  
              
            me.callParent();  
              
            me.on("itemmouseenter", me.showActions);  
            me.on("itemmouseleave", me.hideActions);  
            me.on("edit", me.updateNode);  
            me.on("afterrender", me.handleAfterListTreeRender);  
            me.on("beforeedit", me.handleBeforeEdit, me);  
            //me.on("canceledit", me.handleCancelEdit);  
            me.on("itemcontextmenu", me.showContextMenu, me);  
        },  
          
        //刷新树  
        refreshView: function() {  
             //refresh the data in the view.    
             //This will trigger the column renderers to run,   
            this.getView().refresh();  
        },  
          
        //显示actioncolumn  
        showActions: function(view, list, node, rowIndex, e) {  
            var icons = Ext.DomQuery.select('.x-action-col-icon', node);  
            if(view.getRecord(node).get('id') != "-1") {  
                Ext.each(icons, function(icon){  
                    Ext.get(icon).removeCls('x-hidden');  
                });  
            }  
        },  
          
        //隐藏actioncolumn  
        hideActions: function(view, list, node, rowIndex, e) {  
            var icons = Ext.DomQuery.select('.x-action-col-icon', node);  
            Ext.each(icons, function(icon){  
                Ext.get(icon).addCls('x-hidden');  
            });  
        },  
          
        //Handles a click on a delete icon  
        handleDeleteClick: function(gridView, rowIndex, colIndex, column, e, record) {  
            //这个model区别于普通的model  
            //在定义store的时候并没有定义fields或model属性,该model由treeStore自动创建  
            //该model包含树展示所需要的数据结构,具备parentNode,isLeaf,loaded等属性  
            var model = gridView.getRecord(gridView.findTargetByEvent(e));  
            this.deleteNode(model);  
        },  
          
        //删除节点  
        deleteNode: function(nodel) {  
            nodel.parentNode.removeChild(nodel);  
            //与服务器端同步  
            store.sync();  
        },  
          
        //更新节点  
        updateNode: function(editor, e) {  
            var me = this;  
            //与服务器端同步  
            this.getStore().sync();    
        },  
          
        //树加载完毕后设置默认选中第一个  
        handleAfterListTreeRender: function(tree) {  
            tree.getSelectionModel().select(0);  
        },  
          
        //编辑前判断跟节点不允许编辑  
        handleBeforeEdit: function(editingPlugin, e) {  
            return e.record.get('id') !== -1;  
        },  
          
        //取消编辑事件  
        handleCancelEdit: function(editor, e) {  
            var list = e.record,  
                parent = list.parentNode;  
            parent.removeChild(list);  
            this.getListTree().getSelectionModel().select([parent]);  
        },  
          
        //添加叶子节点  
        handleNewListClick: function(component, e) {  
            this.addNode(true);  
        },  
          
        //添加跟节点  
        handleNewFolderClick: function(component, e) {  
            this.addNode();  
        }, 
        
        //GUID  
        newGuid:function() {  
            var guid = "";  
            for (var i = 1; i <= 32; i++){  
              var n = Math.floor(Math.random()*16.0).toString(16);  
              guid +=   n;  
              if((i==8)||(i==12)||(i==16)||(i==20))  
                guid += "-";  
            }  
            return guid;      
        } ,  
          
        //添加节点  
        addNode: function(leaf) {  
            var me = this;  
            var listTree = me;  
            cellEditingPlugin = listTree.cellEditingPlugin,  
            selectionModel = listTree.getSelectionModel(),  
            selectedList = selectionModel.getSelection()[0],  
            parentList = selectedList.isLeaf() ? selectedList.parentNode : selectedList,  
            newList = Ext.create('ZK.model.MyTreeModel', {  
                id: me.newGuid(),  
                text: 'New ' + (leaf ? 'List' : 'Folder'),  
                leaf: leaf,  
                loaded: true // set loaded to true,   
                             //so the tree won't try to dynamically load children   
                             //for this node when expanded  
            }),  
            expandAndEdit = function() {  
                if(parentList.isExpanded()) {  
                    selectionModel.select(newList);  
                    cellEditingPlugin.startEdit(newList, 0);  
                } else {  
                    listTree.on('afteritemexpand', function startEdit(list) {  
                        if(list === parentList) {  
                            selectionModel.select(newList);  
                            cellEditingPlugin.startEdit(newList, 0);  
                            // remove the afterexpand event listener  
                            listTree.un('afteritemexpand', startEdit);  
                        }  
                    });  
                    parentList.expand();  
                }  
            };  
            parentList.appendChild(newList);  
            if(listTree.getView().isVisible(true)) {  
                expandAndEdit();  
            } else {  
                listTree.on('expand', function onExpand() {  
                    expandAndEdit();  
                    listTree.un('expand', onExpand);  
                });  
                listTree.expand();  
            }  
           
        },  
          
        //添加右键菜单  
        showContextMenu: function(view, list, node, rowIndex, e) {  
            this.contextMenu.showAt(e.getX(), e.getY());  
            e.preventDefault();  
        }  
    });  
 //定义菜单  
 Ext.define('SimpleTasks.view.lists.ContextMenu', {  
     extend: 'Ext.menu.Menu',  
     xtype: 'listsContextMenu',  
     items: [  
         {  
             text: 'New List',  
             iconCls: 'tasks-new-list' 
         },  
         {  
             text: 'New Folder',  
             iconCls: 'tasks-new-folder'  
         },  
         {  
             text: 'Delete',  
             iconCls: 'tasks-delete-folder'  
         }  
     ]  
   
 }); 