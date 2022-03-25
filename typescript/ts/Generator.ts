class Generator {
    private _strategy!: IGeneratorStrategy;
    public setStrategy(strategy: IGeneratorStrategy){
        this._strategy = strategy;
    }
    public execute(id: number, generator: Generator){
        return this._strategy.execute(id, generator);
    }
    public calculateMD5Hash(input: string): string {
        const md5: string = MD5(input);
        return md5;
    }
}

interface IGeneratorStrategy {
    execute: (id: number, generator: Generator) => string;
}

export class GoldGenerator implements IGeneratorStrategy {
    execute = (id: number, generator: Generator): string => {
        return generator.calculateMD5Hash("Gold-" + id);
    };
}
export class SilverGenerator implements IGeneratorStrategy {
    execute = (id: number, generator: Generator): string => {
        return generator.calculateMD5Hash("Silver-" + id);
    };
}
export class BronzeGenerator implements IGeneratorStrategy {
    execute = (id: number, generator: Generator): string => {
        return generator.calculateMD5Hash("Bronze-" + id);
    };
}

export default Generator;
