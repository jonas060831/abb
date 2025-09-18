
import EventReminder from '@/ui/EventReminder/EventReminder'
import NavBar from '@/ui/Navbar/NavBar'
import OwnerWidget from '@/ui/Widgets/OwnerWidget/OwnerWidget'


const DashboardPage = async () => {


 
  return (
    <div>
        <NavBar />
        <OwnerWidget />
        <br /><br /><br />
        <EventReminder />
    </div>
  )
}

export default DashboardPage