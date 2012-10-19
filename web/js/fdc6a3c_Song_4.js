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