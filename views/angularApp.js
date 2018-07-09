let app = angular.module("angApp", [])

app.run()

//thows errors

angular.module('exceptionOverride', []).factory('$exceptionHandler', function() {
		return function(exception, cause) {
			exception.message += 'Angular Exception: "' + cause + '"';
			throw exception;
	};
});
