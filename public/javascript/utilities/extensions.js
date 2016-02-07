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

    Array.prototype.sortBy = function(property, isAscending) {
        if (!this || !this.length)
            return [];

        if (!isAscending)
            isAscending = false;

        this.sort(function(item1, item2) {
            return isAscending ? (item1[property] > item2[property]) : (item1[property] < item2[property]);
        });
    };

})(window);
