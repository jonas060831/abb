import { getRsvpById } from '@/app/(serverFunctions)/rsvp'
import RsvpForm from '@/ui/forms/RsvpForm/RsvpForm'

interface UpdateRsvpPageProps {
  params: Promise<{ rsvpId: string }>
}

const UpdateRsvpPage = async ({ params }: UpdateRsvpPageProps) => {

  const { rsvpId } = await params


  const rsvpData = await getRsvpById(rsvpId);
  
  if (!rsvpData) {
    return (
      <div className="container">
        <h1>RSVP Not Found</h1>
        <p>The RSVP you&apos;re looking for could not be found. Please check the URL and try again.</p>
      </div>
    );
  }


  return (
    <div className="container">
      <RsvpForm initialData={rsvpData} mode='update'/>
    </div>
  );
}

export default UpdateRsvpPage;