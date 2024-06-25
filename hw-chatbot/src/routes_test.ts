import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { chat, save, load, resetTranscriptsForTesting } from './routes';


describe('routes', function() {

  it('chat', function() {
    // First branch, straight line code, error case (only one possible input)
    const req1 = httpMocks.createRequest({method: 'GET', url: '/',
    query: {}});
    const res1 = httpMocks.createResponse();
    chat(req1, res1);
  
    assert.deepStrictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(),
        'required argument "message" was missing');

    // Second branch, straight line code
    const req2 = httpMocks.createRequest({method: 'GET', url: '/',
        query: {message: "I hate computers."}});
    const res2 = httpMocks.createResponse();
    chat(req2, res2);

    assert.deepStrictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData(),
        {response: "Do computers worry you?"});

    const req3 = httpMocks.createRequest({method: 'GET', url: '/',
    query: {message: "Are you alive"}});
    const res3 = httpMocks.createResponse();
    chat(req3, res3);

    assert.deepStrictEqual(res3._getStatusCode(), 200);
    assert.deepStrictEqual(res3._getData(),
        {response: "Why are you interested in whether I am alive or not?"});

  });

  it('save', function() {
    // First branch, straight line code, error case
    const req = httpMocks.createRequest(
        {method: 'POST', url: '/save', body: {name: 1086, value: "some stuff"}});
    const res = httpMocks.createResponse();
    save(req, res);

    assert.deepStrictEqual(res._getStatusCode(), 400);
    assert.deepStrictEqual(res._getData(),
        'required argument "name" was missing');

    const req1 = httpMocks.createRequest(
        {method: 'POST', url: '/save', body: {value: "some stuff"}});
    const res1 = httpMocks.createResponse();
    save(req1, res1);

    assert.deepStrictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(),
        'required argument "name" was missing');

    // Second branch, straight line code, error case
    const req2 = httpMocks.createRequest(
        {method: 'POST', url: '/save', body: {name: "A"}});
    const res2 = httpMocks.createResponse();
    save(req2, res2);

    assert.deepStrictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(),
        'required argument "value" was missing');

    const req3 = httpMocks.createRequest(
        {method: 'POST', url: '/save', body: {name: "L"}});
    const res3 = httpMocks.createResponse();
    save(req3, res3);
    
    assert.deepStrictEqual(res3._getStatusCode(), 400);
    assert.deepStrictEqual(res3._getData(),
        'required argument "value" was missing');

    // Third branch, straight line code

    const req4 = httpMocks.createRequest({method: 'POST', url: '/save',
        body: {name: "A", value: "some stuff"}});
    const res4 = httpMocks.createResponse();
    save(req4, res4);

    assert.deepStrictEqual(res4._getStatusCode(), 200);
    assert.deepStrictEqual(res4._getData(), {replaced: false});

    const req5 = httpMocks.createRequest({method: 'POST', url: '/save',
        body: {name: "A", value: "different stuff"}});
    const res5 = httpMocks.createResponse();
    save(req5, res5);

    assert.deepStrictEqual(res5._getStatusCode(), 200);
    assert.deepStrictEqual(res5._getData(), {replaced: true});

    // Called to clear all saved transcripts created in this test
    //    to not effect future tests
    resetTranscriptsForTesting();
  });

  it('load', function() {
    // Example test:
    // First need to save something in order to load it
    const saveReq = httpMocks.createRequest({method: 'POST', url: '/save',
        body: {name: "key", value: "transcript value"}});
    const saveResp = httpMocks.createResponse();
    save(saveReq, saveResp);
    // Now we can actually (mock a) request to load the transcript
    const loadReq = httpMocks.createRequest(
        {method: 'GET', url: '/load', query: {name: "key"}});
    const loadRes = httpMocks.createResponse();
    load(loadReq, loadRes);
    // Validate that both the status code and the output is as expected
    assert.deepStrictEqual(loadRes._getStatusCode(), 200);
    assert.deepStrictEqual(loadRes._getData(), {value: "transcript value"});

    // TODO (5c): write tests for load
    //  - note that you will need to make requests to 'save' in order for there
    //    to be transcripts for load to retrieve (see example below)
    // - You should write tests using our usual branching heuristics (including
    //   all error case branches)
    
    // First Error (name undefined), straight line
    const badLoadReq1 = httpMocks.createRequest(
        {method: 'GET', url: '/load', query: {}});
    const loadRes2 = httpMocks.createResponse();
    load(badLoadReq1, loadRes2);
    assert.deepStrictEqual(loadRes2._getStatusCode(), 400);

    // First Error (name undefined), straight line
    const badLoadReq2 = httpMocks.createRequest(
        {method: 'GET', url: '/load', query: {notname: "this parameter is not name"}});
    const loadRes3 = httpMocks.createResponse();
    load(badLoadReq2, loadRes3);
    assert.deepStrictEqual(loadRes3._getStatusCode(), 400);

    // Second Error (name is not a key), straight line
    const nameNotKey1 = httpMocks.createRequest(
        {method: 'GET', url: '/load', query: {name: "Buff Ability Power Varus"}});
    const loadRes4 = httpMocks.createResponse();
    load(nameNotKey1, loadRes4);
    assert.deepStrictEqual(loadRes4._getStatusCode(), 404);

    // Second Error (name is not a key), straight line
    const nameNotKey2 = httpMocks.createRequest(
        {method: 'GET', url: '/load', query: {name: "Buff Tank Ashe Top"}});
    const loadRes5 = httpMocks.createResponse();
    load(nameNotKey2, loadRes5);
    assert.deepStrictEqual(loadRes5._getStatusCode(), 404);

    // Straight line (no error)
    const nameKey1 = httpMocks.createRequest(
        {method: 'GET', url: '/load', query: {name: "key"}});
    const loadRes6 = httpMocks.createResponse();
    load(nameKey1, loadRes6);
    assert.deepStrictEqual(loadRes6._getStatusCode(), 200);
    assert.deepStrictEqual(loadRes6._getData(), {value: "transcript value"});

    // Straight line (no error)
    const saveReq2 = httpMocks.createRequest({method: 'POST', url: '/save',
        body: {name: "this key is different", value: "this value is also different"}});
    const saveResp2 = httpMocks.createResponse();
    save(saveReq2, saveResp2);
    const nameKey2 = httpMocks.createRequest(
        {method: 'GET', url: '/load', query: {name: "this key is different"}});
    const loadRes7 = httpMocks.createResponse();
    load(nameKey2, loadRes7);
    assert.deepStrictEqual(loadRes7._getStatusCode(), 200);
    assert.deepStrictEqual(loadRes7._getData(), {value: "this value is also different"});


    // Called to clear all saved transcripts created in this test
    //    to not effect future tests
    resetTranscriptsForTesting();
  });

});
