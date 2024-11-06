import React from 'react'

const aboutContent = [
    {
        id: 1,
        title: "Lorem Ipsum",
        content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi consectetur dicta adipisci a repellendus quae nulla? Blanditiis, cum. Quas, vitae."
    },
    {
        id: 2,
        title: "Our Mission",
        content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi consectetur dicta adipisci a repellendus quae nulla? Blanditiis, cum. Quas, vitae. "
    },
    {
        id: 3,
        title: "Our Vision",
        content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi consectetur dicta adipisci a repellendus quae nulla? Blanditiis, cum. Quas, vitae."
    },

]


function About() {
    return (
        <div>
            {/* __________ About Us ___________ */}
            <section>

                <div className="relative bg-cover bg-center h-[8vh] md:h-[14vh] " style={{ backgroundImage: "url('https://wallpaperboat.com/wp-content/uploads/2019/10/free-website-background-21.jpg')" }}>
                    <div className=" w-[60%] py-1 mx-auto text-center">
                        <h1 className="text-blue-900 heading-text-size md:text-5xl font-bold mb-5">About Us</h1>
                    </div>
                </div>

                <div className='bg-color mx-1 my-3 rounded shadow-sm '>
                    {
                        aboutContent.map(content => (
                            <div key={content.id}>
                                <p className='subheading-text-size font-semibold py-2 px-4 text-color'>{content.title}</p>
                                <p className='pb-4 px-4 body-text'>{content.content}</p>
                            </div>
                        ))
                    }
                </div>

            </section>

        </div>
    )
}

export default About