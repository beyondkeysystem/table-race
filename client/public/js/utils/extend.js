String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.toPascalCase = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
};

String.prototype.toDashNotation = function() {
    //TODO-DCURRAS: implement
};
