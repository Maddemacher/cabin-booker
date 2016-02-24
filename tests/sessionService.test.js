"use strict";

describe('sessionService', function(){

  beforeEach(module('cabinBooker'));
  beforeEach(function(){
    console.log('in deps');
    module('ui.router');
    module('ngCookies');
    module('ui.bootstrap');
    module('mwl.calendar');
  });

  describe('create tests', function(){
    console.log('in create tests');
    var service;

    beforeEach(function(){
      console.log('** in inject **');
      service = sessionService;
    });

    it('should be defined', function(){
      expect(service).toBeDefined();
    });

    it('when create is called a cookie should be stored', function () {
        service.create({
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
