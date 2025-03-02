import { HashAlgorithm } from 'zpass-credential-signer';
export { HashAlgorithm } from 'zpass-credential-signer';
import { OfflineQuery } from '@provablehq/wasm';
import * as comlink from 'comlink';
export { expose } from 'comlink';
import * as mainnetSDK from '@provablehq/sdk/mainnet.js';
import * as testnetSDK from '@provablehq/sdk/testnet.js';

interface SDKOptions {
    privateKey: string;
    host?: string;
    network: 'mainnet' | 'testnet';
}
interface SignCredentialOptions {
    data: {
        [key: string]: string;
    };
    hashType: HashAlgorithm;
    privateKey?: string;
}
interface ProveOffChainOptions {
    localProgram: string;
    functionName: string;
    inputs: string[];
    offlineQuery?: OfflineQuery;
}
interface VerifyOnChainOptions {
    transactionId: string;
    url?: string;
    network: 'mainnet' | 'testnet';
}
interface VerifyOffChainOptions {
    execution: string;
    program: string;
    functionName: string;
    inputs?: string[];
    verifyingKey?: string;
    url?: string;
    network: 'mainnet' | 'testnet';
}
interface OnChainOptions {
    programName: string;
    functionName: string;
    privateFee: boolean;
    inputs: string[];
    fee: number;
    feeRecord?: string;
}

declare class SDKError extends Error {
    constructor(message: string);
}

interface CreateAleoWorkerOptions {
    url: string;
    baseUrl?: string;
}
declare const createAleoWorker: ({ url, baseUrl }: CreateAleoWorkerOptions) => comlink.Remote<unknown>;

type OutputJSON = mainnetSDK.OutputJSON | testnetSDK.OutputJSON;
declare class ZPassSDK {
    private programManager;
    private keyProvider;
    private recordProvider;
    private networkClient;
    private lastProgram;
    private network;
    private sdk;
    getSDKModules(): Promise<{
        Account: typeof mainnetSDK.Account | typeof testnetSDK.Account;
        OfflineQuery: typeof mainnetSDK.OfflineQuery | typeof testnetSDK.OfflineQuery;
        initThreadPool: typeof mainnetSDK.initThreadPool | typeof testnetSDK.initThreadPool;
    }>;
    constructor({ privateKey, host, network }: SDKOptions);
    getMerkleRoot(inputs: string[]): Promise<string>;
    getMerkleTree(inputs: string[]): Promise<string>;
    getMerkleProof(inputs: string[], index: number): Promise<string[]>;
    getLeavesHashes(inputs: string[]): Promise<string[]>;
    signMerkleRoot(root: string): Promise<string>;
    setNewHost(host: string): void;
    signCredential(options: SignCredentialOptions): Promise<{
        signature: string;
        hash: string;
    }>;
    issueZPass(options: OnChainOptions): Promise<string>;
    getZPassRecord(transactionId: string): Promise<string>;
    proveOnChain(options: OnChainOptions): Promise<string>;
    proveOffChain(options: ProveOffChainOptions): Promise<{
        outputs: string[];
        execution: string;
        verifyingKey: string;
    }>;
    static verifyOnChain(options: VerifyOnChainOptions): Promise<{
        hasExecution: boolean;
        outputs: mainnetSDK.OutputJSON[] | testnetSDK.OutputJSON[];
    }>;
    static verifyOffChain(options: VerifyOffChainOptions): Promise<boolean>;
    onChainInteract(options: OnChainOptions): Promise<string>;
}

export { type OnChainOptions, type OutputJSON, SDKError, type SDKOptions, type SignCredentialOptions, type VerifyOnChainOptions, ZPassSDK, createAleoWorker };
