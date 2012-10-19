
Ext.onReady(function() {
    
    var win = new Ext.Window({
        id : 'myWin',
        height : 400,
        width : 400,
        items : [
            {
                html : 'i am panel1',
                id : 'panel1',
                frame : true,
                height : 100
            },
            {
                html : '<b>I am Panel2</b>',
                id : 'panel2',
                frame : true
            }
        ]
    });
    win.show();
    win.add({
        title : 'appended panel',
        id : 'addedPanel',
        html : "hello there!!!"
    });
    win.doLayout();
});