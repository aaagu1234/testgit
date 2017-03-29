Ext.define('App.ShipMgr.view.AddShipWindow', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    constrain: true, // 是否只能在父容器的范围内拖动
    modal: true, // 是否有遮挡层
    width: 340,
    requires: ['App.ShipMgr.model.ShipModel'],
    initComponent: function () {
        var me = this;
        var _oprType = me.oprType || 'add'; // 类型；eg：add(添加)、edit(修改)
        var _shipId = me.shipId; // 船舶Id
        var _url = me.url; // 各操作的url，如：add、edit的url
        var _successCallback = me.successCallback || ''; // 成功执行的回调

        // 渲染结束后
        me.on('afterrender', function () {
            // 1.非添加操作，查询具体的船舶
            if (_oprType != 'add') {
                me.setLoading(true);
                Ext.Ajax.request({
                    method: 'POST',
                    type: 'ajax',
                    url: 'Business/ShipMgr/QueryById',
                    params: {
                        shipId: _shipId
                    },
                    success: function (response) {
                        var rs = Ext.JSON.decode(response.responseText);
                        if (rs.success == false) { //操作失败
                            Ext.Msg.alert('系统提示', rs.msg);
                        }
                        else {
                            var en = Ext.create('App.ShipMgr.model.ShipModel', rs.data);
                             // 填充数据
                             shipForm.loadRecord(en);
                        }
                        me.setLoading(false);
                    },
                    failure: function (response, opts) {
                        me.setLoading(false);
                        Ext.Msg.alert('系统提示', '操作失败');
                    }
                });
            }
        });

        // 【form】
        var shipForm = Ext.create('Ext.form.Panel', {
            defaultType: 'hiddenfield',
            width: '100%',
            bodyPadding: 5,
            autoScroll: true,
            url: _url,
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 75,
                width: 275
            },
            items: [
                Ext.create('Ext.form.field.Text', {
                    fieldLabel: '船舶名称',
                    name: 'ShipName',
                    maxLength: 50,
                    allowBlank: false,
                    afterLabelTextTpl: '<span style="position: absolute;margin-left: 210px;color: red;line-height: 2;" >*<span>'
                }),
                Ext.create('Ext.form.field.ComboBox', {
                    fieldLabel: '状态',
                    name: 'State',
                    emptyText: '请选择船舶状态',
                    editable: false,
                    allowBlank: false,
                    valueField: 'State',
                    displayField: 'StateName',
                    queryMode: 'remote',
                    triggerAction: 'all',
                    afterLabelTextTpl: '<span style="position: absolute;margin-left: 210px;color: red;line-height: 2;" >*<span>',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['State', 'StateName'],
                        data : [
                            { 'State': 'online', 'StateName': '在线' },
                            { 'State': 'offline', 'StateName': '离线' },
                        ]
                    })
                }),
                Ext.create('Ext.form.field.Number', {
                    fieldLabel: '吨位',
                    name: 'Tonnage',
                    allowBlank: false,
                    maxValue: 10000,
                    minValue:1,
                    decimalPrecision: 1,
                    afterLabelTextTpl: '<span style="position: absolute;margin-left: 210px;color: red;line-height: 2;" >*<span>'
                }),
                Ext.create('Ext.form.field.Number', {
                    fieldLabel: '核载人数',
                    name: 'LoadNumber',
                    allowBlank: false,
                    maxValue: 10000,
                    minValue: 1,
                    decimalPrecision: 1,
                    afterLabelTextTpl: '<span style="position: absolute;margin-left: 210px;color: red;line-height: 2;" >*<span>'
                }),
                { name: 'ShipId', value: _shipId },
            ],
            buttons: [
            {
                text: '提交',
                name: 'SubmitBtn',
                handler: function () {
                    if (!shipForm.getForm().isValid()) { return; }
                    me.setLoading(true);
                    shipForm.getForm().submit(
                        {
                            clientValidation: true,
                            submitEmptyText: false,
                            success: function (thisControl, action) {
                                var rs = Ext.JSON.decode(action.response.responseText);
                                me.setLoading(false);
                                me.close();
                                if (_successCallback) { // 回调
                                    _successCallback();
                                }
                            },
                            failure: function (thisControl, action) {
                                var rs = Ext.JSON.decode(action.response.responseText);
                                if (rs.msg) {
                                    Ext.Msg.alert('系统提示', rs.msg);
                                } else {
                                    Ext.Msg.alert('系统提示', '操作失败！');
                                }
                                me.setLoading(false);
                            }
                        }
                    );
                }
            }, {
                text: '取消',
                name: 'CancelBtn',
                handler: function () {
                    me.close();
                }
            }]
        });

        // 填充窗口
        Ext.applyIf(me, {
            items: [shipForm]
        });

        me.callParent(arguments);
    }
});
 //# sourceURL=App/ShipMgr/view/AddShipWindow.js