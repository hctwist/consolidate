
var dateMargin = 48;
var pipeMargin = 64;
var boxMargin = 32;

var oneColumn = false;

setDateWidths();
setMargins();
$(window).resize(setMargins);

function setDateWidths() {

    var maxDateWidth = 0;

    // Ensure all dates are the same size
    var dateContents = $(".date .content");
    dateContents.each(function(index, date) {
        maxDateWidth = Math.max($(date).width(), maxDateWidth);
    });
    dateContents.width(maxDateWidth);
}

function setMargins() {

    if(window.matchMedia("(max-width: 700px)").matches) {

        if(!oneColumn) {
            oneColumn = true;
            setOneColumnMargins();
        }
    }
    else {

        oneColumn = false;
        setTwoColumnMargins();
    }
}

function setOneColumnMargins() {

    console.log("setting one columm");

    // -1: None, 0: Date, 1: Event
    var lastElement = -1;

    $("#timeline").children().each(function(index, element) {

        var jElement = $(element);
        var margin;

        if(jElement.hasClass("date")) {

            if(lastElement != -1) {

                margin = dateMargin;
            }

            lastElement = 0;
        }
        else if(jElement.hasClass("event")) {

            if(lastElement == 0) {

                margin = dateMargin;
            }
            else {

                margin = boxMargin;
            }

            lastElement = 1;
        }

        jElement.css("margin-top", margin);
    });
}

function setTwoColumnMargins() {

    // -1: None, 0: Date, 1: Event
    var lastElement = -1;

    // Represents either the bottom of a date or a pipe
    var lastBottom = 0;

    var lastLeftBarrier = 0;
    var lastRightBarrier = 0;

    var pipeHeight = $(".pipe").height();

    $("#timeline").children().each(function(index, element) {

        var jElement = $(element);

        if(jElement.hasClass("date")) {

            if(lastElement == -1) {
                lastBottom += jElement.height();
            }
            if(lastElement == 0) {
                jElement.css("margin-top", dateMargin);
                lastBottom += dateMargin + jElement.height();
            }
            else if(lastElement == 1) {
                var dateTop = jElement.position().top;
                var shift = lastBottom - dateTop;
                jElement.css("margin-top", shift + dateMargin);
                lastBottom += dateMargin + jElement.height();
            }
            lastElement = 0;
        }
        else if (jElement.hasClass("event")) {

            var eventTop = jElement.position().top;
            var eventHeight = jElement.height();
            var shift = lastBottom - eventTop + (pipeHeight / 2) - (eventHeight / 2);
            var margin = lastElement == 0 ? dateMargin : pipeMargin;

            var marginTop = shift + margin;

            var isLeft = jElement.hasClass("left");
            var lastBarrier = isLeft ? lastLeftBarrier: lastRightBarrier;

            var barrierAdjustment = 0;
            if(eventTop + marginTop < lastBarrier + boxMargin) {
                barrierAdjustment = (lastBarrier - (eventTop + marginTop)) + boxMargin;
            }

            jElement.css("margin-top", marginTop + barrierAdjustment);
            lastBottom += margin + pipeHeight + barrierAdjustment;
            lastElement = 1;

            var newLastBarrier = eventTop + marginTop + barrierAdjustment + eventHeight;
            if(isLeft) {
                lastLeftBarrier = newLastBarrier;
            }
            else {
                lastRightBarrier = newLastBarrier;
            }
        }
    });
}
