import Hero from "@/ui/Hero/Hero";
import BaptismDetails from "@/ui/BaptismDetails/BaptismDetails";
import ReceptionDetails from "@/ui/ReceptionDetails/ReceptionDetails";

const HomePage = () => {
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

    </div>
  )
}

export default HomePage