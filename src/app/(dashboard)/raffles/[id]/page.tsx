import { RaffleDetailPage } from "@/components/features/raffles/RaffleDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RaffleDetail({ params }: Props) {
  const { id } = await params;
  return <RaffleDetailPage raffleId={id} />;
}
