import * as React from 'react'
import {
    useSendTransaction,
} from 'wagmi'
import { parseEther } from 'viem'

export function SendTransaction() {

    const {
        data: data,
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        error: error,
        sendTransactionAsync: sendTransaction
    } = useSendTransaction()

    async function submit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const to = formData.get('address')
        const value = formData.get('value')

        sendTransaction({ to, value: parseEther(value) })
    }

    return (
        <form onSubmit={submit}>
            <input name="address" placeholder="0xA0Cf…251e" required />
            <input name="value" placeholder="0.05" required />
            <button
                disabled={isConfirming}
                type="submit"
            >
                {isConfirming ? 'Confirming...' : 'Send'}
            </button>
            {data && <div>Transaction Hash: {data.hash}</div>}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
            {error && (
                <div>Error: {(error).shortMessage || error.message}</div>
            )}
        </form>
    )
}