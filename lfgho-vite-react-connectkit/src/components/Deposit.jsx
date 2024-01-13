import React from 'react';
import {
    useContractRead,
    useContractWrite,
} from 'wagmi';
import { abi } from '../contracts/abis/bank';

export function MintNFT() {

    const {
        data: balance,
        isSuccess: isBSuccess,
    } = useContractRead(
        {
            address: '0x979a21D311CF64CE0589f77740B9BDF0F0502c5C',
            abi: abi,
            functionName: 'checkBalance',
        }
    );


    const {
        data: Ddata,
        isLoading: isDConfirming,
        isSuccess: isDConfirmed,
        error: Derror,
        writeAsync: depositContract
    } = useContractWrite(
        {
            address: '0x979a21D311CF64CE0589f77740B9BDF0F0502c5C',
            abi: abi,
            functionName: 'deposit',
        }
    );


    async function deposit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const amount = formData.get('dvalue');

        depositContract?.({
            value: BigInt(amount * (10 ** 18)),
        });
    }

    const {
        data: Wdata,
        isLoading: isWConfirming,
        isSuccess: isWConfirmed,
        error: Werror,
        writeAsync: withdrawContract
    } = useContractWrite(
        {
            address: '0x979a21D311CF64CE0589f77740B9BDF0F0502c5C',
            abi: abi,
            functionName: 'withdraw',
        }
    );

    async function withdraw(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const amount = formData.get('wvalue');

        withdrawContract?.({
            args: [BigInt(amount * (10 ** 18))]
        });
    }

    return (
        <>
            <div>
                {isBSuccess ? "Bank Balance" : ""} {balance[0]}
            </div>
            <form onSubmit={deposit}>
                <input name="dvalue" placeholder="0.05" required />
                <button
                    disabled={isDConfirming}
                    type="submit"
                >
                    {isDConfirming ? 'Confirming...' : 'Deposit'}
                </button>
                {Ddata && <div>Transaction Hash: {Ddata.hash}</div>}
                {isDConfirming && <div>Waiting for confirmation...</div>}
                {isDConfirmed && <div>Transaction confirmed.</div>}
                {Derror && (
                    <div>Error: {Derror.shortMessage || Derror.message}</div>
                )}
            </form>

            <form onSubmit={withdraw}>
                <input name="wvalue" placeholder="0.05" required />
                <button
                    disabled={isWConfirming}
                    type="submit"
                >
                    {isWConfirming ? 'Confirming...' : 'Withdraw'}
                </button>
                {Wdata && <div>Transaction Hash: {Wdata.hash}</div>}
                {isWConfirming && <div>Waiting for confirmation...</div>}
                {isWConfirmed && <div>Transaction confirmed.</div>}
                {Werror && (
                    <div>Error: {Werror.shortMessage || Werror.message}</div>
                )}
            </form>
        </>
    );
}
