function DamageDeck() {
    this.cards=[]
}
DamageDeck.prototype.GetCards = function(cardJsonUrl) {
    $.ajax({
        dataType: "json",
        url: cardJsonUrl,
        context: this,
        success: function(data) {
            var cardDeck=this.cards;
            
            $.each( data, function( key, val ) {
                for (i=0; i< val["count"];i++) {
                    cardDeck.push(key+":<br>"+ val["text"]);
                };
            });
            this.UpdateTotal();
            this.Shuffle();
        }
    });
    
};

DamageDeck.prototype.Shuffle  = function() {
    var currentIndex = this.cards.length, temporaryValue, randomIndex;
    
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        
        // And swap it with the current element.
        temporaryValue = this.cards[currentIndex];
        this.cards[currentIndex] = this.cards[randomIndex];
        this.cards[randomIndex] = temporaryValue;
    }
}

DamageDeck.prototype.DrawFaceUp  = function() {
    var card=this.cards.pop();
    $("#cardText").append("<br>"+card);
    this.UpdateTotal();
}

DamageDeck.prototype.DrawFaceDown  = function() {
    var card=this.cards.pop();
    this.UpdateTotal();
}

DamageDeck.prototype.UpdateTotal  = function() {
    $("#cardsRemaining").text(this.cards.length);
}

$('document').ready(function(){
    var newDeck= new DamageDeck();
    newDeck.GetCards("damage_deck.json");    
    
    $( "#drawFaceUp" ).click(function() {
        newDeck.DrawFaceUp();
    });
    $( "#drawFaceDown" ).click(function() {
        newDeck.DrawFaceDown();
    });
});

