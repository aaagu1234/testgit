Ext.define('App.ShipMgr.model.ShipModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ShipId', type: 'string', remark: '船舶ID' },
        { name: 'ShipName', type: 'string', remark: '船舶名称' },
        { name: 'State', type: 'string', remark: '状态' },
        { name: 'StateName', type: 'string', remark: '状态名称' },
        { name: 'Tonnage', type: 'string', remark: '吨位' },
        { name: 'LoadNumber', type: 'int', remark: '核载人数' },
    ]
});  