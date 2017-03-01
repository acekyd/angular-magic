(function() {

	"use strict";

	angular
		.module("ngClassifieds")
		.controller("classifiedsCtrl", function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
			var vm = this;

			vm.openSidebar = openSidebar;
			vm.closeSidebar = closeSidebar;
			vm.saveClassified = saveClassified;
			vm.editClassified = editClassified;
			vm.deleteClassified = deleteClassified;

			vm.classifieds;
			vm.categories;
			vm.editing;
			vm.classified;

			classifiedsFactory.getClassifieds().then(function(classifieds) {
				vm.classifieds = classifieds.data;
				vm.categories = getCategories(vm.classifieds);
			})

			$scope.$on('myMessage', function(event, message){
				console.log(message);
			})

			var contact = {
				name: "Ace",
				phone: "234 706 115 7137",
				email: "acekyd@ymail.com"
			}

			function openSidebar() {
				$state.go('classifieds.new');
			}

			function closeSidebar() {
				$mdSidenav('left').close();
			}

			function saveClassified(classified) {
				if(classified) {
					classified.contact = contact;
					vm.classifieds.push(classified);
					vm.classified = {};
					vm.closeSidebar();

					showToast("Classified Saved!");
				}
			}

			function editClassified(classified) {
				vm.editing = true;
				openSidebar();
				vm.classified = classified;
			}

			function saveEdit() {
				vm.editing = false;
				closeSidebar();
				vm.classified = {};

				showToast("Edit Saved!");
			}

			function deleteClassified (classified, event) {
				var confirm = $mdDialog.confirm()
					.title('Are you sure you want to delete ' + classified.title + '?')
					.ok('Yes')
					.cancel('No')
					.targetEvent(event);

				$mdDialog.show(confirm).then(function() {
					var index = vm.classifieds.indexOf(classified);
					vm.classifieds.splice(index, 1);
				}, function() {

				})
			}

			function showToast(message) {
				$mdToast.show (
					$mdToast.simple()
						.content(message)
						.position('top, right')
						.hideDelay(3000)
				);
			}

			function getCategories(classifieds) {
				var categories = [];

				angular.forEach(classifieds, function(item){
					angular.forEach(item.categories, function(category){
						categories.push(category);
					});
				});

				return _.uniq(categories);
			}

		});
})();