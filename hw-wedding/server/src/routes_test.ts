import * as httpMocks from 'node-mocks-http';
import { add, load, names, resetForTesting } from './routes';
import * as assert from 'assert';


describe('routes', function() {
  it('add', function() {
    resetForTesting();
    
     // First branch, straight-line code
     const req1 = httpMocks.createRequest(
      {method: 'POST', url: '/add', body: {}}); 
    const res1 = httpMocks.createResponse();
    add(req1, res1);

    assert.deepStrictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(), 'missing "guest" parameter');

     // First branch, straight-line code
     const req2 = httpMocks.createRequest(
      {method: 'POST', url: '/add', body: {not_guest: "guest missing still"}}); 
    const res2 = httpMocks.createResponse();
    add(req2, res2);

    assert.deepStrictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(), 'missing "guest" parameter');

     // Second branch, straight-line code
     const req3 = httpMocks.createRequest(
      {method: 'POST', url: '/add', body: {guest: "here!"}}); 
    const res3 = httpMocks.createResponse();
    add(req3, res3);

    assert.deepStrictEqual(res3._getStatusCode(), 400);
    assert.deepStrictEqual(res3._getData(), 'missing "name" parameter');

     // Second branch, straight-line code
     const req4 = httpMocks.createRequest(
      {method: 'POST', url: '/add', body: {guest: "here!", not_name: ":("}}); 
    const res4 = httpMocks.createResponse();
    add(req4, res4);

    assert.deepStrictEqual(res4._getStatusCode(), 400);
    assert.deepStrictEqual(res4._getData(), 'missing "name" parameter');

     // Third branch, straight-line code
     const req5 = httpMocks.createRequest(
      {method: 'POST', url: '/add', body: {guest: "here!", name: "here as well!"}}); 
    const res5 = httpMocks.createResponse();
    add(req5, res5);

    assert.deepStrictEqual(res5._getStatusCode(), 200);
    assert.deepStrictEqual(res5._getData(), {saved: true});

     // Third branch, straight-line code
     const req6 = httpMocks.createRequest(
      {method: 'POST', url: '/add', body: {guest: "LEAGUE OF LEGENDS! RAHHH!", name: "I am okay"}}); 
    const res6 = httpMocks.createResponse();
    add(req6, res6);

    assert.deepStrictEqual(res6._getStatusCode(), 200);
    assert.deepStrictEqual(res6._getData(), {saved: true});

    resetForTesting();
  });
  
  it('load', function() {
    resetForTesting();

    // First branch, straight-line code
    const req1 = httpMocks.createRequest(
      {method: 'GET', url: '/load', query: {}}); 
    const res1 = httpMocks.createResponse();
    load(req1, res1);

    assert.deepStrictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(), 'missing "name" parameter');

    // First branch, straight-line code
    const req2 = httpMocks.createRequest(
      {method: 'GET', url: '/load', query: {not_name: "not name"}}); 
    const res2 = httpMocks.createResponse();
    load(req2, res2);

    assert.deepStrictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(), 'missing "name" parameter');

    // Second branch, straight-line code
    const req3 = httpMocks.createRequest(
      {method: 'GET', url: '/load', query: {name: "not in map"}}); 
    const res3 = httpMocks.createResponse();
    load(req3, res3);

    assert.deepStrictEqual(res3._getStatusCode(), 404);
    assert.deepStrictEqual(res3._getData(), 'no associated guest with provided "name"');

    // Second branch, straight-line code
    const req4 = httpMocks.createRequest(
      {method: 'GET', url: '/load', query: {name: "still not in map"}}); 
    const res4 = httpMocks.createResponse();
    load(req4, res4);

    assert.deepStrictEqual(res4._getStatusCode(), 404);
    assert.deepStrictEqual(res4._getData(), 'no associated guest with provided "name"');

      const add1 = httpMocks.createRequest(
        {method: 'POST', url: '/add', body: {guest: "LEAGUE OF LEGENDS! RAHHH!", name: "I am okay"}}); 
      const addres1 = httpMocks.createResponse();
      add(add1, addres1);

    // Third branch, straight-line code
    const req5 = httpMocks.createRequest(
      {method: 'GET', url: '/load', query: {name: "I am okay"}}); 
    const res5 = httpMocks.createResponse();
    load(req5, res5);

    assert.deepStrictEqual(res5._getStatusCode(), 200);
    assert.deepStrictEqual(res5._getData(), {guest: "LEAGUE OF LEGENDS! RAHHH!", name: "I am okay"});

    const add2 = httpMocks.createRequest(
      {method: 'POST', url: '/add', body: {guest: "very epico", name: "Davis Yang"}}); 
    const addres2 = httpMocks.createResponse();
    add(add2, addres2);

  // Third branch, straight-line code
  const req6 = httpMocks.createRequest(
    {method: 'GET', url: '/load', query: {name: "Davis Yang"}}); 
  const res6 = httpMocks.createResponse();
  load(req6, res6);

  assert.deepStrictEqual(res6._getStatusCode(), 200);
  assert.deepStrictEqual(res6._getData(), {guest: "very epico", name: "Davis Yang"});
  });

  it('load', function() {
    resetForTesting();

    // Straight-line code (map is empty)
    const req1 = httpMocks.createRequest(
      {method: 'GET', url: '/names', query: {}}); 
    const res1 = httpMocks.createResponse();
    names(req1, res1);

    assert.deepStrictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), {guests: [], names: []});

      const add2 = httpMocks.createRequest(
        {method: 'POST', url: '/add', body: {guest: "very epico", name: "Davis Yang"}}); 
      const addres2 = httpMocks.createResponse();
      add(add2, addres2);

    // Straight-line code (stuff in map)
    const req2 = httpMocks.createRequest(
      {method: 'GET', url: '/names', query: {}}); 
    const res2 = httpMocks.createResponse();
    names(req2, res2);
    
    assert.deepStrictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData(), {guests: ["very epico"], names: ["Davis Yang"]});
  });
});
