const proxyquire = require('proxyquire');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

const { expect } = chai;

chai.use(sinonChai);

const sandbox = sinon.createSandbox();

const namespace = {
    store: new Map(),
    active: undefined,
    get(key) {
        return this.store.get(key);
    },
    set(key, value) {
        return this.store.set(key, value);
    },
    run(callback) {
        this.active = this;
        callback();
    }
}

const createNamespace = sandbox.stub().returns(namespace);

const getFastAlsImportWith = (asyncLocalStorage) => {
    return proxyquire.load('../cls-facade.js', {
        'cls-hooked': {
            createNamespace
        }
    });
};

describe('fast-als tests', () => {
  let getStub;
  let setStub;
  let runStub;
  beforeEach(() => {
      sandbox.restore();
      getStub = sandbox.stub(namespace, 'get').callThrough();
      setStub = sandbox.stub(namespace, 'set').callThrough();
      runStub = sandbox.stub(namespace, 'run').callThrough();
  });

  describe('When on Node 12 and lower', () => {
    const asyncLocalStorage = undefined;

    let fastAls;

    beforeEach(() => {
        fastAls = getFastAlsImportWith(asyncLocalStorage);
    });
    describe('and set is called without running in context', () => {
        beforeEach(() => {
            fastAls.set('key', 'value');
        });

        it('then get returns undefined', () => {
            expect(fastAls.get('key')).to.be.undefined;
        });

        it('then namespace.get is never called', () => {
            expect(namespace.get).not.to.have.been.called;
        });

        it('then namespace.set is never called', () => {
            expect(namespace.set).not.to.have.been.called;
        });
    });

    describe('and defaults are used when running a context', () => {
        it('then the get returns the correct information', (done) => {
            fastAls.runWith({ key: 'value' }, () => {
                expect(fastAls.get('key')).to.equal('value');
                done();
            });
        });
    })
    describe('and set is called within context', () => {
        it('then the get returns the correct information', (done) => {
            fastAls.runWith({}, () => {
                fastAls.set('key', 'value');
                expect(fastAls.get('key')).to.equal('value');
                done();
            });
        });
    });

  });
});