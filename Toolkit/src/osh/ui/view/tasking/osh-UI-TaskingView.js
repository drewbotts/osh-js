var htmlTaskingComponent =
    "<div class=\"flex-container\">"+
        "<div class=\"remote fixed\">" +
            "<input id=\"button-pan-left\" type=\"image\" src=\"images/remote-left.png\" class=\"remote-left remote-button\"/>" +
            "<input id=\"button-tilt-up\" type=\"image\" src=\"images/remote-up.png\" class=\"remote-up remote-button\"/>" +
            "<input id=\"button-pan-right\" type=\"image\" src=\"images/remote-right.png\" class=\"remote-right remote-button\"/>"+
            "<input id=\"button-tilt-down\" type=\"image\" src=\"images/remote-down.png\" class=\"remote-down remote-button\"/>"+
        "</div>"+
        "<div class=\"ptz flex-item\">" +
            "<div class=\"preset\">" +
                "<label for=\"preset\">Preset:</label>" +
                "<select name=\"preset\">"+
                    "<option value=\"value1\">Valeur 1</option>"+
                    "<option value=\"value2\" selected>Valeur 2</option>"+
                    "<option value=\"value3\">Valeur 3</option>"+
                "</select>" +
            "</div>"+
            "<div class=\"pan\"><label for=\"pan\">Pan:</label><input id=\"input-pan\" type=\"text\" name=\"pan\" size=\"8\" value=\"0\" disabled></div>"+
            "<div class=\"tilt\"><label for=\"tilt\">Tilt:</label><input id=\"input-tilt\" type=\"text\" name=\"tilt\" size=\"8\" value=\"0\" disabled></div>"+
            "<div class=\"zoom\"><label for=\"zoom\">Zoom:</label><input id=\"input-zoom\" type=\"text\" name=\"zoom\" size=\"8\" value=\"0\" disabled></div>"+
        "</div>"+
    "</div>";


OSH.UI.TaskingView = Class.create(OSH.UI.View, {
    initialize: function ($super, divId, options) {
        $super(divId);
        var width = "640";
        var height = "480";
        this.css = "";

        this.cssSelected = "";

        if(typeof (options) != "undefined") {
            if (options.width) {
                width = options.width;
            }

            if (options.height) {
                height = options.height;
            }

            if (options.css) {
                this.css = options.css;
            }

            if (options.cssSelected) {
                this.cssSelected = options.cssSelected;
            }
        }

        // creates video tag element
        this.rootTag = document.createElement("div");
        this.rootTag.setAttribute("height", height);
        this.rootTag.setAttribute("width", width);
        this.rootTag.setAttribute("class", this.css);
        this.rootTag.setAttribute("id", "dataview-" + OSH.Utils.randomUUID());

        // appends <img> tag to <div>
        document.getElementById(this.divId).appendChild(this.rootTag);

        this.rootTag.innerHTML = htmlTaskingComponent;

        this.observers = [];

        this.pan = 0;
        this.tilt = 0;
        this.zoom = 0;

        // inits listeners
        $("button-tilt-up").observe('click', function(){this.onTiltClick(1)}.bind(this));
        $("button-tilt-down").observe('click', function(){this.onTiltClick(-1)}.bind(this));
        $("button-pan-left").observe('click', function(){this.onPanClick(-1)}.bind(this));
        $("button-pan-right").observe('click', function(){this.onPanClick(1)}.bind(this));
    },

    onTiltClick: function(value) {
        this.tilt += value;
        document.getElementById("input-tilt").value = this.tilt;
        this.onChange();
    },

    onPanClick: function(value) {
        this.pan += value;
        document.getElementById("input-pan").value = this.pan;
        this.onChange();
    },

    onChange: function() {
        //TODO: get values from INPUT
        var properties = {
            pan : this.pan,
            zoom: 50,
            tilt : this.tilt
        }

        for(var i=0;i < this.observers.length;i++) {
            this.observers[i].sendRequest(properties);
        }
    },

    register: function(observer) {
        this.observers.push(observer);
    }
});

