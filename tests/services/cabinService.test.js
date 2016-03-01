"use strict";

describe('cabinService', function(){

  var cabinService, $cookies, $httpBackend, $rootScope, AUTH_EVENTS, $q;

  beforeEach(function(){
    module('cabinBooker');
    module('ngCookies');
  });

  afterEach(function(){
    $httpBackend.flush();
    $cookies.remove("cabinBookerSession");
  });
});
