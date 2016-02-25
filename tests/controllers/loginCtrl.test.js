"use strict";

describe('LoginCtrl', function(){

  var LoginCtrl, $scope, sessionService, $httpBackend;

  beforeEach(function(){
    module('cabinBooker')
    module('ui.router');
    module('ngCookies');
    module('ui.bootstrap');
    module('mwl.calendar');
  });

  beforeEach(inject(function($controller, _sessionService_, _$httpBackend_){
    $scope = {};
    LoginCtrl = $controller('LoginCtrl', { $scope: $scope});
    $httpBackend = _$httpBackend_;
    sessionService = _sessionService_;

    $httpBackend.whenGET(/.*/).respond(200);
    $httpBackend.whenDELETE(/.*/).respond(200);
  }));

  it('session cookie is created when login is successfull', function(){
    var credentials = { userName: 'user', password: 'pass'};
    var session = { id : "superId", userRole : "superUser"};
    spyOn(sessionService, 'create');

    $httpBackend.expectPOST('/api/login', credentials).respond(200, { success: true, session : session});

    $scope.login(credentials).then(function(){
      expect(sessionService.create).toHaveBeenCalled();
      expect(sessionService.create).toHaveBeenCalledWith(session);
    });
  });

  it('session is not created when login failed', function(){
    spyOn(sessionService, 'create');

    $httpBackend.expectPOST('/api/login').respond(200, { success: false });

    $scope.login({ userName: 'user', password: 'pass'}).then(function(){
      expect(sessionService.create.calls.count()).toEqual(0);
    });
  });

  it('error message is displayed when login failed', function(){
    $httpBackend.expectPOST('/api/login').respond(200, { success: false });

    $scope.login({ userName: 'user', password: 'pass'}).then(function(){
      expect($scope.loginFailed).toBeTruthy();
    });
  });

  afterEach(function(){
    $httpBackend.flush();
  });
});
