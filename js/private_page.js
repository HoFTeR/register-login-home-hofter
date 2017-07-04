(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                    if (vm.user.homeTown == null){
                        //vm.user.homeTown = "User did not fill this information";
                        vm.user.homeTown = "PRIVATE_PAGE_FIELD_NOT_FILLED";
                    }
                    if (vm.user.city == null){
                        vm.user.city = "PRIVATE_PAGE_FIELD_NOT_FILLED";
                    }
                    if (vm.user.birthDayDay != null && vm.user.birthDayMonth != null && vm.user.birthDayYear != null){
                        vm.user.birthDayDay = vm.user.birthDayDay + '';
                        vm.user.birthDayMonth = vm.user.birthDayMonth + '';
                        if (vm.user.birthDayDay.length != 2){
                            vm.user.birthDayDay = "0" + vm.user.birthDayDay;
                        }
                        if(vm.user.birthDayMonth.length != 2){
                            vm.user.birthDayMonth = "0" + vm.user.birthDayMonth;
                        }
                        vm.user.birthDay = vm.user.birthDayDay + "." + vm.user.birthDayMonth + "." + vm.user.birthDayYear;
                    }
                    if (vm.user.birthDayDay == null && vm.user.birthDayMonth == null && vm.user.birthDayYear == null){
                        vm.user.birthDay = "PRIVATE_PAGE_FIELD_NOT_FILLED";
                    } else {
                        if (vm.user.birthDayDay == null || vm.user.birthDayMonth == null){
                            vm.user.birthDay = "PRIVATE_PAGE_FIELD_NOT_FILLED";
                        }
                        if (vm.user.birthDayDay == null && vm.user.birthDayMonth == null){
                            vm.user.birthDay = vm.user.birthDayYear;   
                        }
                        if (vm.user.birthDayYear == null){
                            vm.user.birthDayDay = vm.user.birthDayDay + '';
                            vm.user.birthDayMonth = vm.user.birthDayMonth + '';
                            if (vm.user.birthDayDay.length != 2){
                                vm.user.birthDayDay = "0" + vm.user.birthDayDay;
                            }
                            if(vm.user.birthDayMonth.length != 2){
                                vm.user.birthDayMonth = "0" + vm.user.birthDayMonth;
                            }
                            vm.user.birthDay = vm.user.birthDayDay + "." + vm.user.birthDayMonth;
                        }

                    }
                    if (vm.user.email == null){
                        vm.user.email = "PRIVATE_PAGE_FIELD_NOT_FILLED";
                    }
                    if (vm.user.pnumber == null){
                        vm.user.pnumber = "PRIVATE_PAGE_FIELD_NOT_FILLED";
                    } else {
                        vm.user.pnumber = "+" + vm.user.pnumber;
                        var country_code = vm.user.pnumber.substring(0,4);
                        var operator_code = vm.user.pnumber.substring(4,6);
                        var first_part_number = vm.user.pnumber.substring(6,9);
                        var second_part_number = vm.user.pnumber.substring(9,11);
                        var last_part_number = vm.user.pnumber.substring(11);
                        vm.user.pnumber = country_code + "-" + operator_code + "-" + first_part_number + "-" + second_part_number + "-" + last_part_number;
                    }
                    if (vm.user.hnumber == null){
                        vm.user.hnumber = "PRIVATE_PAGE_FIELD_NOT_FILLED";
                    } else {
                        vm.user.hnumber = "+" + vm.user.hnumber;
                        var country_code = vm.user.hnumber.substring(0,4);
                        var operator_code = vm.user.hnumber.substring(4,6);
                        var first_part_number = vm.user.hnumber.substring(6,9);
                        var second_part_number = vm.user.hnumber.substring(9,11);
                        var last_part_number = vm.user.hnumber.substring(11);
                        vm.user.hnumber = country_code + "-" + operator_code + "-" + first_part_number + "-" + second_part_number + "-" + last_part_number;
                    }
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();