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