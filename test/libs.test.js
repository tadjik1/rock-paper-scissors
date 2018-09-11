import assert from 'assert';
import sinon from 'sinon';
import * as libs from '../public/js/libs';

describe('libs test cases', () => {
  context('eventemitter', () => {
    it('ee should call subscriber', () => {
      const spy = sinon.spy();
      const ee = new libs.EventEmitter();
      
      ee.on('event', spy);
      ee.emit('event', 'message');
      assert.ok(spy.calledWith('message'));
    });
  
    it('ee should not call subscriber for different event', () => {
      const spy = sinon.spy();
      const ee = new libs.EventEmitter();
    
      ee.on('event', spy);
      ee.emit('another_event', 'message');
      
      assert.strictEqual(spy.called, false);
    });
  
    it('ee should not call unsubscribed subscriber', () => {
      const spy = sinon.spy();
      const ee = new libs.EventEmitter();
    
      ee.on('event', spy);
      ee.off('event', spy);
      ee.emit('event', 'message');
    
      assert.strictEqual(spy.called, false);
    });
  
    it('ee should call subscriber just once', () => {
      const spy = sinon.spy();
      const ee = new libs.EventEmitter();
    
      ee.once('event', spy);
      ee.emit('event', 'message');
      ee.emit('event', 'message');
    
      assert.strictEqual(spy.calledOnce, true);
    });
  });
});