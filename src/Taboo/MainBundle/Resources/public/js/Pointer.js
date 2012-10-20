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
        }
    },this);
    this.pieces = [];
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
    this.layer.setPosition(20,20);
    this.layer.add(this.halo);
    this.layer.add(this.number);
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