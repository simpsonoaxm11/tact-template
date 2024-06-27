import "@stdlib/deploy";

message Add {
    amount: Int as uint32;
}


//执行 yarn build 后你会发现output下面多了很多的文件 .pkg是连接合约要用的(类似于evm里面的abi) .fc是tact转换为的func源码 .ts是你在脚本里面要用到合约本身的时候导入用到的 
contract SampleTactContract with Deployable {

    owner: Address;
    counter: Int as uint32;

    init(owner: Address) {
        self.owner = owner;
        self.counter = 0;
    }

    fun add(v: Int) {
        
        // Check sender
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        
        // Update counter
        self.counter = (self.counter + v);
    }

    receive(msg: Add) {
        self.add(msg.amount);
    }

    receive("increment") {
        self.add(1);
        self.reply("incremented".asComment());
    }

    get fun counter(): Int {
        return self.counter;
    }
}