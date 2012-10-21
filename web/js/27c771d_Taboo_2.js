var Taboo = {}
Taboo.grid = 12;
Taboo.extend = function(child, parent) {
    child.superClass = parent;
    for (var key in parent.prototype) {
        if (!(key in child.prototype)) {        //allow overriding.
            child.prototype[key] = parent.prototype[key];
        }
    }
}
Taboo.isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
}
Taboo.MAX_SUBDIVISION = 32;
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}