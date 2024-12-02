"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

const SuccessPage = () => {
  const searchParams = useSearchParams();

  // Collect all query parameters into an object
  const params = Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "green" }}>Payment Success</h1>
      <div style={{ marginTop: "20px" }}>
        {Object.keys(params).map((key) => (
          <p key={key}>
            <strong>{key}:</strong> {params[key]}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SuccessPage;
