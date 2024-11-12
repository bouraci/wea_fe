import { BookDetailClient } from "@components/book";

export default async function Book({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;

  return <BookDetailClient id={id} />;
}
