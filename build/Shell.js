(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

	// const DiyaSelector = require('../../DiyaSelector.js').DiyaSelector
	// const DiyaSelector = require('diya-sdk').d1.DiyaSelector
	var DiyaSelector = d1.DiyaSelector;

	DiyaSelector.prototype.shell = function (command, args, cols, rows, term, callback) {
		var _this = this;

		this.request({
			service: 'shell',
			func: 'RegisterProcess',
			data: {
				command: command,
				args: args,
				cols: cols,
				rows: rows,
				term: term
			}
		}, function (peerId, err, termId) {
			if (err) return callback(peerId, err, null);

			_this._connection._d1inst(peerId).openSocket('/var/run/diya/shell.sock', function (peerId, err, socket) {
				if (err) return callback(peerId, err, null);

				//send authentication token
				socket.write(termId + '\n');

				//notify client that the socket is ready
				callback(peerId, null, new Shell(_this._connection._d1inst, peerId, termId, socket));
			});
		});
	};

	var Shell = function () {
		function Shell(d1inst, peerId, termId, socket) {
			_classCallCheck(this, Shell);

			this._d1inst = d1inst;
			this._peerId = peerId;
			this._termId = termId;
			this.socket = socket;
		}

		_createClass(Shell, [{
			key: 'resize',
			value: function resize(cols, rows) {
				var _this2 = this;

				this._d1inst(this._peerId).request({
					service: 'shell',
					func: 'ResizeShell',
					data: {
						process_id: this._termId,
						cols: cols,
						rows: rows
					}
				}, function (peerId, err, data) {
					console.log('resized term ' + _this2._termId);
				});
			}
		}, {
			key: 'close',
			value: function close() {
				this.socket.disconnect();
			}
		}]);

		return Shell;
	}();
})();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvU2hlbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNDQSxDQUFDLFlBQVc7O0FBRVg7QUFDQTtBQUNBLEtBQU0sZUFBZSxHQUFHLFlBQXhCOztBQUdBLGNBQWEsU0FBYixDQUF1QixLQUF2QixHQUErQixVQUFVLE9BQVYsRUFBbUIsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsSUFBL0IsRUFBcUMsSUFBckMsRUFBMkMsUUFBM0MsRUFBcUQ7QUFBQTs7QUFDbkYsT0FBSyxPQUFMLENBQWE7QUFDWixZQUFTLE9BREc7QUFFWixTQUFNLGlCQUZNO0FBR1osU0FBTTtBQUNMLG9CQURLO0FBRUwsY0FGSztBQUdMLGNBSEs7QUFJTCxjQUpLO0FBS0w7QUFMSztBQUhNLEdBQWIsRUFVRyxVQUFDLE1BQUQsRUFBUyxHQUFULEVBQWMsTUFBZCxFQUF5QjtBQUMzQixPQUFJLEdBQUosRUFBUyxPQUFPLFNBQVMsTUFBVCxFQUFpQixHQUFqQixFQUFzQixJQUF0QixDQUFQOztBQUVULFNBQUssV0FBTCxDQUFpQixPQUFqQixDQUF5QixNQUF6QixFQUFpQyxVQUFqQyxDQUE0QywwQkFBNUMsRUFBd0UsVUFBQyxNQUFELEVBQVMsR0FBVCxFQUFjLE1BQWQsRUFBeUI7QUFDaEcsUUFBSSxHQUFKLEVBQVMsT0FBTyxTQUFVLE1BQVYsRUFBa0IsR0FBbEIsRUFBdUIsSUFBdkIsQ0FBUDs7QUFFVDtBQUNBLFdBQU8sS0FBUCxDQUFnQixNQUFoQjs7QUFFQTtBQUNBLGFBQVUsTUFBVixFQUFrQixJQUFsQixFQUF3QixJQUFJLEtBQUosQ0FBVyxNQUFLLFdBQUwsQ0FBaUIsT0FBNUIsRUFBcUMsTUFBckMsRUFBNkMsTUFBN0MsRUFBcUQsTUFBckQsQ0FBeEI7QUFDQSxJQVJEO0FBU0EsR0F0QkQ7QUF1QkEsRUF4QkQ7O0FBUFcsS0FrQ0wsS0FsQ0s7QUFtQ1YsaUJBQWEsTUFBYixFQUFxQixNQUFyQixFQUE2QixNQUE3QixFQUFxQyxNQUFyQyxFQUE2QztBQUFBOztBQUM1QyxRQUFLLE9BQUwsR0FBZSxNQUFmO0FBQ0EsUUFBSyxPQUFMLEdBQWUsTUFBZjtBQUNBLFFBQUssT0FBTCxHQUFlLE1BQWY7QUFDQSxRQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0E7O0FBeENTO0FBQUE7QUFBQSwwQkEwQ0YsSUExQ0UsRUEwQ0ksSUExQ0osRUEwQ1U7QUFBQTs7QUFDbkIsU0FBSyxPQUFMLENBQWEsS0FBSyxPQUFsQixFQUEyQixPQUEzQixDQUFtQztBQUNsQyxjQUFTLE9BRHlCO0FBRWxDLFdBQU0sYUFGNEI7QUFHbEMsV0FBTTtBQUNMLGtCQUFZLEtBQUssT0FEWjtBQUVMLFlBQU0sSUFGRDtBQUdMLFlBQU07QUFIRDtBQUg0QixLQUFuQyxFQVFHLFVBQUMsTUFBRCxFQUFTLEdBQVQsRUFBYyxJQUFkLEVBQXVCO0FBQ3pCLGFBQVEsR0FBUixtQkFBNEIsT0FBSyxPQUFqQztBQUNBLEtBVkQ7QUFXQTtBQXREUztBQUFBO0FBQUEsMkJBd0REO0FBQ1IsU0FBSyxNQUFMLENBQVksVUFBWjtBQUNBO0FBMURTOztBQUFBO0FBQUE7QUE0RFgsQ0E1REQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4oZnVuY3Rpb24gKCl7XG5cblx0Ly8gY29uc3QgRGl5YVNlbGVjdG9yID0gcmVxdWlyZSgnLi4vLi4vRGl5YVNlbGVjdG9yLmpzJykuRGl5YVNlbGVjdG9yXG5cdC8vIGNvbnN0IERpeWFTZWxlY3RvciA9IHJlcXVpcmUoJ2RpeWEtc2RrJykuZDEuRGl5YVNlbGVjdG9yXG5cdGNvbnN0IERpeWFTZWxlY3RvciA9IGQxLkRpeWFTZWxlY3RvclxuXG5cblx0RGl5YVNlbGVjdG9yLnByb3RvdHlwZS5zaGVsbCA9IGZ1bmN0aW9uIChjb21tYW5kLCBhcmdzLCBjb2xzLCByb3dzLCB0ZXJtLCBjYWxsYmFjaykge1xuXHRcdHRoaXMucmVxdWVzdCh7XG5cdFx0XHRzZXJ2aWNlOiAnc2hlbGwnLFxuXHRcdFx0ZnVuYzogJ1JlZ2lzdGVyUHJvY2VzcycsXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdGNvbW1hbmQsXG5cdFx0XHRcdGFyZ3MsXG5cdFx0XHRcdGNvbHMsXG5cdFx0XHRcdHJvd3MsXG5cdFx0XHRcdHRlcm1cblx0XHRcdH1cblx0XHR9LCAocGVlcklkLCBlcnIsIHRlcm1JZCkgPT4ge1xuXHRcdFx0aWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKHBlZXJJZCwgZXJyLCBudWxsKVxuXG5cdFx0XHR0aGlzLl9jb25uZWN0aW9uLl9kMWluc3QocGVlcklkKS5vcGVuU29ja2V0KCcvdmFyL3J1bi9kaXlhL3NoZWxsLnNvY2snLCAocGVlcklkLCBlcnIsIHNvY2tldCkgPT4ge1xuXHRcdFx0XHRpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2sgKHBlZXJJZCwgZXJyLCBudWxsKVxuXG5cdFx0XHRcdC8vc2VuZCBhdXRoZW50aWNhdGlvbiB0b2tlblxuXHRcdFx0XHRzb2NrZXQud3JpdGUoYCR7dGVybUlkfVxcbmApXG5cblx0XHRcdFx0Ly9ub3RpZnkgY2xpZW50IHRoYXQgdGhlIHNvY2tldCBpcyByZWFkeVxuXHRcdFx0XHRjYWxsYmFjayAocGVlcklkLCBudWxsLCBuZXcgU2hlbGwgKHRoaXMuX2Nvbm5lY3Rpb24uX2QxaW5zdCwgcGVlcklkLCB0ZXJtSWQsIHNvY2tldCkpXG5cdFx0XHR9KVxuXHRcdH0pXG5cdH1cblxuXG5cdGNsYXNzIFNoZWxsIHtcblx0XHRjb25zdHJ1Y3RvciAoZDFpbnN0LCBwZWVySWQsIHRlcm1JZCwgc29ja2V0KSB7XG5cdFx0XHR0aGlzLl9kMWluc3QgPSBkMWluc3Rcblx0XHRcdHRoaXMuX3BlZXJJZCA9IHBlZXJJZFxuXHRcdFx0dGhpcy5fdGVybUlkID0gdGVybUlkXG5cdFx0XHR0aGlzLnNvY2tldCA9IHNvY2tldFxuXHRcdH1cblxuXHRcdHJlc2l6ZSAoY29scywgcm93cykge1xuXHRcdFx0dGhpcy5fZDFpbnN0KHRoaXMuX3BlZXJJZCkucmVxdWVzdCh7XG5cdFx0XHRcdHNlcnZpY2U6ICdzaGVsbCcsXG5cdFx0XHRcdGZ1bmM6ICdSZXNpemVTaGVsbCcsXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRwcm9jZXNzX2lkOiB0aGlzLl90ZXJtSWQsXG5cdFx0XHRcdFx0Y29sczogY29scyxcblx0XHRcdFx0XHRyb3dzOiByb3dzXG5cdFx0XHRcdH1cblx0XHRcdH0sIChwZWVySWQsIGVyciwgZGF0YSkgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhgcmVzaXplZCB0ZXJtICR7dGhpcy5fdGVybUlkfWApXG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdGNsb3NlICgpIHtcblx0XHRcdHRoaXMuc29ja2V0LmRpc2Nvbm5lY3QgKClcblx0XHR9XG5cdH1cbn0pKClcbiJdfQ==
