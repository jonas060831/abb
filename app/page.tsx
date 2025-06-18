import Hero from "@/ui/Hero/Hero";
import BaptismDetails from "@/ui/BaptismDetails/BaptismDetails";
import ReceptionDetails from "@/ui/ReceptionDetails/ReceptionDetails";
import ImageCarousel from "@/ui/Carousels/ImageCarousel";

const HomePage = () => {

  const imagesData = [
    '/medias/images/photogallery/1.jpg',
    '/medias/images/photogallery/2.jpg',
    '/medias/images/photogallery/3.jpg',
    '/medias/images/photogallery/4.jpg',
    '/medias/images/photogallery/5.jpg',
    '/medias/images/photogallery/6.jpg',
    '/medias/images/photogallery/7.jpg',
    '/medias/images/photogallery/8.jpg',
  ]

  return (
    <div
     className="snap_container"
    >
      <section className="section">
        <Hero />
      </section>

      <section className="section">
        <BaptismDetails />
      </section>

      <section className="section">
        <ReceptionDetails />
      </section>

      <section className="section">
        {/* TODO Carousel*/}
        <ImageCarousel images={imagesData}/>
      </section>

    </div>
  )
}

export default HomePage