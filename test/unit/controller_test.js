describe("Controller Test", function () {
    //Процесс работы с $httpBackend сервисом состоит из этапов:
    //1. Определить запрос и ответ на него
    //2. Ответить на запрос.
    //3. Проверить что все ожидаемые запросы выполнены.
    //4. Проверить результаты.

    // Arrange
    var mockScope, controller, backend;
    beforeEach(angular.mock.module("taksApp"));
    beforeEach(angular.mock.inject(function ($httpBackend) {
        backend = $httpBackend;
        //сервис $httpBackend используется для реализации низкоуровнего API по работе с AJAX запросами, с помощью этого сервиса можно
        //симулировать ответы от сервера(этот сервис содержится в ngMock)
        backend.expect("GET", "tasks/tasks.json").respond(
        [{ "name": "Today_task1", "obj_status": "active", "estimated_effort": 5.5 },
        { "name": "Today_task11", "obj_status": "active", "estimated_effort": 5.5 },
        { "name": "Today_task12", "obj_status": "active", "estimated_effort": 5.5 }]);
    }));

    beforeEach(angular.mock.inject(function ($controller, $rootScope, $http) {
        mockScope = $rootScope.$new();
        $controller("TaskListCtrl", {
            $scope: mockScope,
            $http: $http
        });
        backend.flush();
    }));

    it("Processes the data", function () {
        expect(mockScope.tasks).toBeDefined();
        expect(mockScope.tasks.length).toEqual(3);
    });
    it("Preserves the data order", function () {
        expect(mockScope.tasks[0].name).toEqual("Today_task1");
        expect(mockScope.tasks[1].name).toEqual("Today_task11");
        expect(mockScope.tasks[2].name).toEqual("Today_task12");
    });
});