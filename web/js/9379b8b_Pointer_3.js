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