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
Taboo.Pointer = function(composer) {
    Taboo.Leaf.call(this);
    this.composer = composer;
    this.subdivision = 4;
    this.position = 0;
    this.measure = 0;
    this.string = 0;
    this.fret = 0;
    this.view = new Kinetic.Group({});
    this.tails = [];
    
    this.number = new Kinetic.Text({
        y: -Taboo.Global.grid/2 + 1,
        text : this.fret,
        fontSize: Taboo.Global.grid-2,
        fontFamily: "Arial",
        textFill: "red"
    });
    this.halo = new Kinetic.Rect({
        x : -1,
        y : -Taboo.Global.grid / 2,
        width: this.number.getWidth()+2,
        height: Taboo.Global.grid,
        fill: 'white'
    }); 
    
    this.noteStem = new Kinetic.Group({});

    this.stem = new Kinetic.Line({
        x : 0,
        points : [0, 0, 0, 2.5 * Taboo.Global.grid],
        stroke : "red",
        strokeWidth: 1
    });

    for (var i = 0; i < 3; ++i) {
        var tail = new Kinetic.Path({
            data : "M426 1434q4 -41 13.5 -75t19.5 -63q14 -51 45 -94l35 -43l49 -59l90 -105q102 -133 102 -278q0 -35 -6 -77t-24 -87q-15 -35 -24 -58.5t-26 -52.5l-30 -2l35 90l12 37.5t10 40.5l6 56l2 24v41l-8 33l-16 49q-21 63 -70 115q-45 57 -98 84q-29 16 -60.5 26.5t-56.5 10.5",// v-814q0"// -63"// -45"// -120q-27"// -45 -102 -80q-64 -33 -134 -33q-63 0 -102 33q-43 30 -43 92q0 31"// 9 60.5t32 56.5q20 24 46 46.5t60 39.5q68 30 123"// 30q88 0 121 -32v733v375h35z"
            fill: "red",
            scale: [0.022,0.022],
            y : -i * Taboo.Global.grid / 2,
            x :  -Taboo.Global.grid * 3/4//this.stem.getX()-Taboo.Global.grid*1/12//
        });
        this.tails.push(tail);
        this.noteStem.add(tail);
    }
    
    
    
}
Taboo.Pointer.prototype = {
    init : function() {
        this.view.add(this.halo);
        this.view.add(this.number);
        this.noteStem.add(this.stem);
        this.view.add(this.noteStem);
        this.setViewLocation();
    },
    setViewLocation : function() {
        this.view.setX(this.composer.getCurrentString().getView().getX() + Taboo.Global.grid*2);
        this.view.setY(this.composer.getCurrentString().getView().getY());
        this.halo.setWidth(this.number.getWidth()+2);
        if (this.string < this.composer.getSong().strings.length / 2) {
            this.noteStem.setX(0);
            this.noteStem.setScale([1,1]);
            this.noteStem.setY(Taboo.Global.grid/2);
        } else {
            this.noteStem.setX(this.number.getWidth()+1);
            this.noteStem.setScale([1,-1]);
            this.noteStem.setY(-Taboo.Global.grid/2);
        }
        this.composer.draw();
    },
    
    
    moveRight : function() {
        if (this.position < this.subdivision-1) {
            this.position++;
            
        } else {
            song.addMeasure();
            this.measure ++;
            this.position = 0;
        }
    },
    
    moveLeft : function() {
        if (this.position > 0) {
            this.position--;
        } else if (this.measure > 0) {
            this.position = this.subdivision - 1;
            this.measure--;
        }
    },
    
    moveDown : function() {
        if (this.string < song.strings.length - 1) {
            this.string ++;
        } else {
            this.string = 0;
        }
        this.setViewLocation();
    },
    
    moveUp : function() {
        if (this.string > 0) {
            this.string --;
        } else {
            this.string = song.strings.length - 1;
        }
        this.setViewLocation();
    },
    
    nextMeasure : function() {
        this.measure ++;
        while (this.measure >= song.measures.length) {
            song.addMeasure();
        }
    },
    
    previousMeasure : function() {
        if (this.measure > 0) {
            this.measure --;
        }
    },
    
    calculateAbs : function() {
        return this.position / this.subdivision * 4;
    },
    
    fixPosition : function(oldAbs) {
        return Math.floor(this.subdivision*oldAbs/4);
    },
    
    
    decreaseSubdivision : function(precise) {
        var oldAbs = this.calculateAbs();
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
        this.position = this.fixPosition(oldAbs);
    },
    
    increaseSubdivision : function(precise) {
        var oldAbs = this.calculateAbs();
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
        this.position = this.fixPosition(oldAbs);
    },
    
    toggleTriplet : function() {
        var oldAbs = this.calculateAbs();
        if (this.subdivision % 3 == 0) {
            this.subdivision *= 2/3;
        } else if (isPowerOfTwo(this.subdivision) && this.subdivision > 1) {
            this.subdivision *= 3/2;
        }
        this.position = this.fixPosition(oldAbs);
    },
    
    numPressed : function(num) {
        if (this.fret == 0 || this.fret >= 3) { //no fret board is more than 30.
            this.fret = num;
        } else {
            this.fret *= 10;
            this.fret += num;
        }
        this.number.setText(this.fret);
        this.setViewLocation();
    },
    
    setFret : function(num) {
        this.fret = num;
    }
}
Taboo.Global.extend(Taboo.Pointer, Taboo.Leaf);
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
Taboo.Song = function(artist, title) {
    Taboo.Composite.call(this);
    this.artist = artist;
    this.title = title;
    this.tabType = "Guitar";
    this.capoFret = 0;
    this.comments = "";
    this.strings = [
        new Taboo.String("E", 4),
        new Taboo.String("B", 4),
        new Taboo.String("G", 3),
        new Taboo.String("D", 3),
        new Taboo.String("A", 3),
        new Taboo.String("E", 2)
    ];
    
    var stringViews = [];
    
    for (var i = 0; i < this.strings.length; ++i) {
        var stringGroup = new Kinetic.Group({});
        var grid = Taboo.Global.grid;
        var string = new Kinetic.Line({
            x : 50.5,
            y : 50.5 + i * grid, 
            points:  [0, 0, 800, 0],
            stroke: "black",
            strokeWidth: 1
        });
        var letter = new Kinetic.Text({
            x : -15,
            y : -5 + i * grid,
            text : this.strings[i].note,
            fontSize: 10,
            fontFamily: "DejaVu Sans Mono",
            textFill: "black"
        });
        stringGroup.add(string);
        stringGroup.add(letter);
        stringViews.push(stringGroup);
        this.view.add(stringGroup);
        
    }
    
    this.measures = [
       // new Measure(1)
    ];
    
}

Taboo.Song.prototype = {
    
    getSelection : function(p) {
        return this.measures[p.measure].selectNote();
    },
    
    removeSelection : function(p) {
        this.measures[p.measure].removeSelectedNote();
    },
    
    addMeasure : function() {
        var measure = new Measure(this.measures.length + 1)
        this.measures.push(measure);
        this.add(measure);
    }
}
Taboo.Global.extend(Taboo.Song, Taboo.Composite);
Taboo.String = function (note, octave) {
    Taboo.Leaf.call(this);
    this.note = note;
    this.octave = octave;
    this.hz = this.calculateHz();
    this.type = "Steel";
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
Taboo.Global.extend(Taboo.String, Taboo.Leaf);

$(document).ready(function() {

    var composer = Taboo.newComposerInstance();
    $("body").keydown(composer.keyPress);
    console.log(Taboo);
});

function log() {
    console.log("m:"+p.measure + ", p:" + p.position + ", s:"+p.string + ", f:" + p.fret + ", sub:"+p.subdivision);
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