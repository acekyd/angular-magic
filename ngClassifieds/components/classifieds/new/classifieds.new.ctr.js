(function() {

	"use script";

	angular
		.module('ngClassifieds')
		.controller('newClassifiedsCtrl', function($scope, $state, $mdSidenav,  $timeout, $mdDialog, classifiedsFactory) {
			var vm = this;
			vm.closeSidebar = closeSidebar;

			$timeout(function() {
				$mdSidenav('left').open();
			});

			$scope.$watch('vm.sidenavOpen', function(sidenav) {
				if(sidenav === false) {
					$mdSidenav('left')
						.close()
						.then(function() {
							$state.go('classifieds');
						})
				}
			});

			function closeSidebar() {
				vm.sidenavOpen = false;
			}

			vm.sendMessage = function() {
				$scope.$emit('myMessage', 'This is a message ');
			}

		});
})();