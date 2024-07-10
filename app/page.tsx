import Link from "next/link";

export default function Home() {
    return (
        <div>


            <div className="flex flex-col items-center">
                <div className="w-[376px] flex flex-col items-center mt-[96px]">
                    <div className='text-blue-800 font-extrabold text-xxl'>
                        Hi, Taylor
                    </div>
                    <div className='text-dark-700 mt-[16px]'>
                        You have 8 medical bills ready from ABC Health System.
                        You can pay your bills here or verify your identity to
                        view full bill details.
                    </div>
                </div>
                <div className='bg-white mt-[48px] w-full flex justify-center'>
                    <div className='w-[376px]'>
                        <div className="flex flex-row justify-between  mt-[32px]">
                            <div className='text-gray-500'> Total due</div>
                            <div className='text-blue-800'> $800</div>
                        </div>
                        <Link href='/billingDetails'
                              className="flex mt-[24px] justify-center flex-grow bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                        >
                            Pay total

                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
