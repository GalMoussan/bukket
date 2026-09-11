import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { formatOrderEmail, parseOrderPayload } from "@/lib/order";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { order, errors, empty } = parseOrderPayload(payload);
  if (!order) {
    if (empty) {
      return NextResponse.json({ error: "Bag is empty" }, { status: 400 });
    }
    return NextResponse.json({ error: "Check the form", errors }, { status: 400 });
  }

  try {
    await sendMail(formatOrderEmail(order));
  } catch {
    return NextResponse.json(
      { error: "Could not send the order email. Try again in a moment." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    total: order.total,
    itemCount: order.lines.reduce((sum, line) => sum + line.quantity, 0),
  });
}
