import { useContractRead } from 'wagmi'
import { abi } from '../contracts/abis/bank';
import { helloabi } from '../contracts/abis/hello';
import { publicClient } from './client';

export default function ReadContract() {
  const {
    data: balance,
    status
  } = useContractRead(
    {
      address: '0x979a21D311CF64CE0589f77740B9BDF0F0502c5C',
      abi: abi,
      functionName: 'checkBalance',
    }
  );

  return (
    <>
      <div> {status} </div>
      <div onClick={async () => {
        const data = await publicClient.readContract({
          address: '0x2C52Afed8a1e80667dD9b3aDCE8A7Ce225069108',
          abi: helloabi,
          functionName: 'greet',
        })
        console.log(data);
        alert(data)
      }} > Click here to show Hello World alert from another contract Balance: {balance}</div>
    </>
  )
}