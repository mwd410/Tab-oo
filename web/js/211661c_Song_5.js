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

