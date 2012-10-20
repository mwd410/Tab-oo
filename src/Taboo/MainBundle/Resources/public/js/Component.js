Taboo.Component = function() {
    this.layer = new Kinetic.Layer();
    this.children = [];
    this.stateless = ["stateless", "children"];
    this.listeners = {};
}
Taboo.Component.prototype = {
    
    //--------------------------------------------------------------------------
    //  Children functions
    //--------------------------------------------------------------------------
    add : function(component) {
        this.layer.add(component.layer);
        this.children.push(component);
        component.parent = this;
    },
    getSiblingIndex : function() {
        return this.parent.children.indexOf(this);
    },
    getPreviousSibling : function() {
        var index = this.getSiblingIndex();
        if (index > 0) {
            return this.parent.children[index - 1];
        } else {
            return null;
        }
    },
    move : function(component, newParent) {
        this.remove(component);
        newParent.add(component);
    },
    remove : function(component) {
        component.layer.remove();
        this.children.splice(this.children.indexOf(component), 1);
        component.parent = null;
    },
    
    //--------------------------------------------------------------------------
    //  Debug functions
    //--------------------------------------------------------------------------
    log : function() {
        console.log(this);
    },
    
    //--------------------------------------------------------------------------
    //  Instantiation functions
    //--------------------------------------------------------------------------
    applyDefaults : function(config, defaultAttrs, exceptions) {
        if (config == null) {
            config = {};
        }
        if (!exceptions) {
            exceptions = [];
        }
        for (var key in defaultAttrs) {
            if (!(key in config)) {
                config[key] = defaultAttrs[key];
            }
            if (!exceptions.contains(key)){
                this[key] = config[key];
            }
        }
        return config;
    },
    
    //--------------------------------------------------------------------------
    //  Listener functions
    //--------------------------------------------------------------------------
    addListener : function(config, listener) {
        if (!config.title) {
            throw new Error("You must provide a title for the listener.");
        }
        if (!listener) {
            throw new Error("You must provide a listener object.");
        }
        for (var key in config) {
            if (key != "title") {
                config[key] = config[key].bind(listener);
            }
        }
        this.listeners[config.title] = config;
    },
    getState : function() {
        var state = {};
        for (var key in this) {
            if (this.stateless.contains(key)) {
                continue;
            } else if (this[key] !== null && this[key].toString.call(this[key]).indexOf("[object") != 0 
                && !Taboo.isFunction(this[key])) {
                state[key] = this[key];
            } else if (this[key] instanceof Array) {
                state[key] = [];
                for (var i = 0; i < this[key].length; ++i) {
                    state[key].push(this[key][i].getState());
                }
            }
        }
        return state;
    },
    registerEvent : function(event) {
        var title = event.event;
        if (!title) {
            title = event;
        }
        for (var key in this.listeners) {
            var func = this.listeners[key][title];
            if (func) {
                if (!event.params) {
                    event.params = {};
                }
                func(this.getState(), event.params);
            }
        }
    },
    
    //-----------------------------------------------
    //  View Functions
    //-----------------------------------------------
    draw : function() {
        this.layer.draw();
        for (var i = 0; i < this.children.length; ++i) {
            this.children[i].draw();
        }
    }
}