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
