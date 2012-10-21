if (typeof KeyEvent == "undefined") {
    var KeyEvent = {
        DOM_VK_CANCEL: 3,
        DOM_VK_HELP: 6,
        DOM_VK_BACK_SPACE: 8,
        DOM_VK_TAB: 9,
        DOM_VK_CLEAR: 12,
        DOM_VK_RETURN: 13,
        DOM_VK_ENTER: 14,
        DOM_VK_SHIFT: 16,
        DOM_VK_CONTROL: 17,
        DOM_VK_ALT: 18,
        DOM_VK_PAUSE: 19,
        DOM_VK_CAPS_LOCK: 20,
        DOM_VK_ESCAPE: 27,
        DOM_VK_SPACE: 32,
        DOM_VK_PAGE_UP: 33,
        DOM_VK_PAGE_DOWN: 34,
        DOM_VK_END: 35,
        DOM_VK_HOME: 36,
        DOM_VK_LEFT: 37,
        DOM_VK_UP: 38,
        DOM_VK_RIGHT: 39,
        DOM_VK_DOWN: 40,
        DOM_VK_PRINTSCREEN: 44,
        DOM_VK_INSERT: 45,
        DOM_VK_DELETE: 46,
        DOM_VK_0: 48,
        DOM_VK_1: 49,
        DOM_VK_2: 50,
        DOM_VK_3: 51,
        DOM_VK_4: 52,
        DOM_VK_5: 53,
        DOM_VK_6: 54,
        DOM_VK_7: 55,
        DOM_VK_8: 56,
        DOM_VK_9: 57,
        DOM_VK_SEMICOLON: 59,
        DOM_VK_EQUALS: 61,
        DOM_VK_A: 65,
        DOM_VK_B: 66,
        DOM_VK_C: 67,
        DOM_VK_D: 68,
        DOM_VK_E: 69,
        DOM_VK_F: 70,
        DOM_VK_G: 71,
        DOM_VK_H: 72,
        DOM_VK_I: 73,
        DOM_VK_J: 74,
        DOM_VK_K: 75,
        DOM_VK_L: 76,
        DOM_VK_M: 77,
        DOM_VK_N: 78,
        DOM_VK_O: 79,
        DOM_VK_P: 80,
        DOM_VK_Q: 81,
        DOM_VK_R: 82,
        DOM_VK_S: 83,
        DOM_VK_T: 84,
        DOM_VK_U: 85,
        DOM_VK_V: 86,
        DOM_VK_W: 87,
        DOM_VK_X: 88,
        DOM_VK_Y: 89,
        DOM_VK_Z: 90,
        DOM_VK_CONTEXT_MENU: 93,
        DOM_VK_NUMPAD0: 96,
        DOM_VK_NUMPAD1: 97,
        DOM_VK_NUMPAD2: 98,
        DOM_VK_NUMPAD3: 99,
        DOM_VK_NUMPAD4: 100,
        DOM_VK_NUMPAD5: 101,
        DOM_VK_NUMPAD6: 102,
        DOM_VK_NUMPAD7: 103,
        DOM_VK_NUMPAD8: 104,
        DOM_VK_NUMPAD9: 105,
        DOM_VK_MULTIPLY: 106,
        DOM_VK_ADD: 107,
        DOM_VK_SEPARATOR: 108,
        DOM_VK_SUBTRACT: 109,
        DOM_VK_DECIMAL: 110,
        DOM_VK_DIVIDE: 111,
        DOM_VK_F1: 112,
        DOM_VK_F2: 113,
        DOM_VK_F3: 114,
        DOM_VK_F4: 115,
        DOM_VK_F5: 116,
        DOM_VK_F6: 117,
        DOM_VK_F7: 118,
        DOM_VK_F8: 119,
        DOM_VK_F9: 120,
        DOM_VK_F10: 121,
        DOM_VK_F11: 122,
        DOM_VK_F12: 123,
        DOM_VK_F13: 124,
        DOM_VK_F14: 125,
        DOM_VK_F15: 126,
        DOM_VK_F16: 127,
        DOM_VK_F17: 128,
        DOM_VK_F18: 129,
        DOM_VK_F19: 130,
        DOM_VK_F20: 131,
        DOM_VK_F21: 132,
        DOM_VK_F22: 133,
        DOM_VK_F23: 134,
        DOM_VK_F24: 135,
        DOM_VK_NUM_LOCK: 144,
        DOM_VK_SCROLL_LOCK: 145,
        DOM_VK_COMMA: 188,
        DOM_VK_PERIOD: 190,
        DOM_VK_SLASH: 191,
        DOM_VK_BACK_QUOTE: 192,
        DOM_VK_OPEN_BRACKET: 219,
        DOM_VK_BACK_SLASH: 220,
        DOM_VK_CLOSE_BRACKET: 221,
        DOM_VK_QUOTE: 222,
        DOM_VK_META: 224
    };
}

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
Taboo.Song = function(config) {
    Taboo.Song.superClass.call(this);
    var defaultAttrs = {
        artist : "Artist",
        title : "Title",
        tabType : "Guitar",
        capoFret : 0,
        strings : [
        {
            note : "E",
            octave : 4
        },
        {
            note : "B",
            octave : 4
        },
        {
            note : "G",
            octave : 3
        },
        {
            note : "D",
            octave : 3
        },
        {
            note : "A",
            octave : 3
        },
        {
            note : "E",
            octave : 2
        }
        ],
        measures : [
        {
            measureNumber : 1,
            tempoSubdivision : 4,
            subdivisionPerMinute : 120,
            timeSubdivision : 4,
            subdivisionPerMeasure : 4,
            notes : []
        }
        ]
    };
    config = this.applyDefaults(config, defaultAttrs, ["measures", "strings"]);
    this.addListener({
        title : "song",
        onStringTotalChange : function(song) {
            var letters = [];
            for (var j = 0; j < this.strings.length; ++j) {
                letters[j] = this.strings[j].note;
            }
            for (var i = 0; i < this.measures.length; ++i) {
                var measure = this.measures[i];
                var oldCount = measure.stringCount;
                measure.stringCount = song.strings.length;
                if (oldCount != measure.stringCount) {
                    measure.letters = letters;
                    measure.draw();
                }
            }
        }
    }, this);
    this.strings = [];
    for (var i = 0; i < config.strings.length; ++i) {
        this.addString(config.strings[i]);
    }
    this.measures = [];
    for (var j = 0; j < config.measures.length; ++j) {
        this.addMeasure(config.measures[j]);
    }
}
Taboo.Song.prototype = {
    addString : function(config) {
        var string = new Taboo.String(config);
        this.strings.push(string);
    },
    addMeasure : function(config) {
        var measure = new Taboo.Measure(config);
        this.add(measure);
        this.measures.push(measure);
        var prevCount = this.strings.length;
        this.registerEvent({
            event : "onStringTotalChange",
            params : {
                previousStringCount : prevCount
            }
        })
    },
    addNote : function(pointer) {
        this.measures[pointer.measure].addNote(pointer);
    }
}
Taboo.extend(Taboo.Song, Taboo.Component);


