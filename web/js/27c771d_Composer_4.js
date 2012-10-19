Taboo.Composer = function() {
    Taboo.Composer.superClass.call(this);
    this.stage = new Kinetic.Stage({
        container: "composerDiv",
        width: 900,
        height: 200
    });
    this.pointerLayer = new Kinetic.Layer();
    
    this.stage.add(this.layer);
    this.pointer = new Taboo.Pointer();
    this.stage.add(this.pointer.layer);
}
Taboo.Composer.prototype = {
    add : function(component, layer) {
        if (!layer) {
            layer = this.layer;
        }
        layer.add(component.layer);
        this.children.push(component);
        component.parent = this;
    },
    newSong : function(config) {
        if (this.song) {
        }
        this.song = new Taboo.Song(config);
        this.pointer.addListener({
            title : "song",
            onMeasureChange : function(pointer) {
                console.log("song");
                if (pointer.measure == this.measures.length) {
                    this.addMeasure({
                        measureNumber : this.measures.length + 1
                    });
                }
            }
        }, this.song);
        this.pointer.addListener({
            title : "pointerMovement",
            onStringChange : function(pointer) {
                this.pointer.setY(this.song.measures[pointer.measure].strings.getChildren()[pointer.string].getY());
            },
            onMeasureChange : function(pointer) {
                console.log('measure change');
                this.pointer.setOffset(this.song.measures[pointer.measure].layer.getPosition());
            },
            onMove : function(pointer) {
                this.pointer.setX(this.song.measures[pointer.measure].getPointerX(pointer));
            }
        }, this);
        this.song.addListener({
            title : "composer",
            onStringTotalChange : function(song) {
                this.pointer.stringCount = this.song.strings.length;
            }
        }, this);
        this.song.registerEvent({
            event : "onStringTotalChange",
            params : {
                previousStringCount : 0
            }
        });
        this.pointer.init();
        console.log(this.pointer);
        this.add(this.song);
        this.draw();
    },
    keyPress : function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == KeyEvent.DOM_VK_D) {
            this.pointer.moveRight();
        } else if (code == KeyEvent.DOM_VK_A) {
            this.pointer.moveLeft();
        } else if (code == KeyEvent.DOM_VK_E) {
            this.pointer.nextMeasure();
        } else if (code == KeyEvent.DOM_VK_Q) {
            this.pointer.previousMeasure();
        } else if (code == KeyEvent.DOM_VK_W) {
            this.pointer.previousString();
        } else if (code == KeyEvent.DOM_VK_S) {
            this.pointer.nextString();
        } else if (code >= KeyEvent.DOM_VK_NUMPAD0
            && code <= KeyEvent.DOM_VK_NUMPAD9) {
            this.pointer.numPressed(code - KeyEvent.DOM_VK_NUMPAD0);
        } else if (code == KeyEvent.DOM_VK_ADD) {
            this.pointer.increaseLength();
        } else if (code == KeyEvent.DOM_VK_SUBTRACT) {
            this.pointer.decreaseLength();
        } else if (code == KeyEvent.DOM_VK_DIVIDE) {
            this.pointer.decreaseSubdivision(e.shiftKey);
        } else if (code == KeyEvent.DOM_VK_MULTIPLY) {
            this.pointer.increaseSubdivision(e.shiftKey);
        } else if (code == KeyEvent.DOM_VK_RETURN) {
            this.song.addNote(this.pointer.getState());
        }
            
        if (code!=KeyEvent.DOM_VK_SHIFT) {
            this.pointer.log();
        }
        printJSON(this.song, this.pointer);
    }
}
Taboo.extend(Taboo.Composer, Taboo.Component);