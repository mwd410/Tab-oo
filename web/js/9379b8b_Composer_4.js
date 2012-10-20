Taboo.Composer = function() {
    Taboo.Component.call(this);
    this.song = new Taboo.Song("Artist","Title");
    this.pointer = new Taboo.Pointer(this);
    this.view = new Kinetic.Stage({
        container: "composerDiv",
        width: 900,
        height: 200
    });
    this.pointer.init();
    this.songLayer = new Kinetic.Layer();
    this.pointerLayer = new Kinetic.Layer();
    this.add(this.song, this.songLayer);
    this.add(this.pointer, this.pointerLayer);
    this.log();
};
Taboo.newComposerInstance = function() {
    Taboo.Composer._instance = new Taboo.Composer();
    return Taboo.Composer._instance;
};


Taboo.Composer.prototype = {
    add : function(component, layer) {
        component.parent = this;
        this.children.push(component);
        layer.add(component.getView());
        component.composer = this;
    },
    draw : function() {
        this.view.draw();
    },
    getCurrentString : function() {
        return this.song.strings[this.pointer.string];
    },
    getSong : function() {
        return this.song;
    },
    keyPress : function(e) {
        var composer = Taboo.Composer._instance;
        console.log(this);
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == KeyEvent.DOM_VK_D) {
            composer.pointer.moveRight();
        } else if (code == KeyEvent.DOM_VK_A) {
            composer.pointer.moveLeft();
        } else if (code == KeyEvent.DOM_VK_E) {
            composer.pointer.nextMeasure();
        } else if (code == KeyEvent.DOM_VK_Q) {
            composer.pointer.previousMeasure();
        } else if (code == KeyEvent.DOM_VK_S) {
            composer.pointer.moveDown();
        } else if (code == KeyEvent.DOM_VK_W) {
            composer.pointer.moveUp();
        } else if (code >= KeyEvent.DOM_VK_NUMPAD0
            && code <= KeyEvent.DOM_VK_NUMPAD9) {
            var num = code - KeyEvent.DOM_VK_NUMPAD0;
            composer.pointer.numPressed(num);
        } else if (code == KeyEvent.DOM_VK_RETURN) {
            if (composer.song) {
                //composer.song.measures[composer.pointer.measure].addNote(new Note());
            }
        } else if (code == KeyEvent.DOM_VK_DECIMAL) {
            if (composer.song) {
                composer.song.removeSelection();
            }
        } else if (code == KeyEvent.DOM_VK_ADD) {
            composer.pointer.increaseSubdivision(e.shiftKey);
        } else if (code == KeyEvent.DOM_VK_SUBTRACT) {
            composer.pointer.decreaseSubdivision(e.shiftKey);
        } else if (code == KeyEvent.DOM_VK_T) {
            composer.pointer.toggleTriplet();
        }
        if (code!=KeyEvent.DOM_VK_SHIFT) {
            console.log("Key pressed: "+code);
            composer.pointer.log();
        }
        composer.printJSON(composer.song);
    },
    newSong : function(artist, title) {
        this.song = new Taboo.Song(artist, title);
    },
    printJSON : function printJSON(song) {
        $("#jsonText").html(JSON.stringify(song, undefined, 4));
    },
    setGrid : function(grid) {
        this.grid = grid;
    }
}
Taboo.Global.extend(Taboo.Composer, Taboo.Component);