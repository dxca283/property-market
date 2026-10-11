import InquiryEmail from "@/components/emails/InquiryEmail";
import { getResend } from "@/lib/resend";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const {
      senderName,
      senderEmail,
      senderPhone,
      message,
      ownerEmail,
      ownerName,
      propertyTitle,
      propertyPrice,
    } = body;

    //send the email
    await getResend().emails.send({
      from: process.env.EMAIL_FROM!,
      subject: `Property Inquiry From ${senderName}`,
      react: InquiryEmail({
        senderEmail,
        senderPhone,
        senderName,
        message,
        ownerEmail,
        ownerName,
        propertyTitle,
        propertyPrice,
      }),
      to: ownerEmail,
    });
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to send email",
      },
      { status: 500 },
    );
  }
};