Taboo.String = function(config) {
    Taboo.String.superClass.call(this);
    var defaultAttrs = {
        note : "E",
        octave : 2,
        type : "Steel"
    }
    config = this.applyDefaults(config,defaultAttrs);
    this.hz = this.calculateHz();
}
Taboo.String.prototype = {
    calculateHz : function() {
        //Get the number of half steps up from A
        var letter = this.note.substring(0,1).toUpperCase();
        var n = 0;
        if (letter == "B") {
            n = 2;
        } else if (letter == "C") {
            n = 3;
        } else if (letter == "D") {
            n = 5;
        } else if (letter == "E") {
            n = 7;
        } else if (letter == "F") {
            n += 8;
        } else if (letter == "G") {
            n += 10;
        }
        if (this.note.length == 2) {
            var accidental = this.note.substr(1,2);
            if (accidental == "b") {
                n -= 1;
            } else if (accidental == "#") {
                n += 1;
            }
        }
        //calculate the frequency
        //first, adjust for the octave.
        var hz = 27.5 * Math.pow(2, this.octave - 1);
        //then, adjust for the half steps.
        hz *= Math.pow(2, n/12);
        return hz.toPrecision(5);
    }
}
Taboo.extend(Taboo.String, Taboo.Component);
Taboo.Measure = function(config) {
    Taboo.Measure.superClass.call(this);
    var defaultAttrs = {
        measureNumber : null,
        tempoSubdivision : null,
        subdivisionPerMinute : null,
        timeSubdivision : null,
        subdivisionPerMeasure : null
    };
    config = this.applyDefaults(config, defaultAttrs);
    this.notes = [];
    if (config.notes) {
        for (var i = 0; i < config.notes.length; ++i) {
            this.addNote(config.notes[i]);
        }
    }
    this.strings = new Kinetic.Group();
    this.layer.setPosition(Taboo.grid * 4 + 0.5, Taboo.grid * 4 + 0.5);
    this.layer.add(this.strings);
    this.stateless.push(
        "strings"
        );
}
Taboo.Measure.prototype = {
    //-----------------------------------------------
    //  Layer functions
    //-----------------------------------------------
    draw : function() {
        while (this.stringCount > this.strings.getChildren().length) {
            var stringGroup = new Kinetic.Group();
            stringGroup.add(new Kinetic.Text({
                y : -Taboo.grid / 2 + 1,
                x : -Taboo.grid * 2,
                fontSize : Taboo.grid - 2,
                fontFamily : "Arial",
                textFill : "black",
                visible : false
            }));
            stringGroup.add(new Kinetic.Line({
                stroke : "black",
                strokeWidth : 1
            }));
            this.strings.add(stringGroup);
        }
        for (var i = 0; i < this.strings.getChildren().length; ++i) {
            if (this.shouldDrawLetters || this.measureNumber == 1) {
                this.getKineticLetter(i).setText(this.letters[i]);
                this.getKineticLetter(i).setVisible(true);
            }
            this.getKineticLine(i).setPoints([0,0,100,0]);
            this.strings.getChildren()[i].setY(Taboo.grid * i);
        }
        this.layer.draw();
    },
    getKineticLetter : function(index) {
        return this.strings.getChildren()[index].getChildren()[0];
    },
    getKineticLine : function(index) {
        return this.strings.getChildren()[index].getChildren()[1];
    },
    getPointerX : function(pointer) {
        return Taboo.grid;
    },
    
    //-----------------------------------------------
    //  Note functions
    //-----------------------------------------------
    addNote : function(config) {
        var note = new Taboo.Note(config);
        var added = false;
        for (var i = 0; i < this.notes.length; i++) {
            if (this.notes[i].absolutePosition == config.absolutePosition
                && this.notes[i].string == config.string) {
                added = true;
                this.notes.splice(i, 1, note);
                break;
            } else if (this.notes[i].absolutePosition > config.absolutePosition) {
                added = true;
                this.notes.splice(i, 0, note);
                break;
            }
        }
        if (!added) {
            this.notes.push(note);
        }
        this.add(note);
    },
    findNote : function(config) {
        var result = {
            note : null
        };
        for (var i = 0; i < this.notes.length; ++i) {
            if (this.notes[i].absolutePosition == config.absolutePosition
                && this.notes[i].string == config.string) {
                result.note = this.notes[i];
                result.index = i;
                break;
            }
        }
        return result;
    }
}
Taboo.extend(Taboo.Measure, Taboo.Component);
Taboo.Pointer = function(config) {
    Taboo.Pointer.superClass.call(this);
    var defaultAttrs = {
        absolutePosition : 0,
        subdivision : 4,
        stringCount : 0,
        position : 0,
        measure : 0,
        length : 1,
        string : 0,
        fret : 0
    }
    config = this.applyDefaults(config, defaultAttrs);
    this.addListener({
        title : "pointer",
        onMove : function() {
            this.calculateAbs();
        },
        onSubdivisionChange : function() {
            this.draw();
        }
    },this);
    this.number = new Kinetic.Text({
        y : -Taboo.grid / 2 + 1,
        text : this.fret,
        fontSize : Taboo.grid - 2,
        fontFamily : "Arial",
        textFill : "red"
    });
    this.halo = new Kinetic.Rect({
        x : -1,
        y : -Taboo.grid / 2,
        width : this.number.getWidth() + 2,
        height : Taboo.grid,
        fill : 'white'
    });
    this.decoration = new Kinetic.Group();
    this.pieces = [];
    this.circle = new Kinetic.Circle({
        radius : Taboo.grid * .75,
        stroke : 'red',
        strokeWidth : 1
    });
    this.layer.add(this.circle);
    var stem = new Kinetic.Line({
        x : 0,
        points : [0, 0, 0, 2.5 * Taboo.grid],
        stroke : "red",
        strokeWidth: 1
    });
    this.pieces.push(stem);
    for (var i = 0; i < 3; ++i) {
        var tail = new Kinetic.Path({
            data : "M426 1434q4 -41 13.5 -75t19.5 -63q14 -51 45 -94l35 -43l49 -59l90 -105q102 -133 102 -278q0 -35 -6 -77t-24 -87q-15 -35 -24 -58.5t-26 -52.5l-30 -2l35 90l12 37.5t10 40.5l6 56l2 24v41l-8 33l-16 49q-21 63 -70 115q-45 57 -98 84q-29 16 -60.5 26.5t-56.5 10.5",// v-814q0"// -63"// -45"// -120q-27"// -45 -102 -80q-64 -33 -134 -33q-63 0 -102 33q-43 30 -43 92q0 31"// 9 60.5t32 56.5q20 24 46 46.5t60 39.5q68 30 123"// 30q88 0 121 -32v733v375h35z"
            fill: "red",
            scale: [0.022,0.022],
            y : -i * Taboo.grid / 2,
            x :  -Taboo.grid * 3/4//this.stem.getX()-Taboo.Global.grid*1/12//
        });
        this.pieces.push(tail);
    }
    this.layer.setPosition(20,20);
    this.layer.add(this.halo);
    this.layer.add(this.number);
    this.layer.add(this.decoration);
    for (i = 0; i < this.pieces.length; ++i) {
        this.decoration.add(this.pieces[i]);
    }
    this.stateless.push(
        "pieces"
        );
    this.draw();
}
Taboo.Pointer.prototype = {
    //-----------------------------------------------
    //  Layer functions
    //-----------------------------------------------
    draw : function() {
        this.number.setText(this.fret);
        this.halo.setWidth(this.number.getWidth()+2);
        var piecesIndex;
        if (this.subdivision > 31) {
            piecesIndex = 4;
        } else if (this.subdivision > 15) {
            piecesIndex = 3;
        } else if (this.subdivision > 7) {
            piecesIndex = 2;
        } else if (this.subdivision > 1) {
            piecesIndex = 1;
        } else {
            piecesIndex = 0;
        }
        for (var i = 0; i < this.pieces.length; ++i) {
            if (i < piecesIndex) {
                this.pieces[i].setVisible (true);
            } else {
                this.pieces[i].setVisible(false);
            }
        }
        if (this.subdivision < 4) {
            this.circle.setVisible(true);
            this.circle.setX(this.number.getWidth() / 2);
        } else {
            this.circle.setVisible(false);
        }
        if (this.string < this.stringCount/2) {
            this.decoration.setScale([1,1]);
            this.decoration.setX(0);
        } else {
            this.decoration.setScale([1,-1]);
            this.decoration.setX(this.number.getWidth()+Taboo.grid/6);
        }
        this.layer.draw();
    },
    init : function() {
        console.log('init');
        this.registerEvent("onMeasureChange");
        this.registerEvent("onMove");
        this.registerEvent("onStringChange");
    },
    setX : function(x) {
        this.layer.setX(this.origin.x + x);
        this.draw();
    },
    setY : function(y) {
        this.layer.setY(this.origin.y + y);
        this.draw();
    },
    setOffset : function(offset) {
        console.log(offset);
        this.origin = offset;
    },
    
    //-----------------------------------------------
    //  Movement functions
    //-----------------------------------------------
    moveRight : function() {
        var prevPosition = this.position;
        if (this.position < this.subdivision - 1) {
            this.position++;
        } else {
            this.measure++;
            this.position = 0;
            this.registerEvent({
                event : "onMeasureChange",
                params : {
                    previousMeasure : this.measure - 1
                }
            });
        }
        this.registerEvent({
            event : "onMove",
            params : {
                previousPosition : prevPosition
            }
        });
    },
    moveLeft : function() {
        var prevPosition = this.position;
        if (this.position > 0) {
            this.position--;
        } else if (this.measure > 0) {
            this.position = this.subdivision - 1;
            this.measure--;
            this.registerEvent({
                event : "onMeasureChange",
                params : {
                    previousMeasure : this.measure + 1
                }
            });
        }
        this.registerEvent({
            event : "onMove",
            params : {
                previousPosition : prevPosition
            }
        });
    },
    nextMeasure : function() {
        this.measure++;
        this.registerEvent({
            event : "onMeasureChange",
            params : {
                previousMeasure : this.measure + 1
            }
        });
    },
    previousMeasure : function() {
        if (this.measure > 0) {
            this.measure--;
            this.registerEvent({
                event : "onMeasureChange",
                params : {
                    previousMeasure : this.measure + 1
                }
            });
        }
    },
    nextString : function() {
        var prevString = this.string;
        if (this.string < this.stringCount - 1) {
            this.string ++;
        } else {
            this.string = 0;
        }
        this.registerEvent({
            event : "onStringChange",
            params : {
                previousString : prevString
            }
        });
    },
    previousString : function() {
        var prevString = this.string;
        if (this.string > 0) {
            this.string --;
        } else {
            this.string = this.stringCount - 1;
        }
        this.registerEvent({
            event : "onStringChange",
            params : {
                previousString : prevString
            }
        });
    },
    numPressed : function(num) {
        var prevFret = this.fret;
        if (this.fret == 0 || this.fret >= 3) { //no fret board is more than 30.
            this.fret = num;
        } else {
            this.fret *= 10;
            this.fret += num;
        }
        this.draw();
        this.registerEvent({
            event : "onFretChange",
            params : {
                numPressed : num,
                previousFret : prevFret
            }
        });
    },
    increaseLength : function() {
        this.length ++;
        this.registerEvent({
            event : "onLengthChange",
            previousLength : this.length - 1
        });
    },
    decreaseLength : function() {
        if (this.length > 1) {
            this.length --;
            this.registerEvent({
                event : "onLengthChange",
                previousLength : this.length + 1
            });
        }
    },
    setLength : function(length) {
        if (length >= 1) {
            var prevLength = this.length;
            this.length = length;
            this.registerEvent({
                event : "onLengthChange",
                previousLength : prevLength
            });
        }
    },
    calculateAbs : function() {
        this.absolutePosition = this.position / this.subdivision * 4;
    },
    fixPosition : function(func) {
        var oldAbs = this.absolutePosition;
        func();
        this.position = Math.floor(this.subdivision * oldAbs / 4);
    },
    decreaseSubdivision : function(precise) {
        var prevSub = this.subdivision;
        var prevPos = this.position;
        this.fixPosition(function(precise) {
            if (!precise) {
                if (isPowerOfTwo(this.subdivision) && this.subdivision > 1) {
                    this.subdivision /= 2;
                } 
                while (!isPowerOfTwo(this.subdivision)) {
                    this.subdivision --;
                }
            } else {
                if (this.subdivision > 1) {
                    this.subdivision --;
                }
            }
            if (this.subdivision < 1) {
                this.subdivision = 1;
            }
        }.bind(this, precise));
        this.registerEvent({
            event : "onSubdivisionChange",
            params : {
                previousSubdivision : prevSub,
                previousPosition : prevPos
            }
        });
    },
    increaseSubdivision : function(precise) {
        var prevSub = this.subdivision;
        var prevPos = this.position;
        this.fixPosition(function(precise) {
            if (!precise) {
                if (isPowerOfTwo(this.subdivision)) {
                    this.subdivision *= 2;
                }
                while (!isPowerOfTwo(this.subdivision)) {
                    this.subdivision++;
                }
            } else {
                this.subdivision ++;
            }
            if (this.subdivision > Taboo.MAX_SUBDIVISION) {
                this.subdivision = Taboo.MAX_SUBDIVISION;
            }
        }.bind(this, precise));

        this.registerEvent({
            event : "onSubdivisionChange",
            params : {
                previousSubdivision : prevSub,
                previousPosition : prevPos
            }
        });
    },
    //-----------------------------------------------
    //  Override
    //-----------------------------------------------
    log : function() {
        var string = "";
        var state = this.getState();
        for (var key in state) {
            string += key + ":" + state[key] + " "
        }
        console.log(string);
    }
}
Taboo.extend(Taboo.Pointer, Taboo.Component);
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


