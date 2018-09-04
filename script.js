(function () {
    "use strict";

    var getElement = function (element) {
        if (element.charAt(0) === "#") {
            return document.querySelector(element);
        }
        return document.querySelectorAll(element);
    }
    var equals = getElement("#equals");
    var viewer = getElement("#viewer");
    var nums = getElement(".num");
    var ops = getElement(".ops");
    var currentNum = "";
    var oldNum = "";
    var resultNum;
    var operator;

    var setNum = function () {
        if (resultNum) {
            currentNum = this.getAttribute("data-num");
            resultNum = "";
        } else {
            currentNum += this.getAttribute("data-num");
        }
        viewer.innerHTML = currentNum;
    };

    var moveNum = function () {
        oldNum = currentNum;
        currentNum = "";
        operator = this.getAttribute("data-ops");
        equals.setAttribute("data-result", "");
    };

    var displayNum = function () {
        oldNum = parseFloat(oldNum);
        currentNum = parseFloat(currentNum);

        switch (operator) {
            case "plus":
                resultNum = oldNum + currentNum;
                break;
            case "minus":
                resultNum = oldNum - currentNum;
                break;
            case "times":
                resultNum = oldNum * currentNum;
                break;
            case "divided":
                resultNum = oldNum / currentNum;
                break;
            default:
                resultNum = currentNum;
        }

        // If NaN or Infinity returned
        if (!isFinite(resultNum)) {
            if (isNaN(resultNum)) {
                resultNum = "You broke it!";
            } else {
                resultNum = "Look at what you've done";
                getElement('#calculator').classList.add("broken");
                getElement('#reset').classList.add("show");
            }
        }

        viewer.innerHTML = resultNum;
        equals.setAttribute("data-result", resultNum);
        oldNum = 0;
        currentNum = resultNum;
    };

    var clearAll = function () {
        oldNum = "";
        currentNum = "";
        viewer.innerHTML = "0";
        equals.setAttribute("data-result", resultNum);
    }

    nums.forEach((number) => {
        number.onclick = setNum;
    });

    ops.forEach((oper) => {
        oper.onclick = moveNum;
    });

    getElement("#clear").onclick = clearAll;
    equals.onclick = displayNum;

    getElement("#reset").onclick = function () {
        window.location = window.location;
    };
}());