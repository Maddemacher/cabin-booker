"use strict";

describe('sessionService', function(){

  var sessionService, $cookies, $httpBackend, $rootScope, AUTH_EVENTS, $q;

  beforeEach(function(){
    module('cabinBooker')
    module('ui.router');
    module('ngCookies');
    module('ui.bootstrap');
    module('mwl.calendar');
  });

  beforeEach(inject(function(_sessionService_, _$cookies_, _$httpBackend_, _$rootScope_, _AUTH_EVENTS_, _$q_){
    sessionService = _sessionService_;
    $cookies = _$cookies_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    AUTH_EVENTS = _AUTH_EVENTS_;
    $q = _$q_;

    $httpBackend.whenGET(/.*/).respond(200);
    $httpBackend.whenDELETE(/.*/).respond(200);
  }));

  it('when create is called a cookie should be stored', function () {
      sessionService.create({
                        id : "bestId",
                        expirationDate : "bestDate",
                        userRole : "bestRole"
                    	});

      var cookie = $cookies.getObject("cabinBookerSession");

      expect(cookie).toBeDefined();
      expect(cookie.id).toEqual("bestId");
      expect(cookie.expirationDate).toEqual("bestDate");
      expect(cookie.userRole).toEqual("bestRole");
  });

  it('when create is called a login is requested', function(){
      var loginRequested;

      $cookies.putObject("cabinBookerSession", {id: "bestId"});
      $rootScope.$on(AUTH_EVENTS.loginSuccess,
        function() {
          loginRequested = true;
        });

      sessionService.create({
        id : "bestId",
        expirationDate : "bestDate",
        userRole : "bestRole"
      });

      expect(loginRequested).toBeTruthy();
  });

  it('has session returns true if a session exists', function() {
      $cookies.putObject("cabinBookerSession", {id: "super"});
      expect(sessionService.hasSession()).toBeTruthy();
  });

  it('has session returns false if a session doesn\'t exist', function() {
    expect(sessionService.hasSession()).toBeFalsy();
  });

  it('when destroy is called the backend is notified', function(){
      $cookies.putObject("cabinBookerSession", {id: "super"});
      $httpBackend.expectDELETE('/api/session/super').respond(200);

      sessionService.destroy();
  });

  it('when destroy is called cookie is removed', function(){
      $cookies.putObject("cabinBookerSession", {id: "bestId"});

      sessionService.destroy();

      expect($cookies.getObject("cabinBookerSession")).toBeUndefined();
  });

  it('when destroy is called a logout event is published', function(){
      var logoutRequested;
      $cookies.putObject("cabinBookerSession", {id: "bestId"});
      $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() { logoutRequested = true; });

      sessionService.destroy();

      expect(logoutRequested).toBeTruthy();
  });

  it('session service triggers logout if session validation failed', function(){
    var deferred = $q.defer();
    var logoutRequested;

    $cookies.putObject("cabinBookerSession", {id: "bestId"});

    $rootScope.$on(AUTH_EVENTS.logoutSuccess,
      function() {
        logoutRequested = true;
        deferred.resolve();
      });

    $httpBackend.expectGET('/api/session/bestId').respond(200, { valid: false });

    $rootScope.$broadcast(AUTH_EVENTS.sessionValidationRequested);

    deferred.promise.then(function() {
      expect(logoutRequested).toBeTruthy();
    })
  });

  it('session service triggers login if sessin validation succeeded', function(){
    var deferred = $q.defer();
    var loginRequested;

    $cookies.putObject("cabinBookerSession", {id: "bestId"});

    $rootScope.$on(AUTH_EVENTS.loginSuccess,
      function() {
        loginRequested = true;
        deferred.resolve();
      });

    $httpBackend.expectGET('/api/session/bestId').respond(200, { valid: true });

    $rootScope.$broadcast(AUTH_EVENTS.sessionValidationRequested);

    deferred.promise.then(function() {
      expect(loginRequested).toBeTruthy();
    });
  });

  it('get session role returns role of session', function(){
    $cookies.putObject("cabinBookerSession", {id: "bestId", userRole: "admin"});
    expect(sessionService.getSessionRole()).toEqual("admin");
  });

  afterEach(function(){
    $httpBackend.flush();
    $cookies.remove("cabinBookerSession");
  });
});
