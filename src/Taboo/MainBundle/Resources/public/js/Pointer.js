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

    this.pieces = [];
    this.circle = new Kinetic.Circle({
        x : this.number.getWidth / 2,
        radius : Taboo.grid * .75,
        stroke : 'black',
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
    for (i = 0; i < this.pieces.length; ++i) {
        this.layer.add(this.pieces[i]);
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