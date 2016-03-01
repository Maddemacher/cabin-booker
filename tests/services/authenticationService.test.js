"use strict";

describe('authenticationService', function(){

  var authenticationService, $cookies, $httpBackend, $rootScope, AUTH_EVENTS, $q;

  beforeEach(function(){
    module('cabinBooker');
    module('ngCookies');
  });

  beforeEach(inject(function(_authenticationService_, _$cookies_, _$httpBackend_, _$rootScope_, _AUTH_EVENTS_, _$q_){
    authenticationService = _authenticationService_;
    $cookies = _$cookies_;
    $httpBackend = _$httpBackend_;

    $httpBackend.whenGET(/.*/).respond(200);
    $httpBackend.whenDELETE(/.*/).respond(200);
  }));

  it('is authenticated returns true if a session is active', function(){
    $cookies.putObject("cabinBookerSession", {id:"bestId", userRole:"user"});
    expect(authenticationService.IsAuthenticated()).toBeTruthy();
  });

  it('is authenticated returns false if no session is active', function(){
    expect(authenticationService.IsAuthenticated()).toBeFalsy();
  });

  it('is authorized returns true if current session has role', function(){
    $cookies.putObject("cabinBookerSession", {id:"bestId", userRole:"user"});
    expect(authenticationService.IsAuthorized(['user'])).toBeTruthy();
  });

  it('is authorized returns false if current session doesn\'t have role', function(){
    $cookies.putObject("cabinBookerSession", {id:"bestId", userRole:"user"});
    expect(authenticationService.IsAuthorized(['admin'])).toBeFalsy();
  });

  afterEach(function(){
    $httpBackend.flush();
    $cookies.remove("cabinBookerSession");
  });
});
