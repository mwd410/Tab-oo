Taboo = {};
Taboo.Global = {
    extend : function(child, base) {
        for (var key in base.prototype) {
            if (!(key in child.prototype)) {
                child.prototype[key] = base.prototype[key];
            }
        }
    },
    grid : 12
};

Taboo.Component = function() {
    this.children = [];
}
Taboo.Component.prototype = {
    getView : function() {
        return this.view;
    },
    add : function(component) {
        component.parent = this;
        this.children.push(component);
        this.view.add(component.getView());
    },
    init : function() {
        
    },
    remove : function(component) {
        this.children.splice(this.children.indexOf(component, 0), 1);
    },
    log : function() {
        console.log(this);
    }
}

Taboo.Leaf = function() {
    Taboo.Component.call(this);
    this.view = new Kinetic.Group();
}
Taboo.Global.extend(Taboo.Leaf, Taboo.Component);

Taboo.Composite = function() {
    Taboo.Component.call(this);
    this.view = new Kinetic.Layer();
}
Taboo.Global.extend(Taboo.Composite, Taboo.Component);