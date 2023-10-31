import { MockModelProvider } from "./mock_modelprovider";
import { ModelManager } from '../src/manager';

class A{
  Str: string
  constructor(s: string) {
    this.Str = s
  }
}

class B{
  a: A
  constructor(a: A) {
    this.a = a
  }
}
class C{
  a: A
  constructor(a: A) {
    this.a = a
  }
}

describe('manager', () => {
    // it('1 model provider', async () => {
    //     const mp = new MockModelProvider("a", "b");
    //     const manager = await ModelManager.createManager(mp);
    //     let model = await manager.loadModel("a");
    //     expect(model.dataId).toBe("a");
    //     expect(model.alias).toBe("b");
    // });
    it("???", () => {
        const a = new A("qqq")
        const b = new B(a)
        const c = new C(a)

      b.a.Str = "ppp"
      check()
      check({c:"ccc"})
      check({p:"i am p"})
      console.log(c.a.Str)
    })
});

function check(cfg? : any){
  console.log(cfg?.p?? "No str")
}
