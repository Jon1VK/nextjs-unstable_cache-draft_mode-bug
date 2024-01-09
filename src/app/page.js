import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/date", {
    next: { revalidate: 10 },
  });
  const fetchDate = await response.json();

  const unstableCacheDate = await unstable_cache(
    async () => await Promise.resolve(new Date().toString()),
    ["date"],
    { revalidate: 10 }
  )();

  return (
    <main>
      <p>{draftMode().isEnabled && "Draft mode is enabled"}</p>
      <p>Date fetched from '/api/date' with a revalidate time of 10 seconds</p>
      <p>{fetchDate}</p>
      <p>
        Date from an async function wrapped by an unstable_cache and a
        revalidate time of 10 seconds
      </p>
      <p>{unstableCacheDate}</p>
    </main>
  );
}
