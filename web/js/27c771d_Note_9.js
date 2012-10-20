Taboo.Note = function(config) {
    Taboo.Note.superClass.call(this);
    var defaultAttrs = {
        absolutePosition : 0,
        subdivision : 4,
        position : 0,
        string : 0,
        length : 1,
        fret : 0,
        tieStart : false,
        tieEnd : false,
        hammerOn : false,
        pullOff : false,
        mute : false
    }
    config = this.applyDefaults(config, defaultAttrs);
}
Taboo.Note.prototype = {
    
}
Taboo.extend(Taboo.Note, Taboo.Component);