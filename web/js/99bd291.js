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

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
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