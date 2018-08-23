function Dial(target) {
    this.src="";
    this.container="#"+target;
    this.selectShip="#selectShip";
    this.dial="#dial";
    this.startRotate=false;
    this.startAngle=0;
    this.currAngle=0;
    this.rotation=0;
    this.center={x:0, y:0};
    var shipSelect=$(this.container).find(this.selectShip);
    var shipDial=$(this.container).find(this.dial).find("img");
    shipSelect.on('change', function() {
        shipDial.attr("src", "dials/"+this.value);
    });
    
    var R2D = 180 / Math.PI
    var thisdial=this;
    shipDial.on("mousedown", function(e) {
        e.preventDefault();
        var height, left, top, width, x, y, _ref;
        _ref = this.getBoundingClientRect(), top = _ref.top, left = _ref.left, height = _ref.height, width = _ref.width;
        thisdial.center = {
            x: left + (width / 2),
            y: top + (height / 2)
        };
        var x = e.clientX - thisdial.center.x;
        var y = e.clientY - thisdial.center.y;
        thisdial.startAngle = R2D * Math.atan2(y, x);
        thisdial.startRotate=true;
    });
    shipDial.on("mousemove", function(e) {
        var d, x, y;
        e.preventDefault();
        x = e.clientX - thisdial.center.x;
        y = e.clientY - thisdial.center.y;
        d = R2D * Math.atan2(y, x);
        thisdial.rotation = d - thisdial.startAngle;
        if (thisdial.startRotate) {
            return this.style.webkitTransform = "rotate(" + (thisdial.currAngle + thisdial.rotation) + "deg)";
        }
    });
    shipDial.on("mouseup", function(e) {
        e.preventDefault();
        thisdial.startRotate=false;
        thisdial.currAngle += thisdial.rotation;
    });
}

Dial.prototype.LoadJSON = function(dialsJsonUrl) {
    $.getJSON({
        dataType: "json",
        url: dialsJsonUrl,
        context: this,
        success: function(data) {
            var shipSelect=$(this.container).find(this.selectShip);
            shipSelect.empty();
            var option;
            $.each( data, function( key, val ) {
                //factions
                $.each( val, function( ship, img ) {
                    //ships
                    var option = $('<option></option>').attr("value", img).text(ship);
                    shipSelect.append(option);    
                });
            });
            
            
            
            
        }
    });
    
};

Dial.prototype.LoadImage = function(cardJsonUrl) {
}


$('document').ready(function(){
    var newDial= new Dial("ship");
    newDial.LoadJSON("dials.json");    
    
    document.ontouchmove = function(e) {
        return e.preventDefault();
    };
    

});

