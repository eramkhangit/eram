import React from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'

const homeIcons = [
  {
    id: 1,
    icon: 'https://cloudehealthcare.com/wp-content/uploads/2023/03/Schedule-Appointment.png',
    title: "Book Appointment"
  },
  {
    id: 2,
    icon: 'https://cloudehealthcare.com/wp-content/uploads/2023/03/order.png',
    title: "Order Medicines & surgical Items"
  },
  {
    id: 3,
    icon: 'https://cloudehealthcare.com/wp-content/uploads/2023/03/px-noun-patient.webp',
    title: "Pathology Test"
  },
  {
    id: 4,
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAlqw7E-0GgEZHhHVm-ySUghuLK3TnLcLwLg&s',
    title: "Donate Medicines"
  },
  {
    id: 5,
    icon: 'https://static.vecteezy.com/system/resources/thumbnails/017/177/954/small/round-medical-cross-symbol-on-transparent-background-free-png.png',
    title: "Our Services"
  },
  {
    id: 6,
    icon: 'https://static.vecteezy.com/system/resources/thumbnails/016/637/887/small/heartbeat-heart-beat-pulse-flat-png.png',
    title: "Health Plans"
  },
  {
    id: 7,
    icon: 'https://static.vecteezy.com/system/resources/thumbnails/017/177/954/small/round-medical-cross-symbol-on-transparent-background-free-png.png',
    title: "Our Services"
  },
  {
    id: 8,
    icon: 'https://static.vecteezy.com/system/resources/thumbnails/016/637/887/small/heartbeat-heart-beat-pulse-flat-png.png',
    title: "Health Plans"
  }

]

function Home() {
  const navigate = useNavigate()

  const bookAppointmentPage = () => {
    navigate('/bookAppointmentPage')
  }

  return (
    <div className='mb-[85px]'>

      <section className='container mx-auto'>
        <div className='w-[100%] h-[14vh] my-3 md:h-[20vh]'>
          <img src="https://th.bing.com/th/id/OIP.me8yjvts5fRV3famDGj7qQHaEE?w=1200&h=660&rs=1&pid=ImgDetMain" className=' w-[100%] object-cover h-[100%]' alt="" />
        </div>
      </section>

      <section className='bg-home-image mx-2 h-[19rem] flex items-center justify-center'>

        <div className='px-4 py-10 md:w-[40%] text-center'>
          <p className='heading-text-size md:text-4xl text-white font-semibold md:font-bold'>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
          <p className=' md:py-4 font-semibold text-slate-200'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae nobis alias quia velit similique earum, veritatis sequi aut accusamus molestias!</p>
        </div>

      </section >

      <section>

        <div className='pt-4 px-6 flex justify-between md:justify-center md:gap-8'>

          <button className="blinking-button shadow-md w-[40%] md:w-[20%]"   >
            Services
          </button>

          <button className="blinking-button shadow-md w-[40%] md:w-[20%] "  >
            Offers
          </button>

        </div>

      </section>

      <section className=' flex flex-row flex-wrap items-center justify-center pb-3 pt-5 gap-4'>

        {

          homeIcons.map((item) => (

            <div key={item.id} className='hover:bg-[#C1E1C1] flex flex-col justify-center items-center gap-2 w-[40%] md:w-[16%] h-[7rem] md:h-[34vh] bg-slate-100 px-4 md:pt-4 py-2  rounded border-[1px] '>

              <div className='w-[50%] md:w-[80%] h-[8vh] md:h-[20vh] '>
                <img src={item.icon} alt="" className='md:h-[19vh] md:w-[100%]' />
              </div>

              <p className='text-slate-700 font-semibold h-[4vh] text-[12px] md:text-[14px] '>{item.title}</p>

            </div>

          ))

        }

      </section>

      <section className=' md:w-[60%] mx-auto'>

        <div className='mx-4 p-4 rounded bg-slate-100'>

          <p className='text-xl font-bold text-red-600'>Offers</p>
          <p className='px-2 text-md font-semibold py-3 text-blue-700'>Lorem ipsum dolor sit amet</p>

          <ul className='px-5 text-slate-600 list-disc '>

            <li className='pb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit consequatur!</li>
            <li className='pb-2'>Lorem ipsum dolor sit ametperspiciatis aliquam facilis.</li>
            <li className='pb-2'>Lorem ipsum dolor sit amet </li>
            <li className='pb-2'>Lorem ipsum dolor sit amet ab illo recusandae totam.</li>

          </ul>

        </div>

      </section>

      <section className=' mb-[80px] mt-3 md:mt-[40px] md:w-[60%] mx-auto' >
        <div className='mx-4 p-4 rounded bg-slate-100'>
          <p className='text-xl font-bold text-red-600 pb-4'>Important Links!</p>
          <ul className='px-5  list-disc '>
            <li className='pb-2'>
              <Link className='text-blue-700'>https://lfsdlf/sdfhdlf.com</Link>
            </li>
            <li className='pb-2 '><Link className='text-blue-700'>https://lfsdlf/sdfhdlf.com</Link></li>
            <li className='pb-2'><Link className='text-blue-700'>https://lfsdlf/sdfhdlf.com</Link></li>
            <li className='pb-2'><Link className='text-blue-700'>https://lfsdlf/sdfhdlf.com</Link></li>
          </ul>
        </div>
      </section>

    </div >
  )
}

export default Home