$(document).ready(function() {
    var composer = new Taboo.Composer();
    composer.newSong({
        artist : "Matt Deady"
    });
    $("body").keydown(composer.keyPress.bind(composer));
    //extWindow.show();
    printJSON(composer.song, composer.pointer);
});

function log() {
    console.log("m:"+p.measure + ", p:" + p.position + ", s:"+p.string + ", f:" + p.fret + ", sub:"+p.subdivision);
}

function stringify(object) {
    return JSON.stringify(object, function(key,value){
        if (key == "layer"
            || key == "children"
            || key == "listeners") {
            return undefined;
        } else {
            return value;
        }
    }, 4);
}

function printJSON(song, pointer) {
    $("#jsonText").html(stringify(song.getState()));
}




function isPowerOfTwo(x)
{
    return (x != 0) && ((x & (x - 1)) == 0);
}


/**
 * Linear regression function found at 
 * http://dracoblue.net/dev/linear-least-squares-in-javascript/159/
 */
function findLineByLeastSquares(values_x, values_y) {
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var count = 0;
    
    /*
     * We'll use those variables for faster read/write access.
     */
    var x = 0;
    var y = 0;
    var values_length = values_x.length;
    if (values_length != values_y.length) {
        throw new Error('The parameters values_x and values_y need to have same size!');
    }
    
    /*
     * Nothing to do.
     */
    if (values_length === 0) {
        return [ [], [] ];
    }
    
    /*
     * Calculate the sum for each of the parts necessary.
     */
    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = values_y[v];
        sum_x += x;
        sum_y += y;
        sum_xx += x*x;
        sum_xy += x*y;
        count++;
    }
    
    /*
     * Calculate m and b for the formular:
     * y = x * m + b
     */
    var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
    var b = (sum_y/count) - (m*sum_x)/count;
    
    /*
     * We will make the x and y result line now
     */
    var result_values_x = [];
    var result_values_y = [];
    
    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = x * m + b;
        result_values_x.push(x);
        result_values_y.push(y);
    }
    
    return [result_values_x, result_values_y];
}