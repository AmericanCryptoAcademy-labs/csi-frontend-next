import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import Eventcard from '@/components/ShowCert/Eventcard'
import React from 'react'

function page() {
  return (
    <>
            <Breadcrumb pageName="My Certificates" />
            <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-2 gap-5 mt-5    ">
          {/* {
            arr.forEach((item)=><Eventcard name={item.gameName} time={item.gameTime} date={item.gameDate} />)
          } */}
          <Eventcard name="Solidity Devloper" thumbnail={"/images/sample/sample.jpg"} ></Eventcard>
          <Eventcard name="Blockchain Fund.." thumbnail={"/images/sample/sample.jpg"}></Eventcard>
          <Eventcard name="Data Mining" thumbnail={"/images/sample/sample.jpg"}></Eventcard>
          <Eventcard name="EasyCerts" thumbnail={"/images/sample/sample.jpg"}></Eventcard>
          <Eventcard name="Real Estate" thumbnail={"/images/sample/sample.jpg"} />
        </div>
            
        </>
  )
}

export default page