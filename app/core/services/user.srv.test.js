'use strict';

describe('Portal Module', function(){
    
    beforeEach(module('portal'));
    
    describe('User Service', function(){
        
        var user;
        
        beforeEach(inject(function(_user_){
            user = _user_;
        }))
        
        it('is defined', function(){
            expect(user.test()).toBeTruthy();
        })
        
        it('is not defined', function(){
            expect(user).not.toBeDefined();
        })
        
        
    })
    
})