import { cookies } from "next/headers";
import React from "react";
import Form from "./Form";

export default function page() {
  const token = cookies().get("access_token")?.value;

  return <Form token={token} />;
}
