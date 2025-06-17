import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Container } from '@react-email/container';
import { Tailwind } from '@react-email/tailwind';
import { Button } from '@react-email/button';

type RsvpOwnerNotificationProps = {
  eventOwnerName: string;
  guestName: string;
  guestEmail: string;
  guestCount: number;
  rsvpTime: string;
  dashboardUrl: string;
  platformName?: string;
};

export default function RsvpOwnerNotificationEmail({
  eventOwnerName = 'Event Owner',
  guestName = 'Jane Doe',
  guestEmail = 'jane@example.com',
  guestCount = 2,
  rsvpTime = 'June 17, 2025, 10:00 AM',
  dashboardUrl = 'https://master.d3hyynhxomne9o.amplifyapp.com/owner/dashboard',
  platformName = 'System Generated',
}: RsvpOwnerNotificationProps) {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Raleway:wght@700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .font-body {
            font-family: 'Lato', sans-serif;
          }
          .font-heading {
            font-family: 'Raleway', sans-serif;
          }
        `}</style>
      </Head>
      <Tailwind>
        <Container className="bg-[#ffffff] p-6 rounded-xl shadow-lg border-2 border-[#ff4081] text-black font-body">
          <Section>
            <Text className="text-2xl font-heading font-bold text-[#ff4081] mb-3">
              ✅ New RSVP Confirmed!
            </Text>

            <Text className="text-base text-black">
              Hi <span className="font-semibold">{eventOwnerName}</span>,
            </Text>

            <Text className="text-base leading-6 mt-2 text-black">
              Great news! A guest just confirmed their attendance to your event.
            </Text>

            <Text className="mt-4 text-base text-black">
              <strong>Guest Name:</strong> {guestName}<br />
              <strong>Email:</strong> {guestEmail}<br />
              <strong>Number of Guests:</strong> {guestCount}<br />
              <strong>RSVP Time:</strong> {rsvpTime}
            </Text>

            <Text className="text-base leading-6 mt-6 text-black">
              Your event is gaining momentum — this is one more step toward an unforgettable experience. 🎉
            </Text>

            <Text className="text-base leading-6 mt-4 text-black">
              You can view more details or manage your guest list from your event dashboard:
            </Text>

            <Button
              href={dashboardUrl}
              className="mt-4 bg-[#ff4081] text-white text-sm font-bold py-2 px-4 rounded-md inline-block"
            >
              Click Here to View Dashboard
            </Button>

            <Text className="text-sm text-[#a8a8a8] mt-8">
              — {platformName}
            </Text>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  );
}
