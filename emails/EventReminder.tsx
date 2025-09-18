import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Container } from '@react-email/container';
import { Tailwind } from '@react-email/tailwind';

type EventReminderEmailProps = {
  guestName: string;
  eventDetailsUrl?: string;
};

export default function EventReminderEmail({
  guestName = 'John',
  eventDetailsUrl= 'https://master.d3hyynhxomne9o.amplifyapp.com/',
}: EventReminderEmailProps) {
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
              Hey {guestName},
            </Text>

            <Text className="text-base leading-6 text-black">
            This is a gentle reminder about the upcoming baptism and birthday celebration taking place this Sunday.
            </Text>

            <Text className="text-base leading-6 mt-4 text-black">
            The baptism will be held at: <span className="font-semibold">St. Augustine Catholic Church</span>.<br />
            The reception will follow at: <span className="font-semibold">Via Mare of America</span>.
            </Text>


            <Text className="text-base leading-6 mt-4 text-black">
            We look forward to sharing this meaningful day with you and your family.
            </Text>



            {eventDetailsUrl && (
              <Text className="text-base leading-6 mt-6 text-black">
                🔗 Need more details about the event?{' '}
                <a
                  href={eventDetailsUrl}
                  className="text-[#ff4081] font-semibold underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here
                </a>
              </Text>
            )}

            <Text className="text-sm text-[#a8a8a8] mt-8">
            — The Sulit Family
            </Text>

          </Section>
        </Container>
      </Tailwind>
    </Html>
  );
}
