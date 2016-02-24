"use strict";

describe('sessionService', function(){
  beforeEach(module('cabinBooker'));
  beforeEach(function(){
    module('ui.router');
    module('ngCookies');
    module('ui.bootstrap');
    module('mwl.calendar');
  });

  describe('create tests', function(){
    var sessionService, $cookies;

    beforeEach(inject(function(_sessionService_, _$cookies_){
      sessionService = _sessionService_;
      $cookies = _$cookies_;
    }));

    it('should be defined', function(){
      expect(sessionService).toBeDefined();
    });

    it('when create is called a cookie should be stored', function () {
        sessionService.create({
                          id : "bestId",
                          expirationDate : "bestDate",
                          userRole : "bestRole"
                      	});

        var cookie = $cookies.getObject("cabinBookerSession");


        expect(cookie.id).toEqual("bestId");
        expect(cookie.expirationDate).toEqual("bestDate");
        expect(cookie.userRole).toEqual("bestRole");
    });
  });
});
