(function(window, undefined) {

    Array.prototype.containsObject = function(obj, prop) {
        var i;
        for (i = 0; i < this.length; i++) {
            if (this[i][prop] === obj[prop]) {
                return true;
            }
        }

        return false;
    };

})(window);
