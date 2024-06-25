import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { names, load, save, resetForTesting } from './routes';


describe('routes', function() {

  it('save', function() {
    resetForTesting();

    // First branch, straight-line code
    const req6 = httpMocks.createRequest(
      {method: 'POST', url: '/save', body: {}}); 
    const res6 = httpMocks.createResponse();
    save(req6, res6);

    assert.deepStrictEqual(res6._getStatusCode(), 400);
    assert.deepStrictEqual(res6._getData(), 'missing "content" parameter');

    // First branch, straight-line code
    const req5 = httpMocks.createRequest(
      {method: 'POST', url: '/save', body: {name: "Davis Yang"}}); 
    const res5 = httpMocks.createResponse();
    save(req5, res5);

    assert.deepStrictEqual(res5._getStatusCode(), 400);
    assert.deepStrictEqual(res5._getData(), 'missing "content" parameter');

    // Second branch, straight-line code
    const req4 = httpMocks.createRequest(
      {method: 'POST', url: '/save', body: {content: "hello worldians"}}); 
    const res4 = httpMocks.createResponse();
    save(req4, res4);

    assert.deepStrictEqual(res4._getStatusCode(), 400);
    assert.deepStrictEqual(res4._getData(), 'missing "name" parameter');

    // Second branch, straight-line code
    const req3 = httpMocks.createRequest(
      {method: 'POST', url: '/save', body: {content: "How much wood could a woodchuck chuck..."}}); 
    const res3 = httpMocks.createResponse();
    save(req3, res3);

    assert.deepStrictEqual(res3._getStatusCode(), 400);
    assert.deepStrictEqual(res3._getData(), 'missing "name" parameter');

    // Third/last branch, straight-line code
    const req1 = httpMocks.createRequest(
        {method: 'POST', url: '/save', body: {name: 'Zach', content: "SAVE THIS PLEASE!!"}}); 
    const res1 = httpMocks.createResponse();
    save(req1, res1);

    assert.deepStrictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), {saved: true});

    // Third/last branch, straight-line code
    const req2 = httpMocks.createRequest(
      {method: 'POST', url: '/save', body: {name: 'top lane?', content: "What does Rage Split mean"}}); 
    const res2 = httpMocks.createResponse();
    save(req2, res2);

    assert.deepStrictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData(), {saved: true});

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
      {method: 'GET', url: '/load', query: {randomParam: "HEY THERE"}}); 
    const res2 = httpMocks.createResponse();
    load(req2, res2);

    assert.deepStrictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(), 'missing "name" parameter');

    // Second branch, straight-line code
    const req3 = httpMocks.createRequest(
      {method: 'GET', url: '/load', query: {name: "THIS NAME IS NOT SAVED! OH NO!"}}); 
    const res3 = httpMocks.createResponse();
    load(req3, res3);

    assert.deepStrictEqual(res3._getStatusCode(), 404);
    assert.deepStrictEqual(res3._getData(), 'no associated content with provided "name"');
    
        const sreq = httpMocks.createRequest(
          {method: 'POST', url: '/save', body: {name: "Davis Yang", content: "very epico"}}); 
        const sres = httpMocks.createResponse();
        save(sreq, sres);

    // Second branch, straight-line code
    const req4 = httpMocks.createRequest(
      {method: 'GET', url: '/load', query: {name: "NOT IN MAP!"}}); 
    const res4 = httpMocks.createResponse();
    load(req4, res4);

    assert.deepStrictEqual(res4._getStatusCode(), 404);
    assert.deepStrictEqual(res4._getData(), 'no associated content with provided "name"');

    // Third/last branch, straight-line code
    const req5 = httpMocks.createRequest(
      {method: 'GET', url: '/load', query: {name: "Davis Yang"}}); 
    const res5 = httpMocks.createResponse();
    load(req5, res5);

    assert.deepStrictEqual(res5._getStatusCode(), 200);
    assert.deepStrictEqual(res5._getData(), {content: "very epico", name: "Davis Yang"});
    
        const sreq2 = httpMocks.createRequest(
          {method: 'POST', url: '/save', body: {name: "gumayusi", content: "even more epico"}}); 
        const sres2 = httpMocks.createResponse();
        save(sreq2, sres2);

    // Third/last branch, straight-line code
    const req6 = httpMocks.createRequest(
      {method: 'GET', url: '/load', query: {name: "gumayusi"}}); 
    const res6 = httpMocks.createResponse();
    load(req6, res6);

    assert.deepStrictEqual(res6._getStatusCode(), 200);
    assert.deepStrictEqual(res6._getData(), {content: "even more epico", name: "gumayusi"});

    resetForTesting();
  });

  // After you know what to do, feel free to delete this Dummy test
  it('names', function() {
    resetForTesting();

    // Straight-line code
    const req1 = httpMocks.createRequest(
      {method: 'GET', url: '/names', query: {}}); 
    const res1 = httpMocks.createResponse();
    names(req1, res1);

    assert.deepStrictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), {names: []});

    const req4 = httpMocks.createRequest(
      {method: 'POST', url: '/save', body: {name: "this name", content: "hello worldians"}}); 
    const res4 = httpMocks.createResponse();
    save(req4, res4);

    const req2 = httpMocks.createRequest(
      {method: 'GET', url: '/names', query: {}}); 
    const res2 = httpMocks.createResponse();
    names(req2, res2);

    assert.deepStrictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData(), {names: ["this name"]});

    resetForTesting();
  });
});
