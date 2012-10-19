Taboo.Composer = function() {
    Taboo.Component.call(this);
    this.stage = new Kinetic.Stage({
        container: "composerDiv",
        width: 900,
        height: 200
    });
    this.pointerLayer = new Kinetic.Layer();
    this.stage.add(this.layer);
    this.stage.add(this.pointerLayer);
    this.strings = [];
}
Taboo.Composer.prototype = {
    add : function(component, layer) {
        layer.add(component.layer);
        this.children.push(component);
        component.parent = this;
    }
}
Taboo.extend(Taboo.Composer, Taboo.Component);