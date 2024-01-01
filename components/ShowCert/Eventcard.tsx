import React from 'react'
import sample from '../images/sampleCert/sample.jpg'
import Image from 'next/image';

export type cardType = {
    name: string,
    thumbnail: any
}

function Eventcard(props: cardType) {

    var name = props.name;
    // console.log(thumbnail);
    return (
        <div className='dark:bg-[#24313e] bg-graydark mx-1 rounded-lg p-6  mb-3'>
            <div className='w-full bg-stone-900 min-h-28 rounded-lg '>
                <Image
                    src={props.thumbnail} 
                    alt="Description of image" 
                    width={500}  
                    height={300} 
                    layout="responsive" 
                />
            </div>
            <div className='mt-5 flex justify-between px-'>
                <p className='text-center text-white text-xl font-semibold mb-2.5 '>{name}</p>
                <p className='text-center text-meta-6 text-xl mb-2.5 '>12/03/2023</p>
            </div>

            {/* <p className='text-center  text-white'>Date: {date}</p> */}
            {/* <p className='text-center text-neutral-300 mb-1.5'>Time: {time}</p> */}


            {/* <Link to={"/tournaments/"+gid}> */}
            <button className='bg-primary dark:bg-primary text-white w-full px-3 py-2 bg-amber-500 rounded-md font-semibold '>View More</button>
            {/* </Link> */}
        </div>
    )
}

export default Eventcard