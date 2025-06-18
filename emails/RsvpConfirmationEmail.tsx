import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Container } from '@react-email/container';
import { Tailwind } from '@react-email/tailwind';

type RsvpConfirmationEmailProps = {
  guestName: string;
  confirmationNumber: string;
  editUrl: string;
};

export default function RsvpConfirmationEmail({
  guestName = 'Guest',
  confirmationNumber = 'ABC123',
  editUrl,
}: RsvpConfirmationEmailProps) {

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
            <Text className="text-3xl font-heading font-extrabold text-[#ff4081] mb-3">
              Woohoo, {guestName}! 🎉
            </Text>
            <Text className="text-base leading-6 text-black">
              We're absolutely <span className="font-semibold text-[#ff4081]">thrilled</span> you’re joining us!  
              Your <strong>Attendance Confirmation</strong> has been received, and we couldn't be happier.  
              Your presence means so much, and we can’t wait to celebrate with you!
            </Text>

            <Text className="text-base leading-6 mt-4 text-black">
              🎫 Please save your confirmation number below.  
              You’ll need it if you ever want to make changes to your details:
            </Text>

            <Text className="text-lg font-mono bg-[#ff4081] text-white px-4 py-2 rounded-md mt-2 inline-block tracking-wider">
              {confirmationNumber}
            </Text>

            <Text className="text-base leading-6 mt-6 text-black">
              🔗 Need to update your RSVP details?{' '}
              <a
                href={editUrl}
                className="text-[#ff4081] font-semibold underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Click here
              </a>
            </Text>

            <Text className="text-base leading-6 mt-6 text-black">
              Can’t wait to see you there!
            </Text>

            <Text className="text-sm text-[#a8a8a8] mt-8">
              — The Sulit Family
            </Text>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  );
}
