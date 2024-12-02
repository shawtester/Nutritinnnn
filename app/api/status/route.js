import crypto from "crypto";
import axios from "axios";
import { NextResponse } from "next/server";

let saltKey = "96434309-7796-489d-8924-ab56988a6076";
let merchantId = "PGTESTPAYUAT86";

export async function POST(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const merchantTransactionId = searchParams.get("id");

    const keyIndex = 1;

    const string =
      `/pg/v1/status/${merchantId}/${merchantTransactionId}` + saltKey;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchantId,
      },
    };

    const response = await axios(options);

    if (response.data.success === true) {
      const { transactionId, amount, status, ...otherDetails } =
        response.data.data;

      const queryParams = new URLSearchParams({
        transactionId,
        amount,
        status,
        ...Object.fromEntries(
          Object.entries(otherDetails).map(([key, value]) => [
            key,
            value?.toString() || "",
          ])
        ),
      }).toString();

      return NextResponse.redirect(`http://localhost:3000/success?${queryParams}`, {
        status: 301,
      });
    } else {
      return NextResponse.redirect("http://localhost:3000/failed", {
        status: 301,
      });
    }
  } catch (error) {
    console.error(error);
    // Return error response
    return NextResponse.json(
      { error: "Payment check failed", details: error.message },
      { status: 500 }
    );
  }
}
