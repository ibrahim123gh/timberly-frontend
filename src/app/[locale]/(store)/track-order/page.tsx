import { Suspense } from "react";
import { TrackOrderPage } from "@/features/orders/track-order-page";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <TrackOrderPage />
    </Suspense>
  );
}
