import { formatPrice } from "@/app/property/[propertyId]/page";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
  Row,
  Column,
} from "@react-email/components";

interface InquiryEmailProps {
  senderEmail: string;
  senderName: string;
  senderPhone: string;
  message: string;
  ownerName: string;
  ownerEmail: string;
  propertyTitle: string;
  propertyPrice: number;
}

export const InquiryEmail = ({
  senderEmail,
  senderName,
  senderPhone,
  message,
  ownerName,
  ownerEmail,
  propertyTitle,
  propertyPrice,
}: InquiryEmailProps) => {
  const previewText = `New Inquiry for ${propertyTitle} from ${senderName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-slate-50 font-sans my-auto mx-auto pt-[40px] pb-[40px]">
          <Container className="border border-slate-200 border-solid bg-white rounded-lg mx-auto p-[32px] max-w-[600px] shadow-sm">
            {/* Header */}
            <Section>
              <Row>
                <Column>
                  <Text className="text-emerald-700 font-bold text-2xl m-0 tracking-tight">
                    Luxe<span className="text-slate-900">Estate</span>
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="border-slate-200 my-[24px]" />

            {/* Subject Reference */}
            <Section>
              <Heading className="text-slate-900 text-[24px] font-semibold leading-[1.2] p-0 m-0">
                New Property Inquiry
              </Heading>
              <Text className="text-slate-500 text-[14px] mt-[8px] mb-0">
                Ref: {propertyTitle}
              </Text>
            </Section>

            {/* Sender Details */}
            <Section className="bg-slate-50 rounded-lg p-6 mt-[24px] border border-slate-100">
              <Heading
                as="h3"
                className="text-slate-900 text-[16px] font-semibold mt-0 mb-[16px]"
              >
                Lead Details
              </Heading>
              <Text className="m-0 text-slate-700 text-[15px] mb-[8px]">
                <strong>Name:</strong> {senderName}
              </Text>
              <Text className="m-0 text-slate-700 text-[15px] mb-[8px]">
                <strong>Email:</strong> {senderEmail}
              </Text>
              <Text className="m-0 text-slate-700 text-[15px] mb-[8px]">
                <strong>Phone:</strong> {senderPhone}
              </Text>
            </Section>

            {/* User Message */}
            <Section className="mt-[24px] border-l-4 border-emerald-600 bg-emerald-50/50 p-6 rounded-r-lg">
              <Text className="m-0 text-slate-800 text-[15px] leading-relaxed italic">
                "{message}"
              </Text>
            </Section>

            {/* Property Summary */}
            <Section className="mt-[32px]">
              <Heading
                as="h3"
                className="text-slate-900 text-[16px] font-semibold mt-0 mb-[16px]"
              >
                Property Summary
              </Heading>
              <Container className="border border-slate-200 rounded-lg overflow-hidden bg-white w-full">
                <Row>
                  <Column className="p-[16px] align-top">
                    <Text className="m-0 text-emerald-700 font-semibold text-[18px]">
                      ${formatPrice(propertyPrice)}
                    </Text>
                    <Text className="m-0 text-slate-900 font-medium text-[15px] mt-[4px]">
                      {propertyTitle}
                    </Text>
                  </Column>
                </Row>
              </Container>
            </Section>

            {/* CTA */}
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-slate-900 rounded-lg text-white text-[15px] font-medium no-underline text-center px-8 py-4 w-full"
                href={`mailto:${ownerEmail}?subject=Re: Inquiry for ${propertyTitle}`}
              >
                Reply to Inquiry
              </Button>
            </Section>

            <Hr className="border-slate-200 mt-[40px] mb-[24px]" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-slate-400 text-[12px] leading-relaxed m-0">
                This email was sent from LuxeEstate. You are receiving this
                because your property is listed on our platform or you are an
                assigned agent.
              </Text>
              <Text className="text-slate-400 text-[12px] leading-relaxed mt-[8px] mb-0">
                <a href="#" className="text-emerald-600 underline">
                  Privacy Policy
                </a>{" "}
                &bull;{" "}
                <a href="#" className="text-emerald-600 underline">
                  Unsubscribe
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InquiryEmail;
